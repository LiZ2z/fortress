"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function classNames(className, ...classnames) {
    let result = className;
    let name;
    for (let i = 0, len = classnames.length; i < len; i += 1) {
        name = classnames[i];
        result += name ? ` ${name}` : '';
    }
    return result;
}
exports.default = classNames;
