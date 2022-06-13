
export const average = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0) / arr.length;

export const median = (arr: Array<number>) => {
    const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export function mapToArray(key: unknown, value: unknown) {
    if(value instanceof Map) {
      return Array.from(value.entries());
    } else {
      return value;
    }
};

