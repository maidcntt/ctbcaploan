

class ExcelColumnMapper {
    constructor () {
        // console.log(`[${(new Date()).toISOString()}]: Use ExcelColumnMapper v2.`);
        this._auditFuncs = [];
        this.errors = [];
    }

    loadProfile = (profile) => {
        this._columnMappings = profile.columnMappings;
        /**
         * parsedMap: { <excelColumnIndex>: { columnMapper: {}, columnValueMapper: {} } }
         */
        this.parsedMap = {};

        /**
         * valueMap: { <sapFieldId>: { <excelFieldContent>: <sapFieldDvalue> } }
         */
        this.valueMap = {};

        // console.log(`profile.ZZORDERSTATUS = ${profile.ZZORDERSTATUS} (${typeof profile.ZZORDERSTATUS})`);
        this.SP_IDX_ZZORDERSTATUS = (typeof profile.ZZORDERSTATUS === 'number') ? profile.ZZORDERSTATUS : undefined;

        // transform to a structure which is mapper-friendly
        this._columnMappings.forEach(e => {
            if (! this.parsedMap[e.excelColumnIndex]) {
                this.parsedMap[e.excelColumnIndex] = { columnMapper: [], columnValueMapper: {} };
            } 
    
            const hyphenIndex = (typeof e.sapFieldId === 'undefined') ? -1 : e.sapFieldId.indexOf('-');
            const sapFieldId = (hyphenIndex > 0) ? e.sapFieldId.slice(hyphenIndex + 1) : e.sapFieldId || '';
            if (e.excelFieldContent) {
                if (!this.parsedMap[e.excelColumnIndex].columnValueMapper[sapFieldId]) {
                    this.parsedMap[e.excelColumnIndex].columnValueMapper[sapFieldId] = {};
                    // this.parsedMap[e.excelColumnIndex].columnValueMapper.sapDvalues = {};
                }
                this.parsedMap[e.excelColumnIndex].columnValueMapper[sapFieldId][e.excelFieldContent] = e.sapFieldDvalue;

                if (!this.valueMap[sapFieldId]) {
                    this.valueMap[sapFieldId] = {};
                }
                this.valueMap[sapFieldId][e.excelFieldContent] = e.sapFieldDvalue;
                
            } else {
                this.parsedMap[e.excelColumnIndex].columnMapper.push(sapFieldId);
            }
            // if (e.excelFieldContent) {
            //     if (!this.parsedMap[e.excelColumnIndex].columnValueMapper.sapFieldId) {
            //         this.parsedMap[e.excelColumnIndex].columnValueMapper.sapFieldId = sapFieldId;
            //         this.parsedMap[e.excelColumnIndex].columnValueMapper.sapDvalues = {};
            //     }
            //     this.parsedMap[e.excelColumnIndex].columnValueMapper.sapDvalues[e.excelFieldContent] = e.sapFieldDvalue;
            // } else {
            //     this.parsedMap[e.excelColumnIndex].columnMapper.push(sapFieldId);
            // }
        });

        // this._debug_print_parsedMap();
        // console.log(`this.parsedMap['26'].columnValueMapper`);
        // console.log(this.parsedMap['26'].columnValueMapper);
    };
    
    _debug_print_parsedMap = () => {
        console.log(this.parsedMap);
    };

    useAuditFunction = (func) => {
        this._auditFuncs.push(func);
    };

    _audit = (value) => {
        let evalResult = true;
        for (let i = 0; i < this._auditFuncs.length; i++) {
            evalResult = evalResult & this._auditFuncs[i].evalFunc(value);

            if (!evalResult) {
                this.errors.push(this._auditFuncs[i].falseEvalResult);
                return false;
            }
        }

        return true;
    };
    
    // 因應 api 對應而增加
    /**
     * 取得 excelFieldContent -> sapFieldDvalue 的對應 dictionary
     * @returns 
     */
    getValueMap = () => {
        return this.valueMap;
    };
    

    /**
     * 將傳入的資料列轉為欄位對應的結果
     * @param {*} dataRow 
     * @returns 
     */
    map = (dataRow) => {
        // console.log(`Parsing below data row:`);
        // console.log(dataRow);

        const mapResult = {};

        const lookupIndexes = Object.keys(this.parsedMap);
        // console.log(`parsedMap:`);
        // console.log(this.parsedMap);

        let ABGRU_sourceValue;
        let ABGRU_tryMapValue;
        let ZZORDERSTATUS_mappedValue;

        lookupIndexes.forEach(i => {
            this.parsedMap[i].columnMapper.forEach(sapFieldId => {
                mapResult[sapFieldId] = dataRow[i]
            });
            
            let columnValueMapperColumns = Object.keys(this.parsedMap[i].columnValueMapper);
            columnValueMapperColumns.forEach(sapFieldId => {
                const tryMapColumnValue = this.parsedMap[i].columnValueMapper[sapFieldId][dataRow[i]];

                // 2023-04-22 
                // 處理官網訂單對應時有一特殊情形: 從 excelColumnIndex = 4 對應 ZZORDERSTATUS: 'N', 'C', 但又從 excelColumnIndex = 20 對應 ZZORDERSTATUS: 'U'
                // 原架構在判斷處理 excelColumnIndex = 20 時會覆蓋 excelColumnIndex = 4 時的對應結果
                // 因此增加條件 -> 重複對應時如果原本對應已經有非空的結果時則不對應
                if (typeof mapResult[sapFieldId] === 'undefined') {
                    mapResult[sapFieldId] = tryMapColumnValue || '';
                } else {
                    if (mapResult[sapFieldId] === '') {
                        mapResult[sapFieldId] = tryMapColumnValue;
                    }
                }

                // mapResult[sapFieldId] = tryMapColumnValue || '';
                // console.log(`columnValueMapper column ${sapFieldId} map to value ${(tryMapColumnValue || '')}`);

                
                // 2023-04-11 - ABGRU 相關調整
                if (sapFieldId === 'ABGRU') {
                    ABGRU_sourceValue = dataRow[i];
                    ABGRU_tryMapValue = tryMapColumnValue;
                }
                // if (sapFieldId === 'ZZORDERSTATUS') {
                //     ZZORDERSTATUS_mappedValue = tryMapColumnValue || '';
                // }

            });

        });
        

        // obsoleted - 隨時可刪
        // 此段為在初版架構: 一個 excel 欄位只能被一個 sap 欄位對應時 要能讓ZZORDERSTATUS能指向和ABGRU指定的同欄位的解決方案
        // 新版架構已可接受多個 SAP 欄位指向同個 EXCEL 欄位, 因此此段可廢棄
        // if (this.SP_IDX_ZZORDERSTATUS) {
        //     mapResult['ZZORDERSTATUS'] = dataRow[this.SP_IDX_ZZORDERSTATUS];
        // }

        // console.log(`map result:`);
        // console.log(mapResult);

        // 2023-04-11 - ABGRU 相關調整
        // Mandy: 由於訂單取消原因有可能包含消費者手動keyin的值, 難以每個對應, 希望新增一個邏輯: 
        // 若有ABGRU, 則優先帶入ABGRU對應的值; 
        // 若訂單狀態=C, 且ABGRU有資料, 但未對應到SAP參數, 則預設帶入99
        // 
        // 目前寫在此, 之後研究架構如何優化因應此類需求(如果需要因應的話)
        // console.log(`ZZORDERSTATUS_mappedValue: ${ZZORDERSTATUS_mappedValue}`);
        // console.log(`ABGRU_tryMapValue: ${ABGRU_tryMapValue}`);
        // console.log(`ABGRU_sourceValue: ${ABGRU_sourceValue}`);
        ZZORDERSTATUS_mappedValue = mapResult['ZZORDERSTATUS'];
        if (ZZORDERSTATUS_mappedValue === 'C' && (typeof ABGRU_tryMapValue === 'undefined') && (typeof ABGRU_sourceValue !== 'undefined' && ABGRU_sourceValue !== '')) {
            mapResult['ABGRU'] = '99';
        }

        return { mapped: mapResult };
    };
}

module.exports = ExcelColumnMapper;