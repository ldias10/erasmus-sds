"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringEmpty = exports.isNull = void 0;
function isNull(object) {
    return object == null;
}
exports.isNull = isNull;
function isStringEmpty(str) {
    return isNull(str) || str.length == 0;
}
exports.isStringEmpty = isStringEmpty;
