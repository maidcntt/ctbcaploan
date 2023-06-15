const { Workbook } = require('exceljs');

const workbook = new Workbook();

const generateExampleExcel = async () => {
  const sheet = workbook.addWorksheet('工作表1');
  sheet.addTable({
    name: 'table1',
    ref: 'A1',
    columns: [{ name: '名字' }, { name: '年齡' }, { name: '電話' }],
    rows: [
      ['小明', '20', '0987654321'],
      ['小美', '23', '0912345678']
    ]
  });
  await workbook.xlsx.writeFile('example.xlsx');
};

module.exports = {
  generateExampleExcel
};
