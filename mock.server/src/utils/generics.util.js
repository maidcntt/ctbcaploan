/*!
 * Creator: Aaron.Chung@nttdata.com
 * Build: v0.1 (2022.12.29)
 * Description: 
 * 
 * Change History:
 *     v0.1: Initial build 
 */
const uuidv4 = require('uuid').v4;
const { logger, errorLogger } = require('./consoleLogger.util');


/**
 * Debug helper - logger() with current time
 * @param {string} message 
 */
const log = (message) => {
    logger(`[${(new Date()).toISOString()}]: ${message}`);
};


const _monthInString = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const getDate = (dateObj) => {
    const _now = dateObj || new Date();
    const year = _now.getFullYear();
    const month = _monthInString[_now.getMonth()];
    const date = ('0' + _now.getDate()).slice(-2);

    return `${year}${month}${date}`;
};


const getTime = (dateObj) => {
    const _now = dateObj || new Date();
    const hour = ('0' + _now.getHours()).slice(-2);
    const minute = ('0' + _now.getMinutes()).slice(-2);
    const second = ('0' + _now.getSeconds()).slice(-2);

    return `${hour}${minute}${second}`;
};


const getDateTime = () => {
    const _now = new Date();
    const year = _now.getFullYear();
    const month = _monthInString[_now.getMonth()];
    const date = ('0' + _now.getDate()).slice(-2);
    const hour = ('0' + _now.getHours()).slice(-2);
    const minute = ('0' + _now.getMinutes()).slice(-2);
    const second = ('0' + _now.getSeconds()).slice(-2);
    const millisecond = ('00' + _now.getMilliseconds()).slice(-3);

    const name = year + month + date + '_' + hour + minute + second + '_' + millisecond;

    return name;
};


/**
 * 
 * @param {String} dateStr 
 * @param {Object} sessionData 
 * @returns 
 */
const tryFormatDate = (dateStr, sessionData) => {
    if (!dateStr) {
        // logger(`Unexpected dateStr received in tryFormatDate: ${dateStr}`);
        return ['', `日期為空值`];
    }

    let date;

    try {
        date = new Date(cleanChineseDate(dateStr));
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        const tryFormat = `${year}${month}${day}`;
        if (tryFormat.length !== 8) {
            errorLogger(`Unexpected date format result: ${dateStr} (type ${typeof dateStr}) -> ${date} (type ${typeof date}) -> ${tryFormat}`, sessionData);
        }
        return [tryFormat];
    } catch (err) {
        // logger(`Exception occurred in tryFormatDate '${dateStr}': ${err.message}`);
        return ['', `${err.message}`];
    }
};


const tryFormatTime = async (dateStr, sessionData) => {
    if (!dateStr) {
        console.log(`Unexpected dateStr received in tryFormatDate: ${dateStr}`);
        return ['', `時間為空值`];
    }

    let date;

    try {
        date = new Date(cleanChineseDate(dateStr));
        // console.log(date);
        let hour = ('0' + date.getHours()).slice(-2);
        let minute = ('0' + date.getMinutes()).slice(-2);
        let second = ('0' + date.getSeconds()).slice(-2);
        const tryFormat = `${hour}${minute}${second}`;
        if (tryFormat.length !== 6) {
            await errorLogger(`Unexpected date format result: ${dateStr} (type ${typeof dateStr}) -> ${date} (type ${typeof date}) -> ${tryFormat}`, sessionData);
        }
        return [tryFormat];
    } catch (err) {
        // logger(`Exception occurred in tryFormatDate '${dateStr}': ${err.message}`);
        return ['', `${err.message}`];
    }
};


const tryParseExcelNumericDays = (excelDays) => {
    // example of excel date: 44851.449166666665 => 44851 days after 1970/1/1
    if (typeof excelDays !== 'number') {
        logger(`[${(new Date()).toISOString()}] tryParseExcelNumericDays: Unable to parse param '${excelDays}' (type: ${typeof excelDays}) as a valid excel date. A number is expected.`);
        return '';
    };

    let date = new Date(1970, 0, 1);
    let formatted = {};

    try {
        date.setDate(date.getDate() + excelDays - 25569);
        formatted.date = getDate(date);
        // logger(`    Read date ${date} (type ${typeof date}), formatted as: ${formatted.date}`);

    } catch (err) {
        return [['', `${err.message}: ${excelDays}`], undefined];
    }

    try {
        const fractions = excelDays % 1;
        const fraction_hours = fractions * 24;
        // logger(`fractions=${fractions}, to hour * 24 = ${fraction_hours}`);
        let hour = Math.floor(fraction_hours);
        const fraction_minutes = (fraction_hours % 1) * 60;
        // logger(`fractions=${fraction_hours}, to minute * 24 = ${fraction_minutes}`);
        let minutes = Math.floor(fraction_minutes);
        const fraction_seconds = (fraction_minutes % 1) * 60;
        // logger(`fractions=${fraction_minutes}, to minute * 24 = ${fraction_seconds}`);
        let seconds = Math.round(fraction_seconds);

        if (seconds === 60) {
            minutes += 1;
            seconds = 0;
        }

        formatted.time = `${('0' + hour).slice(-2)}${('0' + minutes).slice(-2)}${('0' + seconds).slice(-2)}`;

        // use below when time need to be parsed too

        // logger(`Hour: ${hour}`);
        // logger(`Minutes: ${minutes}`);
        // logger(`Seconds: ${seconds}`);

    } catch (err) {
        return [[formatted.date], ['', `${err.message}: ${excelDays}`]];
    }

    return [[formatted.date], [formatted.time]];


    // logger(`excelDays: ${excelDays}`);
    // logger(`generic.utils.tryFormatExcelDays: DATE TEST END`);
};


const cleanChineseDate = (dateStr) => {
    if (dateStr.indexOf('午') < 0) {
        return dateStr;
    }

    let tryClean = dateStr.replace('上午12:', '00:');
    tryClean = tryClean.replace('上午', '');
    tryClean = tryClean.replace('下午1:', '13:').replace('下午01:', '13:');
    tryClean = tryClean.replace('下午2:', '14:').replace('下午02:', '14:');
    tryClean = tryClean.replace('下午3:', '15:').replace('下午03:', '15:');
    tryClean = tryClean.replace('下午4:', '16:').replace('下午04:', '16:');
    tryClean = tryClean.replace('下午5:', '17:').replace('下午05:', '17:');
    tryClean = tryClean.replace('下午6:', '18:').replace('下午06:', '18:');
    tryClean = tryClean.replace('下午7:', '19:').replace('下午07:', '19:');
    tryClean = tryClean.replace('下午8:', '20:').replace('下午08:', '20:');
    tryClean = tryClean.replace('下午9:', '21:').replace('下午09:', '21:');
    tryClean = tryClean.replace('下午10:', '22:');
    tryClean = tryClean.replace('下午11:', '23:');
    tryClean = tryClean.replace('下午12:', '12:');

    return tryClean;
};


const cleanKirakiraName = (name) => {
    const regex = /[\u4E00-\u9FFFa-zA-Z\s\d]+/g;
    const matches = (name || '').match(regex);
    return matches ? matches.join('') : '';
}


const uuidPoolGenerator = (numOfUuids) => {
    const pool = [];

    function* gen(numOfUuids) {
  		// const pool = [];

  		for (let i = 0; i < numOfUuids; i++) {
      		pool.push(uuidv4());
  		}
	
  		let index = 0;
  		while (true) {
    		yield pool[index % pool.length];
    		index++;
  		}
	} 

  	const generator = gen(numOfUuids);
  
    return {
        pool,
        pickUuid: () => generator.next().value
    };
};

// logger(tryFormatDate('2022/10/17  10:46:55 AM'));
// logger(tryParseExcelNumericDays(44851.449166666665));
// logger(tryParseExcelNumericDays('20220102'));

// const uuidPool = generateUuidPool(3);
// console.log(uuidPool.pickUuid());
// console.log(uuidPool.pickUuid());


module.exports = {
    log,
    getDate, getTime, getDateTime, tryFormatDate, tryFormatTime, tryParseExcelNumericDays, uuidPoolGenerator, cleanKirakiraName
};