// # Search for closest human-readable color
// Two modes are available:
//
//  - basic css with 16 colors
//  - extended css3 mode with 147 (X11) colors (138 + 9 synonyms)

/*global module:false,window:false*/
// namespace `FC` i.e. FindColor
var FC = {};
// ## `FC.distance`
// Searches for closest color in basic CSS1 color list
// or in extended CSS3 color list.
//
// Returns object like
// `{'name':'black', 'value' : [0,0,0]}`
// where
//
//   - `name` is css-name of the color
//   - `value` is array of color RGB components
//
//  exports single function
//  findColor (color, extended)
//
FC.distance = function (a, b) {
    var result = 0;
    for (var i = 0; i < 3; i++) {
        result += Math.abs(a[i] - b[i]);
    }
    return Math.pow(result, 1/3);
};
// `FC.basicColors` array contains definitions of 16 basic colors
FC.basicColors = [
    {'name':'black', 'value' : [0,0,0]},
    {'name':'silver', 'value' : [192,192,192]},
    {'name':'gray', 'value' : [128,128,128]},
    {'name':'white', 'value' : [255,255,255]},
    {'name':'maroon', 'value' : [128,0,0]},
    {'name':'red', 'value' : [255,0,0]},
    {'name':'purple', 'value' : [128,0,128]},
    {'name':'fuchsia', 'value' : [255,0,255]},
    {'name':'green', 'value' : [0,128,0]},
    {'name':'lime', 'value' : [0,255,0]},
    {'name':'olive', 'value' : [128,128,0]},
    {'name':'yellow', 'value' : [255,255,0]},
    {'name':'navy', 'value' : [0,0,128]},
    {'name':'blue', 'value' : [0,0,255]},
    {'name':'teal', 'value' : [0,128,128]},
    {'name':'aqua', 'value' : [0,255,255]}
];
// `FC.extendedColors` array contains definitions of 147 extended css3 colors
FC.extendedColors = [
    {'name':'aliceblue', 'value' : [240,248,255]},
    {'name':'antiquewhite', 'value' : [250,235,215]},
    // {'name':'aqua', 'value' : [0,255,255]},  // see 'cyan'
    {'name':'aquamarine', 'value' : [127,255,212]},
    {'name':'azure', 'value' : [240,255,255]},
    {'name':'beige', 'value' : [245,245,220]},
    {'name':'bisque', 'value' : [255,228,196]},
    {'name':'black', 'value' : [0,0,0]},
    {'name':'blanchedalmond', 'value' : [255,235,205]},
    {'name':'blue', 'value' : [0,0,255]},
    {'name':'blueviolet', 'value' : [138,43,226]},
    {'name':'brown', 'value' : [165,42,42]},
    {'name':'burlywood', 'value' : [222,184,135]},
    {'name':'cadetblue', 'value' : [95,158,160]},
    {'name':'chartreuse', 'value' : [127,255,0]},
    {'name':'chocolate', 'value' : [210,105,30]},
    {'name':'coral', 'value' : [255,127,80]},
    {'name':'cornflowerblue', 'value' : [100,149,237]},
    {'name':'cornsilk', 'value' : [255,248,220]},
    {'name':'crimson', 'value' : [220,20,60]},
    {'name':'cyan', 'value' : [0,255,255]},
    {'name':'darkblue', 'value' : [0,0,139]},
    {'name':'darkcyan', 'value' : [0,139,139]},
    {'name':'darkgoldenrod', 'value' : [184,134,11]},
    {'name':'darkgray', 'value' : [169,169,169]},
    {'name':'darkgreen', 'value' : [0,100,0]},
    // {'name':'darkgrey', 'value' : [169,169,169]}, // see 'darkgray'
    {'name':'darkkhaki', 'value' : [189,183,107]},
    {'name':'darkmagenta', 'value' : [139,0,139]},
    {'name':'darkolivegreen', 'value' : [85,107,47]},
    {'name':'darkorange', 'value' : [255,140,0]},
    {'name':'darkorchid', 'value' : [153,50,204]},
    {'name':'darkred', 'value' : [139,0,0]},
    {'name':'darksalmon', 'value' : [233,150,122]},
    {'name':'darkseagreen', 'value' : [143,188,143]},
    {'name':'darkslateblue', 'value' : [72,61,139]},
    {'name':'darkslategray', 'value' : [47,79,79]},
    // {'name':'darkslategrey', 'value' : [47,79,79]}, see 'darkslategray'
    {'name':'darkturquoise', 'value' : [0,206,209]},
    {'name':'darkviolet', 'value' : [148,0,211]},
    {'name':'deeppink', 'value' : [255,20,147]},
    {'name':'deepskyblue', 'value' : [0,191,255]},
    {'name':'dimgray', 'value' : [105,105,105]},
    // {'name':'dimgrey', 'value' : [105,105,105]},
    {'name':'dodgerblue', 'value' : [30,144,255]},
    {'name':'firebrick', 'value' : [178,34,34]},
    {'name':'floralwhite', 'value' : [255,250,240]},
    {'name':'forestgreen', 'value' : [34,139,34]},
    // {'name':'fuchsia', 'value' : [255,0,255]}, // see 'magenta'
    {'name':'gainsboro', 'value' : [220,220,220]},
    {'name':'ghostwhite', 'value' : [248,248,255]},
    {'name':'gold', 'value' : [255,215,0]},
    {'name':'goldenrod', 'value' : [218,165,32]},
    {'name':'gray', 'value' : [128,128,128]},
    {'name':'green', 'value' : [0,128,0]},
    {'name':'greenyellow', 'value' : [173,255,47]},
    // {'name':'grey', 'value' : [128,128,128]}, // see 'gray'
    {'name':'honeydew', 'value' : [240,255,240]},
    {'name':'hotpink', 'value' : [255,105,180]},
    {'name':'indianred', 'value' : [205,92,92]},
    {'name':'indigo', 'value' : [75,0,130]},
    {'name':'ivory', 'value' : [255,255,240]},
    {'name':'khaki', 'value' : [240,230,140]},
    {'name':'lavender', 'value' : [230,230,250]},
    {'name':'lavenderblush', 'value' : [255,240,245]},
    {'name':'lawngreen', 'value' : [124,252,0]},
    {'name':'lemonchiffon', 'value' : [255,250,205]},
    {'name':'lightblue', 'value' : [173,216,230]},
    {'name':'lightcoral', 'value' : [240,128,128]},
    {'name':'lightcyan', 'value' : [224,255,255]},
    {'name':'lightgoldenrodyellow', 'value' : [250,250,210]},
    {'name':'lightgray', 'value' : [211,211,211]},
    {'name':'lightgreen', 'value' : [144,238,144]},
    // {'name':'lightgrey', 'value' : [211,211,211]}, // see 'lightgray'
    {'name':'lightpink', 'value' : [255,182,193]},
    {'name':'lightsalmon', 'value' : [255,160,122]},
    {'name':'lightseagreen', 'value' : [32,178,170]},
    {'name':'lightskyblue', 'value' : [135,206,250]},
    {'name':'lightslategray', 'value' : [119,136,153]},
    // {'name':'lightslategrey', 'value' : [119,136,153]}, // see 'lightslategray'
    {'name':'lightsteelblue', 'value' : [176,196,222]},
    {'name':'lightyellow', 'value' : [255,255,224]},
    {'name':'lime', 'value' : [0,255,0]},
    {'name':'limegreen', 'value' : [50,205,50]},
    {'name':'linen', 'value' : [250,240,230]},
    {'name':'magenta', 'value' : [255,0,255]},
    {'name':'maroon', 'value' : [128,0,0]},
    {'name':'mediumaquamarine', 'value' : [102,205,170]},
    {'name':'mediumblue', 'value' : [0,0,205]},
    {'name':'mediumorchid', 'value' : [186,85,211]},
    {'name':'mediumpurple', 'value' : [147,112,219]},
    {'name':'mediumseagreen', 'value' : [60,179,113]},
    {'name':'mediumslateblue', 'value' : [123,104,238]},
    {'name':'mediumspringgreen', 'value' : [0,250,154]},
    {'name':'mediumturquoise', 'value' : [72,209,204]},
    {'name':'mediumvioletred', 'value' : [199,21,133]},
    {'name':'midnightblue', 'value' : [25,25,112]},
    {'name':'mintcream', 'value' : [245,255,250]},
    {'name':'mistyrose', 'value' : [255,228,225]},
    {'name':'moccasin', 'value' : [255,228,181]},
    {'name':'navajowhite', 'value' : [255,222,173]},
    {'name':'navy', 'value' : [0,0,128]},
    {'name':'oldlace', 'value' : [253,245,230]},
    {'name':'olive', 'value' : [128,128,0]},
    {'name':'olivedrab', 'value' : [107,142,35]},
    {'name':'orange', 'value' : [255,165,0]},
    {'name':'orangered', 'value' : [255,69,0]},
    {'name':'orchid', 'value' : [218,112,214]},
    {'name':'palegoldenrod', 'value' : [238,232,170]},
    {'name':'palegreen', 'value' : [152,251,152]},
    {'name':'paleturquoise', 'value' : [175,238,238]},
    {'name':'palevioletred', 'value' : [219,112,147]},
    {'name':'papayawhip', 'value' : [255,239,213]},
    {'name':'peachpuff', 'value' : [255,218,185]},
    {'name':'peru', 'value' : [205,133,63]},
    {'name':'pink', 'value' : [255,192,203]},
    {'name':'plum', 'value' : [221,160,221]},
    {'name':'powderblue', 'value' : [176,224,230]},
    {'name':'purple', 'value' : [128,0,128]},
    {'name':'red', 'value' : [255,0,0]},
    {'name':'rosybrown', 'value' : [188,143,143]},
    {'name':'royalblue', 'value' : [65,105,225]},
    {'name':'saddlebrown', 'value' : [139,69,19]},
    {'name':'salmon', 'value' : [250,128,114]},
    {'name':'sandybrown', 'value' : [244,164,96]},
    {'name':'seagreen', 'value' : [46,139,87]},
    {'name':'seashell', 'value' : [255,245,238]},
    {'name':'sienna', 'value' : [160,82,45]},
    {'name':'silver', 'value' : [192,192,192]},
    {'name':'skyblue', 'value' : [135,206,235]},
    {'name':'slateblue', 'value' : [106,90,205]},
    {'name':'slategray', 'value' : [112,128,144]},
    // {'name':'slategrey', 'value' : [112,128,144]}, // see 'slategray'
    {'name':'snow', 'value' : [255,250,250]},
    {'name':'springgreen', 'value' : [0,255,127]},
    {'name':'steelblue', 'value' : [70,130,180]},
    {'name':'tan', 'value' : [210,180,140]},
    {'name':'teal', 'value' : [0,128,128]},
    {'name':'thistle', 'value' : [216,191,216]},
    {'name':'tomato', 'value' : [255,99,71]},
    {'name':'turquoise', 'value' : [64,224,208]},
    {'name':'violet', 'value' : [238,130,238]},
    {'name':'wheat', 'value' : [245,222,179]},
    {'name':'white', 'value' : [255,255,255]},
    {'name':'whitesmoke', 'value' : [245,245,245]},
    {'name':'yellow', 'value' : [255,255,0]},
    {'name':'yellowgreen', 'value' : [154,205,50]}
];

//
// ## `FC.find`
// Finds closest to the given color from color array
//
//  - @param   {Array} color 3 decimal componets of color array
//  - @param   {Array} colors Array of 3 decimal componenets of color
//  - @returns {Object|Array|null} color object
//
FC.find = function (color, colors) {
    var result = (colors.reduce(function(prevVal, curVal) {
        var curDist = FC.distance(color, curVal.value);
        return curDist < prevVal.distance ? {'distance':curDist, 'o' : curVal} : prevVal;
    }, {'distance': Infinity, 'o': null})).o;
    return result ? result : null;
};

//
// ## `FC.findByName`
// Finds color with given color name  in color array
//
//  - @param   {String} colorName
//  - @param   {Array} colors Array of 3 decimal componenets of color
//  - @returns {Object|null} color object
//
FC.findByName = function (colorName, colors) {
    var result = colors.filter(function (elem) {
        return elem.name === colorName.toLowerCase();
    });
    return (result.length === 1) ? result[0] : null;
};

// ## `FC.findColor`
// Searches for closest color in CSS1 or CSS3 color list.
//
// + @param  {array} color - RGB components
// + @param  {boolean} extended - use CSS1 (false, default) or CSS3
// + @return {object|null} - described in module definition
//
FC.findColor = function (color, extended) {
    if (color && Object.prototype.toString.call(color) === '[object Array]' && color.length === 3) {
        return extended ? FC.find(color, FC.extendedColors) : FC.find(color, FC.basicColors);
    } else if (typeof color === 'string') {
        return extended ?  FC.findByName(color, FC.extendedColors) : FC.findByName(color, FC.basicColors);
    }
    return null;
};
// ## Bind `findColor` to global object
// In Node environment everything is private, except to exported objexts
if (typeof module !== 'undefined' && module.exports) {
    module.exports.findColor = FC.findColor; // node.js
// In browser environment this code should be wrapped
// with closure otherwise `FC` object will leak to to `window`
} else {
    window.findColor = FC.findColor; // browser global
}
