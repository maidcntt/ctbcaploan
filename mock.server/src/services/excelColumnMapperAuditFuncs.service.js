
// const hasFullWidthNumbers = (eval) => {
//     const pattern = /([\uFF10-\uFF19])+/g;
//     const regex = new RegExp(pattern);
//     return regex.test(eval);
// }


const noFullWidthNumbers = {
    evalFunc: (val) => {
        const pattern = /([\uFF10-\uFF19])+/g;
        const regex = new RegExp(pattern);
        return !regex.test(val);
    },
    falseEval: {
        name: 'ValueContainsFullWidthNumberError',
        message: '值不可包含全形數字'
    } 
};

module.exports = {
    noFullWidthNumbers
};