const { findLargestOdd, cyclicShift } = require('../utils/arrayOperations');

describe('Array Operations Tests', () => {
    test('findLargestOdd should return the largest odd number', () => {
        expect(findLargestOdd([12, 7, 5, 18, 22, 9])).toBe(9);
        expect(findLargestOdd([2, 4, 6, 8])).toBe(null);
        expect(findLargestOdd([])).toBe(null);
    });

    test('cyclicShift should return array after cyclic shift', () => {
        expect(cyclicShift([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
        expect(cyclicShift([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]);
        expect(cyclicShift([1, 2, 3, 4, 5], 7)).toEqual([4, 5, 1, 2, 3]);
    });
});

