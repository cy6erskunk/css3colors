/* global PrefixFree:false,findColor:false,$:false*/
(function() {
    window.$ = window.domey;
    var input = $('input.input'),
        nameElem = $('.colorName'),
        valueElem = $('.colorValue'),
        css3ColorElem = $('.css3color'),
        customColorElem = $('.customColor'),
        allText = $('.text'),
        body = $('body'),
        prefix = PrefixFree.prefix,
        invertNotSupported = (function () {
            if (body.css(prefix+'filter')) {
                body.css(prefix+'filter', 'invert(100%)');
                if (body.css(prefix+'filter') === 'invert(100%)') {
                    body.css(prefix+'filter', '');
                    return false;
                }
            }
            return true;
        })(),
        arr2rgb = function (arr) {
            return 'rgb(' + arr.toString() + ')';
        },
        isArray = function (a) {
            return Object.prototype.toString.call(a) === '[object Array]';
        },
        processInput = function () {
            var userColor = (/^\[\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\]$/).test(this[0].value) && JSON.parse(this[0].value),
                css3ColorObj;

            if (isArray(userColor) && userColor.length === 3) {
                css3ColorObj = findColor(userColor);
                css3ColorObj.strValue = JSON.stringify(css3ColorObj.value);
                css3ColorObj.rgbValue = arr2rgb(css3ColorObj.value);

                nameElem[0].innerHTML = css3ColorObj.name;
                valueElem[0].innerHTML = css3ColorObj.strValue;

                allText.css('color', arr2rgb(invertColor(css3ColorObj.value)));

                customColorElem.css({
                    'backgroundColor' : arr2rgb(userColor),
                    'color' : arr2rgb(invertColor(userColor))
                });

                css3ColorElem.css({
                    'backgroundColor' : css3ColorObj.rgbValue,
                    'color' : arr2rgb(invertColor(css3ColorObj.value))
                });
            }
        },
        invertColor = function (a) {
            var res = [];
            if (isArray(a) && a.length === 3) {
                a.forEach(function (v) {
                    // slightly darken value too close to 127
                    Math.abs(v - 127) < 10 ?
                        res.push(235 - v) :
                        res.push(255 - v);
                });
            }
            return res;
        },
        init = function () {
            var i = 0,
                initial = [];

            for (; i < 3; i++) {
                initial.push(Math.ceil(Math.random() * 256));
            }

            input[0].value = '[' + initial.toString() + ']';
            processInput.call(input);

            input[0].addEventListener('input', processInput);
        };

    init();
})();
