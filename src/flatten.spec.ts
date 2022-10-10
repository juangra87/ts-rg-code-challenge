import {flatten} from "./flatten";

describe('verify boundaries', () => {
    it('no elements', () => {
        expect(flatten([])).toEqual([])
    })

    it('one value element', () => {
        expect(flatten([1])).toEqual([1])
    })

    it('one array element', () => {
        expect(flatten([[1]])).toEqual([1])
    })

    it('NaN are allowed', () => {
        expect(flatten([[Math.sqrt(-1)], 2])).toEqual([Math.sqrt(-1), 2])
    })

    it('infinity are allowed', () => {
        expect(flatten([[Number.POSITIVE_INFINITY], 2, Number.NEGATIVE_INFINITY])).toEqual([Infinity, 2, Number.NEGATIVE_INFINITY])
    })

    it('unsafe values are allowed', () => {
        expect(flatten([[Number.MAX_SAFE_INTEGER + 1], 2, Number.MIN_SAFE_INTEGER - 2])).toEqual([Number.MAX_SAFE_INTEGER + 1, 2, Number.MIN_SAFE_INTEGER - 2])
    })

    it('other values are allowed', () => {
        expect(flatten([[Number.EPSILON],2])).toEqual([Number.EPSILON, 2])
    })
})

describe('verify array managemente', () => {
    it('no arrays included', () => {
        expect(flatten([1])).toEqual([1])
    })

    it('only arrays are included', () => {
        expect(flatten([[1]])).toEqual([1])
    })

    it('more than one values included in a nested array', () => {
        expect(flatten([[1, 2], 3])).toEqual([1, 2, 3])
    })

    it('different array dimensions are allowed', () => {
        expect(flatten([[[[[1, 2]]]], [[3, 4]]])).toEqual([1, 2, 3, 4])
    })

    it('nested values are included', () => {
        expect(flatten([1, [2, [3]], 4])).toEqual([1, 2, 3, 4])
    })
})

describe('verify values allowed', () => {

    it('only values are included', () => {
        expect(flatten([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('negative values are allowed', () => {
        expect(flatten([-1, 2, [-3, [-4]]])).toEqual([-1, 2, -3, -4])
    })

    it('float values are allowed', () => {
        expect(flatten([-1.5, 2.87, [[-3, 4.23]]])).toEqual([-1.5, 2.87, -3, 4.23])
    })

    it('values are not modified', () => {
        expect(flatten([-1.0234424, 2.122345457, [-12345465.5454567]])).toEqual([-1.0234424, 2.122345457, -12345465.5454567])
    })
})

describe('verify sorting of elements', () => {
    it('starting with numbers, elements keep the sorting', () => {
        expect(flatten([1, 1.1, [2, 3], 4, [5, [6, 7]], 8, 9])).toEqual([1, 1.1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    it('starting with arrays, elements keep the sorting', () => {
        expect(flatten([[1], 1.1, [2, 3], 4, [5, [6, 7]], 8, 9])).toEqual([1, 1.1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
