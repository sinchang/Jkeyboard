// http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type

let util = {
    isFunction: (functionToCheck) => {
        let getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
}

module.exports = util;