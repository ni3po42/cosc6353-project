function round(num, prec){
    const p = Math.pow(10, prec);
    return Math.round(num * p) / p;
}

module.exports = {
    round : round
};