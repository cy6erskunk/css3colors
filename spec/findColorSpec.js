/* global describe:false, it:false, expect:false, FC:false, findColor: false */
describe('findColor', function () {

    it('returns given color if color is present in the lists', function () {
        FC.basicColors.forEach(function (v) {
            expect(findColor(v.value)).toBe(v);
        });
        FC.extendedColors.forEach(function (v) {
            expect(findColor(v.value, true)).toBe(v);
        });
    });

    it('returns undefined if input given is not array of color components', function () {
        expect(findColor()).toBeUndefined();
        expect(findColor('')).toBeUndefined();
        expect(findColor(1)).toBeUndefined();
        expect(findColor([])).toBeUndefined();
        expect(findColor({})).toBeUndefined();
        expect(findColor([1])).toBeUndefined();
        expect(findColor([1,2])).toBeUndefined();
        expect(findColor([1,2,2,2])).toBeUndefined();
    });
});
