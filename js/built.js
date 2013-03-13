/* global PrefixFree:false,findColor:false*/
(function() {
    var dQS = function (selector) { return document.querySelector(selector); },
        input = dQS('input.input'),
        nameElem = dQS('.colorName'),
        valueElem = dQS('.colorValue'),
        css3ColorElem = dQS('.css3color'),
        customColorElem = dQS('.customColor'),
        allText = Array.prototype.slice.call(document.querySelectorAll('.text')),
        body = dQS('body'),
        prefix = PrefixFree.prefix,
        invertNotSupported = (function () {
            if (body.style[prefix+'filter']) {
                body.style[prefix+'filter'] = 'invert(100%)';
                if (body.style[prefix+'filter'] === 'invert(100%)') {
                    body.style[prefix+'filter'] = '';
                    return false;
                }
            }
            return true;
        })(),
        arr2rgb = function (arr) {
            return 'rgb(' + arr.toString() + ')';
        },
        css = function (nodes, field, value) {
            var result,
                processSingleNode = function (node) {
                    if (typeof value !== 'undefined') {
                        node.style[field] = value;
                    } else {
                        result = node.style[field];
                    }
                };

            // return value for the first node
            if (typeof value === 'undefined') {
                processSingleNode(nodes.length ? nodes[0] : nodes);
                return result;
            // set value to all nodes
            } else {
                if (typeof nodes.length === 'undefined') {
                    nodes = [nodes];
                }
                nodes.forEach(function (node) {
                    processSingleNode(node);
                });
            }
        },
        processInput = function () {
            var userColor = (/^\[.*\]$/).test(this.value) && JSON.parse(this.value),
                css3ColorObj;

            if (Object.prototype.toString.call(userColor) === '[object Array]' && userColor.length === 3) {
                css3ColorObj = findColor(userColor);
                css3ColorObj.strValue = JSON.stringify(css3ColorObj.value);
                css3ColorObj.rgbValue = arr2rgb(css3ColorObj.value);

                nameElem.innerHTML = css3ColorObj.name;
                valueElem.innerHTML = css3ColorObj.strValue;

                css(allText, 'color', arr2rgb(invertColor(css3ColorObj.value)));

                css(customColorElem, 'backgroundColor', arr2rgb(userColor));
                css(customColorElem, 'color', arr2rgb(invertColor(userColor)));

                css(css3ColorElem, 'backgroundColor', css3ColorObj.rgbValue);
                css(css3ColorElem, 'color', arr2rgb(invertColor(css3ColorObj.value)));
            }
        },
        invertColor = function (a) {
            var res = [];
            if (Object.prototype.toString.call(a) === '[object Array]' && a.length === 3) {
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

            input.value = '[' + initial.toString() + ']';
            processInput.call(input);

            input.addEventListener('input', processInput);
        };

    init();
})();
