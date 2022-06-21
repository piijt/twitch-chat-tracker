"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToArray = exports.median = exports.average = void 0;
const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
exports.average = average;
const median = (arr) => {
    const mid = Math.floor(arr.length / 2), nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
exports.median = median;
function mapToArray(key, value) {
    if (value instanceof Map) {
        return Array.from(value.entries());
    }
    else {
        return value;
    }
}
exports.mapToArray = mapToArray;
;
//# sourceMappingURL=array_helpers.js.map