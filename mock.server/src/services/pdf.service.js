const { jsPDF } = require('jspdf');

// eslint-disable-next-line new-cap
const doc = new jsPDF();

const generateExamplePDF = async () => {
  doc.text('Hello world!', 10, 10);
  doc.save('a4.pdf');
};

// 如果需要table樣式可以使用jsPDF-AutoTable

module.exports = {
  generateExamplePDF
};
