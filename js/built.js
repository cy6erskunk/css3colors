/* global findColor:false,$:false*/
(function() {
    window.$ = window.domey;
    var input = $('input.input'),
        nameElem = $('.colorName'),
        valueElem = $('.colorValue'),
        css3ColorElem = $('.css3color'),
        customColorElem = $('.customColor'),
        allText = $('.text'),
        arr2rgb = function (arr) {
            return 'rgb(' + arr.toString() + ')';
        },
        isArray = function (a) {
            return Object.prototype.toString.call(a) === '[object Array]';
        },
        processInput = function () {
            var userColorValueRe = new RegExp('^\\[\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*\\]$'),
                userColorNameRe = new RegExp('^[a-z]+$', 'i'),
                userColor = userColorNameRe.test(this.value) && this.value ||
                            userColorValueRe.test(this.value) && JSON.parse(this.value),
                css3ColorObj;

            if (typeof userColor === 'string' || isArray(userColor) && userColor.length === 3) {
                css3ColorObj = findColor(userColor, 1);
                if (css3ColorObj) {
                    // @TODO fix this tricky logic
                    customColorElem[0].className = 'customColor'; // @TODO refactor

                    css3ColorObj.strValue = JSON.stringify(css3ColorObj.value);
                    css3ColorObj.rgbValue = arr2rgb(css3ColorObj.value);

                    nameElem.html(css3ColorObj.name);
                    valueElem.html(css3ColorObj.strValue);

                    allText.css('color', arr2rgb(invertColor(css3ColorObj.value)));

                    // @TODO fix this tricky logic
                    if (typeof userColor === 'string') {
                        userColor = css3ColorObj.value;
                    }

                    customColorElem.css({
                        'backgroundColor' : arr2rgb(userColor),
                        'color' : arr2rgb(invertColor(userColor))
                    });

                    css3ColorElem.css({
                        'backgroundColor' : css3ColorObj.rgbValue,
                        'color' : arr2rgb(invertColor(css3ColorObj.value))
                    });
                } else {
                    customColorElem[0].className = 'customColor transparent-bg';
                    customColorElem[0].css = '';
                }
            } else { // @TODO refactor this copy-paste
                customColorElem[0].className = 'customColor transparent-bg';
                customColorElem[0].css = '';
            }
        },
        processBlur = function () {
            if (!this.value) {
                this.value = nameElem.html();
                processInput.call(this);
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

            input.val('[' + initial.toString() + ']');
            processInput.call(input[0]);

            input[0].addEventListener('input', processInput);
            input[0].addEventListener('blur', processBlur);
        };

    init();
})();
