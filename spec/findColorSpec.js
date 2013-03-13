/* global describe:false, it:false, expect:false, FC:false, findColor: false, spyOn:false */
describe('findColor', function () {

    describe('basically', function () {
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

    describe('internally', function () {
        var color = [0,0,0];

        it('calls find with basicColors when findColor\'s second argument is falsy or absent', function () {
            spyOn(FC, 'find');
            findColor(color);
            expect(FC.find).toHaveBeenCalledWith(color, FC.basicColors);
            findColor(color, false);
            expect(FC.find).toHaveBeenCalledWith(color, FC.basicColors);
            findColor(color, null);
            expect(FC.find).toHaveBeenCalledWith(color, FC.basicColors);
            findColor(color, 0);
            expect(FC.find).toHaveBeenCalledWith(color, FC.basicColors);
        });

        it('calls find with extendedColors when findColor\'s second argument is truthy', function () {
            spyOn(FC, 'find');
            findColor(color, true);
            expect(FC.find).toHaveBeenCalledWith(color, FC.extendedColors);
            findColor(color, 1);
            expect(FC.find).toHaveBeenCalledWith(color, FC.extendedColors);
            findColor(color, []);
            expect(FC.find).toHaveBeenCalledWith(color, FC.extendedColors);
            findColor(color, {});
            expect(FC.find).toHaveBeenCalledWith(color, FC.extendedColors);
            findColor(color, '');
            expect(FC.find).toHaveBeenCalledWith(color, FC.extendedColors);
        });
    });
});
