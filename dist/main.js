'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var intelliwaketsfoundation = require('@solidbasisventures/intelliwaketsfoundation');
var React = require('react');
var moment = require('moment');
var reactstrap = require('reactstrap');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var proRegularSvgIcons = require('@fortawesome/pro-regular-svg-icons');
var reactRouterDom = require('react-router-dom');
var ReactDatePicker = require('react-datepicker');
var Cleave = require('cleave.js/react');
var axios = require('axios');
var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
var ReactDatePicker__default = /*#__PURE__*/_interopDefaultLegacy(ReactDatePicker);
var Cleave__default = /*#__PURE__*/_interopDefaultLegacy(Cleave);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

// ----------------------------
//   Cookie Manager
// ----------------------------
function CookieCreate(name, value, days) {
    name = name.replace(/=/g, "");
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function CookieRead(name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    name = name.replace(/=/g, "");
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return defaultValue;
}
function CookieErase(name) {
    CookieCreate(name, "", -1);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var arrayIDMapsForArrayWithID = function (arrayValues, existingArrayIDMaps) {
    var idName = 'id';
    var originalIDs = existingArrayIDMaps.map(function (existingArrayIDMap) { return existingArrayIDMap.originalID; });
    var newArrayIDMaps = __spreadArrays(existingArrayIDMaps, arrayValues
        .filter(function (arrayValue) { return !originalIDs.includes(arrayValue[idName]); })
        .map(function (arrayValue) {
        var arrayIDMap = {
            originalID: arrayValue,
            uuid: intelliwaketsfoundation.GenerateUUID()
        };
        return arrayIDMap;
    }));
    var arrayValueIDs = arrayValues.map(function (arrayValue) { return arrayValue[idName]; });
    return newArrayIDMaps.filter(function (arrayIDMap) { return arrayValueIDs.includes(arrayIDMap.originalID); });
};
var arrayMapWithMapIDIndex = function (arrayValues, arrayIDMaps, map) {
    var idName = 'id';
    return arrayValues.map(function (arrayValue) {
        var _a, _b;
        return map(arrayValue, (_b = (_a = arrayIDMaps.find(function (arrayIDMap) { return arrayIDMap.originalID === arrayValue[idName]; })) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : intelliwaketsfoundation.GenerateUUID());
    });
};

(function (Environments) {
    Environments["ENV_Local"] = "ENV_Local";
    Environments["ENV_Dev"] = "ENV_Dev";
    Environments["ENV_Test"] = "ENV_Test";
    Environments["ENV_QA"] = "ENV_QA";
    Environments["ENV_Demo"] = "ENV_Demo";
    Environments["ENV_ProdSupport"] = "ENV_ProdSupport";
    Environments["ENV_Prod"] = "ENV_Prod";
})(exports.Environments || (exports.Environments = {}));
var IsENV = function (environments) {
    console.log('******* Environments Deprecated... use Stages');
    console.trace();
    var envs;
    if (typeof environments === 'string') {
        envs = [environments];
    }
    else {
        envs = environments;
    }
    for (var _i = 0, envs_1 = envs; _i < envs_1.length; _i++) {
        var env = envs_1[_i];
        if (process.env.REACT_APP_ENV === env) {
            return true;
        }
    }
    return false;
};
var IsDevFocused = function () {
    return IsENV([exports.Environments.ENV_Local, exports.Environments.ENV_Dev, exports.Environments.ENV_QA]);
};

var KEY_UP_ARROW = 38;
var KEY_DOWN_ARROW = 40;
var KEY_LEFT_ARROW = 37;
var KEY_RIGHT_ARROW = 39;
var KEY_SPACE = 32;
var KEY_ENTER = 13;
var KEY_TAB = 9;
var KEY_BACKSPACE = 8;
var KEY_ESCAPE = 27;
var KEY_STRING_ENTER = 'Enter';
var KEY_STRING_DOWN_ARROW = 'ArrowDown';
var KEY_STRING_UP_ARROW = 'ArrowUp';
var KEY_STRING_LEFT_ARROW = 'ArrowLeft';
var KEY_STRING_RIGHT_ARROW = 'ArrowRight';
var KEY_STRING_TAB = 'Tab';
var KEY_STRING_BACKSPACE = 'Backspace';
var KEY_STRING_ESCAPE = 'Escape';
var ElementCustomValue = function (e) {
    var target = e.target;
    if (!!target) {
        var returnValue = target['customValue'] === undefined ? target.value : target.customValue;
        if (target.classList.contains('isNumber')) {
            return intelliwaketsfoundation.CleanNumber(returnValue);
        }
        return returnValue;
    }
    return null;
};
var ClassNames = function (classes) {
    var _a;
    return ((_a = Object.keys(classes).filter(function (classitem) { return classes[classitem]; })) !== null && _a !== void 0 ? _a : []).join(' ');
};
var HasPathComponent = function (search) {
    var searchCalc = search.toLowerCase();
    if (!searchCalc.startsWith('/')) {
        searchCalc = '/' + searchCalc;
    }
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    var pathName = window.location.pathname.toLowerCase();
    if (!pathName.endsWith('/')) {
        pathName += '/';
    }
    return pathName.indexOf(searchCalc) >= 0;
};
var GetPathComponentAfter = function (search) {
    var searchCalc = search.toLowerCase();
    if (!searchCalc.endsWith('/')) {
        searchCalc += '/';
    }
    var startPos = window.location.pathname.toLowerCase().indexOf(searchCalc);
    if (startPos >= 0) {
        var after = window.location.pathname.substr(startPos + searchCalc.length);
        var slashPos = after.toLowerCase().indexOf('/');
        if (slashPos >= 0) {
            return after.substring(0, slashPos);
        }
        else {
            return after;
        }
    }
    return undefined;
};
var GetPathThrough = function (search) {
    var searchCalc = search.toLowerCase();
    var startPosSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc + '/');
    if (startPosSlash >= 0) {
        return window.location.pathname.substr(0, startPosSlash + searchCalc.length);
    }
    var startPosNoSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc);
    if (startPosNoSlash >= 0) {
        var possibleComplete = window.location.pathname.substr(0, startPosNoSlash + searchCalc.length);
        if (possibleComplete.length === window.location.pathname.length) {
            return possibleComplete;
        }
    }
    return undefined;
};
var CaptureGPS = function () {
    return new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve(position);
                }, function () {
                    resolve(null);
                });
            }
            else {
                resolve(null);
            }
            return [2 /*return*/];
        });
    }); });
};
var DownloadBase64Data = function (fileName, base64, type) {
    if (!!window.navigator.msSaveBlob) {
        // IE
        var byteCharacters = atob(base64.replace(/^[^,]+,/, '').replace(/\r\n/g, ''));
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: type });
        window.navigator.msSaveOrOpenBlob(blob, fileName);
    }
    else {
        var link = document.createElement('a');
        link.href = base64;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
};

var initialActivityOverlayState = {
    nestedCount: 0,
    lastStart: undefined
};
var AddActivityOverlay = function (prevState) {
    return {
        nestedCount: prevState.nestedCount + 1,
        lastStart: moment__default['default']()
    };
};
var RemoveActivityOverlay = function (prevState) {
    if (prevState.nestedCount < 1) {
        console.log('WARNING: Additional RemoveActivityOverlay called');
        return initialActivityOverlayState;
    }
    return {
        nestedCount: prevState.nestedCount - 1,
        lastStart: moment__default['default']()
    };
};
/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
var ActivityOverlay = function (props) {
    function resetActivityOverlay() {
        var _a;
        if (props.activityOverlayState.nestedCount > 0) {
            var seconds = 5;
            if (moment__default['default']().diff((_a = props.activityOverlayState.lastStart) !== null && _a !== void 0 ? _a : 0, 'seconds') >= seconds) {
                props.resetActivityOverlay();
            }
        }
    }
    if (props.activityOverlayState.nestedCount > 0) {
        return (React__default['default'].createElement("div", { className: "System_ActivityOverlay", onClick: resetActivityOverlay, color: "primary" },
            React__default['default'].createElement(reactstrap.Spinner, { style: { width: '3rem', height: '3rem' } })));
    }
    return null;
};

/**
 * An overlay with a white background and a spinner that covers the entire surface of it's parent component.
 */
var ActivityOverlayControl = function (props) {
    var _a, _b;
    return props.show ? React__default['default'].createElement("div", { className: "System_ActivityOverlay_Control" },
        React__default['default'].createElement(reactstrap.Spinner, { style: { width: (_a = props.spinnerSize) !== null && _a !== void 0 ? _a : '2rem', height: (_b = props.spinnerSize) !== null && _b !== void 0 ? _b : '2rem' } }))
        :
            null;
};

var initialSortProperties = {
    sort_column: null,
    sort_ascending: true,
    empty_to_bottom: true,
    sort_column_2: null,
    sort_ascending_2: true,
    empty_to_bottom_2: true
};
var SetSort = function (currentProperties, columnName, emptyToBottom, forceDirection) {
    if (emptyToBottom === void 0) { emptyToBottom = true; }
    if (forceDirection === void 0) { forceDirection = null; }
    if (columnName === currentProperties.sort_column) {
        return __assign(__assign({}, currentProperties), { sort_ascending: !currentProperties.sort_ascending });
    }
    else {
        return __assign(__assign({}, currentProperties), { sort_column_2: currentProperties.sort_column, sort_ascending_2: currentProperties.sort_ascending, empty_to_bottom_2: currentProperties.empty_to_bottom, sort_column: columnName, sort_ascending: forceDirection === null ? true : forceDirection, empty_to_bottom: emptyToBottom });
    }
};
var SortObjects = function (objects, sortProperties) {
    if (sortProperties.sort_column !== null) {
        return objects.sort(function (object_a, object_b) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
            var emptyToBottom_1 = sortProperties.empty_to_bottom
                ? !!object_a[(_a = sortProperties.sort_column) !== null && _a !== void 0 ? _a : ''] && !object_b[(_b = sortProperties.sort_column) !== null && _b !== void 0 ? _b : '']
                    ? -1
                    : !object_a[(_c = sortProperties.sort_column) !== null && _c !== void 0 ? _c : ''] && !!object_b[(_d = sortProperties.sort_column) !== null && _d !== void 0 ? _d : '']
                        ? 1
                        : 0
                : 0;
            var comparison_1 = (isNaN(object_a[(_e = sortProperties.sort_column) !== null && _e !== void 0 ? _e : ''])
                ? ((_g = object_a[(_f = sortProperties.sort_column) !== null && _f !== void 0 ? _f : '']) !== null && _g !== void 0 ? _g : '').localeCompare((_j = object_b[(_h = sortProperties.sort_column) !== null && _h !== void 0 ? _h : '']) !== null && _j !== void 0 ? _j : '', undefined, { sensitivity: 'base' })
                : object_a[(_k = sortProperties.sort_column) !== null && _k !== void 0 ? _k : ''] - object_b[(_l = sortProperties.sort_column) !== null && _l !== void 0 ? _l : '']) *
                (sortProperties.sort_ascending ? 1 : -1);
            if (sortProperties.sort_column_2 === null) {
                return emptyToBottom_1 || comparison_1;
            }
            else {
                var emptyToBottom_2 = sortProperties.empty_to_bottom_2
                    ? !!object_a[(_m = sortProperties.sort_column_2) !== null && _m !== void 0 ? _m : ''] && !object_b[(_o = sortProperties.sort_column_2) !== null && _o !== void 0 ? _o : '']
                        ? -1
                        : !object_a[(_p = sortProperties.sort_column_2) !== null && _p !== void 0 ? _p : ''] && !!object_b[(_q = sortProperties.sort_column_2) !== null && _q !== void 0 ? _q : '']
                            ? 1
                            : 0
                    : 0;
                var comparison_2 = (isNaN(object_a[(_r = sortProperties.sort_column_2) !== null && _r !== void 0 ? _r : ''])
                    ? ((_t = object_a[(_s = sortProperties.sort_column_2) !== null && _s !== void 0 ? _s : '']) !== null && _t !== void 0 ? _t : '').localeCompare((_v = object_b[(_u = sortProperties.sort_column_2) !== null && _u !== void 0 ? _u : '']) !== null && _v !== void 0 ? _v : '', undefined, { sensitivity: 'base' })
                    : object_a[(_w = sortProperties.sort_column_2) !== null && _w !== void 0 ? _w : ''] - object_b[(_x = sortProperties.sort_column_2) !== null && _x !== void 0 ? _x : '']) *
                    (sortProperties.sort_ascending_2 ? 1 : -1);
                return emptyToBottom_1 || comparison_1 || emptyToBottom_2 || comparison_2;
            }
        });
    }
    else {
        return objects;
    }
};
var FilterObjects = function (objects, filter) {
    if (!filter)
        return objects;
    var filterItems = filter
        .split(' ')
        .filter(function (filterItem) { return !!filterItem; })
        .map(function (filterItem) { return filterItem.toString().toLowerCase(); });
    return objects.filter(function (object) {
        var values = Object.values(object).join('}{').toLowerCase();
        return filterItems.length === filterItems.filter(function (filterItem) { return values.includes(filterItem); }).length;
    });
};

var ComputeValue = function (value, column, rowData, sumsInFooter) {
    var _a, _b;
    var computedValue = !!column.customWriter ? column.customWriter(value) : !!column.customWriterFromRow ? column.customWriterFromRow(rowData) : value;
    if (column.sumInFooter) {
        sumsInFooter[column.fieldName] = ((_a = sumsInFooter[column.fieldName]) !== null && _a !== void 0 ? _a : 0.0);
        if (computedValue) {
            sumsInFooter[column.fieldName] += (_b = parseFloat(computedValue)) !== null && _b !== void 0 ? _b : 0.0;
        }
    }
    return computedValue;
};
var FormatValue = function (value, column) {
    if (column.momentTSFormat) {
        if (value) {
            if (!isNaN(parseInt(value))) {
                value = moment__default['default'].unix(value / 1000).format(column.momentTSFormat);
            }
        }
        else {
            value = null;
        }
    }
    return value;
};
var IsColumnEmpty = function (arrayData, fieldName) {
    if (!arrayData)
        return true;
    return !arrayData.find(function (item) { var _a; return !!((_a = item[fieldName]) !== null && _a !== void 0 ? _a : null); });
};
var ValidColumns = function (arrayData, arrayStructure) {
    var _a;
    return (_a = arrayStructure.columns.filter(function (column) {
        return (!column.hideOnEmpty || !IsColumnEmpty(arrayData, column.fieldName)) &&
            (!column.hideOnFunction || column.hideOnFunction(arrayData));
    })) !== null && _a !== void 0 ? _a : [];
};
var StructuredArray = function (arrayData, arrayStructure) {
    var structuredArray = [];
    var sumsInFooter = {};
    var validColumns = ValidColumns(arrayData, arrayStructure);
    structuredArray.push(validColumns.map(function (column) { return column.title; }));
    var _loop_1 = function (row) {
        structuredArray.push(validColumns.map(function (column) { var _a; return FormatValue(ComputeValue((_a = row[column.fieldName]) !== null && _a !== void 0 ? _a : null, column, row, sumsInFooter), column); }));
    };
    for (var _i = 0, _a = (arrayData !== null && arrayData !== void 0 ? arrayData : []); _i < _a.length; _i++) {
        var row = _a[_i];
        _loop_1(row);
    }
    if (Object.keys(sumsInFooter).length > 0) {
        structuredArray.push(validColumns.map(function (column) { var _a; return FormatValue((_a = sumsInFooter[column.fieldName]) !== null && _a !== void 0 ? _a : null, column); }));
    }
    return structuredArray;
};
var ScreenFormatValue = function (value, column) {
    if (column.toDigitsPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = intelliwaketsfoundation.ToDigitsDash(value, column.toDigitsPrecision);
        }
        else if (column.blankIfBlank) {
            value = intelliwaketsfoundation.ToDigitsBlank(value, column.toDigitsPrecision);
        }
        else {
            value = intelliwaketsfoundation.ToDigits(value, column.toDigitsPrecision);
        }
    }
    else if (column.toCurrencyPrecision !== undefined) {
        if (column.dashIfBlank) {
            value = intelliwaketsfoundation.ToCurrencyDash(value, column.toDigitsPrecision);
        }
        else if (column.blankIfBlank) {
            value = intelliwaketsfoundation.ToCurrencyBlank(value, column.toDigitsPrecision);
        }
        else {
            value = intelliwaketsfoundation.ToCurrency(value, column.toDigitsPrecision);
        }
    }
    else {
        value = FormatValue(value, column);
    }
    return value;
};
var ColumnHeadClassNames = function (column, arrayStructure, otherClasses) {
    if (otherClasses === void 0) { otherClasses = {}; }
    return ColumnClassNames(column, __assign({ 'hoverAction': !!arrayStructure.sortable && !column.doNotSort }, otherClasses));
};
var ColumnBodyClassNames = function (column, otherClasses) {
    if (otherClasses === void 0) { otherClasses = {}; }
    return ColumnClassNames(column, __assign({ 'small': !!column.bodySmall }, otherClasses));
};
var ColumnClassNames = function (column, otherClasses) {
    var _a;
    var _b;
    if (otherClasses === void 0) { otherClasses = {}; }
    return ClassNames(__assign((_a = { 'text-right': column.toDigitsPrecision !== undefined || column.toCurrencyPrecision !== undefined || column.momentTSFormat !== undefined }, _a['td-' + ((_b = column.size) !== null && _b !== void 0 ? _b : '')] = !!column.size, _a), otherClasses));
};
var ColumnHeaderClick = function (column, arrayStructure, sorter, setSorter) {
    if (!!arrayStructure.sortable && !column.doNotSort) {
        var newSort = SetSort(sorter, column.fieldName);
        setSorter(newSort);
    }
};
var WriteHeadTR = function (arrayStructure, validColumns, hideCosts, sorter, setSorter) {
    return (React__default['default'].createElement("tr", { className: "table-secondary" }, validColumns.map(function (column, idx) {
        return !hideCosts || !column.isACost ?
            React__default['default'].createElement("th", { key: idx, className: ColumnHeadClassNames(column, arrayStructure), onClick: function () {
                    ColumnHeaderClick(column, arrayStructure, sorter, setSorter);
                } }, column.title)
            : null;
    })));
};
var WriteBodyTR = function (rowData, idx, arrayStructure, validColumns, hideCosts, sumsInFooter) {
    return (React__default['default'].createElement("tr", { key: idx, onClick: function () {
            if (!!arrayStructure.rowClick)
                arrayStructure.rowClick(rowData);
        } }, validColumns.map(function (column, idx) { var _a; return WriteBodyTD((_a = rowData[column.fieldName]) !== null && _a !== void 0 ? _a : undefined, column, hideCosts, rowData, sumsInFooter, idx); })));
};
var WriteBodyTD = function (columnValue, column, hideCosts, rowData, sumsInFooter, idx) {
    if (!hideCosts || !column.isACost) {
        var computedValue = ComputeValue(columnValue, column, rowData, sumsInFooter);
        var formattedValue = ScreenFormatValue(computedValue, column);
        return (React__default['default'].createElement("td", { key: idx, className: ColumnBodyClassNames(column) }, formattedValue));
    }
    else {
        return null;
    }
};
var WriteFootTR = function (validColumns, sums, hideCosts) {
    return (React__default['default'].createElement("tr", { className: "border-top" }, validColumns.map(function (column, idx) {
        return (!hideCosts || !column.isACost) ?
            React__default['default'].createElement("th", { key: idx, className: ColumnClassNames(column, {
                    'border-0': true
                }) }, sums[column.fieldName] === undefined ?
                null
                :
                    ScreenFormatValue(sums[column.fieldName], column))
            : null;
    })));
};

var ArrayTable = function (props) {
    var _a;
    var _b, _c, _d;
    var _e = React.useState(__assign(__assign({}, initialSortProperties), { sort_column: (_b = props.arrayStructure.defaultSortColumn) !== null && _b !== void 0 ? _b : null })), sorter = _e[0], setSorter = _e[1];
    var sumsInFooter = {};
    var validColumns = ValidColumns(props.arrayData, props.arrayStructure);
    var styleSettings = {};
    if (props.minWidth) {
        styleSettings.minWidth = props.minWidth;
    }
    return (React__default['default'].createElement(reactstrap.Table, { size: "sm", bordered: props.bordered, className: ClassNames((_a = {
                'table-scrollable': !!props.scrollable
            },
            _a[(_c = 'table-col-min-' + props.arrayStructure.minColSize) !== null && _c !== void 0 ? _c : ''] = !!props.arrayStructure.minColSize,
            _a)), style: styleSettings, hover: !!props.arrayStructure.rowClick },
        React__default['default'].createElement("thead", null, WriteHeadTR(props.arrayStructure, validColumns, !!props.hideCosts, sorter, setSorter)),
        React__default['default'].createElement("tbody", null, SortObjects((_d = props.arrayData) !== null && _d !== void 0 ? _d : [], sorter).map(function (row, idx) {
            return WriteBodyTR(row, idx, props.arrayStructure, validColumns, !!props.hideCosts, sumsInFooter);
        })),
        Object.keys(sumsInFooter).length > 0 ?
            React__default['default'].createElement("tfoot", null, WriteFootTR(validColumns, sumsInFooter, !!props.hideCosts))
            :
                null));
};

var customRangeName = 'Custom Range';
var DateRangeDateMomentToString = function (date) { var _a; return typeof date === 'string' ? date : (_a = intelliwaketsfoundation.MomentDateString(date.startOf('day'))) !== null && _a !== void 0 ? _a : moment__default['default']().format('YYYY-MM-DD'); };
var DateRangeDateStringToMoment = function (date) { var _a; return typeof date === 'string' ? (_a = intelliwaketsfoundation.MomentFromString(date)) !== null && _a !== void 0 ? _a : moment__default['default']() : date; };
var DateRangeToMoment = function (dateRange) { return ({
    name: dateRange.name,
    start: DateRangeDateStringToMoment(dateRange.start),
    end: DateRangeDateStringToMoment(dateRange.end)
}); };
var DateRangeToString = function (dateRange) { return ({
    name: dateRange.name,
    start: DateRangeDateMomentToString(dateRange.start),
    end: DateRangeDateMomentToString(dateRange.end)
}); };
var initialDateRange = {
    name: customRangeName,
    start: moment__default['default'](),
    end: moment__default['default']()
};
var initialDateRangeString = DateRangeToString(initialDateRange);
var DateRangeCalendar = function (props) {
    var moments = [];
    var firstDay = props.month.clone().startOf('month');
    var currentDay = firstDay.clone().startOf('week');
    var lastDay = props.month.clone().endOf('month');
    while (currentDay.isBefore(lastDay)) {
        var week = [];
        do {
            week.push(currentDay.clone());
            currentDay.add(1, 'day');
        } while (currentDay.weekday() > 0);
        moments.push(week);
    }
    var prev = function () {
        if (props.prevMonth) {
            props.prevMonth();
        }
    };
    var next = function () {
        if (props.nextMonth) {
            props.nextMonth();
        }
    };
    return (React__default['default'].createElement("table", null,
        React__default['default'].createElement("thead", null,
            React__default['default'].createElement("tr", null,
                props.prevMonth !== undefined
                    ?
                        React__default['default'].createElement("th", { className: "prev available", onClick: prev },
                            React__default['default'].createElement("span", null, " "))
                    :
                        React__default['default'].createElement("th", null),
                React__default['default'].createElement("th", { colSpan: 5, className: "month" }, firstDay.format('MMM YYYY')),
                props.nextMonth !== undefined
                    ?
                        React__default['default'].createElement("th", { className: "next available", onClick: next },
                            React__default['default'].createElement("span", null, " "))
                    :
                        React__default['default'].createElement("th", null)),
            React__default['default'].createElement("tr", null,
                React__default['default'].createElement("th", null, "Su"),
                React__default['default'].createElement("th", null, "Mo"),
                React__default['default'].createElement("th", null, "Tu"),
                React__default['default'].createElement("th", null, "We"),
                React__default['default'].createElement("th", null, "Th"),
                React__default['default'].createElement("th", null, "Fr"),
                React__default['default'].createElement("th", null, "Sa"))),
        React__default['default'].createElement("tbody", null, moments.map(function (week, idx) {
            return React__default['default'].createElement("tr", { key: idx }, week.map(function (day) {
                return React__default['default'].createElement("td", { className: (day.format('dd') === 'Sa' || day.format('dd') === 'Su' ? 'weekend ' : '') +
                        ((day.isBefore(firstDay, 'day') || day.isAfter(lastDay, 'day')) && !day.isBetween(props.startSelected, props.endSelected, 'day', '[]') ? 'off ends ' : '') +
                        (day.isSame(props.startSelected, 'day') ? 'active start-date ' : '') +
                        (day.isBetween(props.startSelected, props.endSelected, 'day') ? 'in-range ' : '') +
                        (day.isSame(props.endSelected, 'day') ? 'active end-date ' : '') +
                        'available ', key: day.format(), onClick: function () { return props.dateClick(day); } }, day.format('D'));
            }));
        }))));
};
var DateRange = function (props) {
    var _a;
    var nodeParent = React.useRef();
    var nodeBody = React.useRef();
    var getStartRange = function () {
        if (props.defaultRange && props.defaultRange.name) {
            if (props.defaultRange.name === customRangeName) {
                return DateRangeToMoment(props.defaultRange);
            }
            if (!!props.presetRanges) {
                var presetRanges = props.presetRanges.map(function (range) { return DateRangeToMoment(range); });
                if (presetRanges.length > 0) {
                    var foundItem = presetRanges.find(function (item) { return props.defaultRange.name === item.name; });
                    if (foundItem) {
                        return foundItem;
                    }
                    var foundItemStartsWith = presetRanges.find(function (item) { return item.name.startsWith(props.defaultRange.name); });
                    if (foundItemStartsWith) {
                        return foundItemStartsWith;
                    }
                }
            }
        }
        if (props.presetRanges && props.presetRanges.length > 0)
            return DateRangeToMoment(props.presetRanges[0]);
        return initialDateRange;
    };
    var _b = React.useState({
        isOpen: false,
        selectedRange: getStartRange(),
        selectedText: '',
        prevPreset: null,
        customRange: initialDateRange,
        monthToShow: getStartRange().start,
        applyToFirst: true
    }), state = _b[0], setState = _b[1];
    var getCurrentRange = function () {
        if (state.selectedRange)
            return state.selectedRange;
        return getStartRange();
    };
    var currentRange = getCurrentRange();
    var rangeDescription = function (range) {
        return (range.name === customRangeName ? (moment__default['default'](range.start).format('L') + ' - ' + moment__default['default'](range.end).format('L')) : range.name);
    };
    var setOpen = function (e) {
        if (!nodeBody.current.contains(e.target)) {
            setState(__assign(__assign({}, state), { isOpen: true }));
        }
    };
    var handleClick = function (e) {
        if (!nodeParent.current.contains(e.target)) {
            setState(__assign(__assign({}, state), { isOpen: false }));
        }
    };
    var handlePresetClick = function (range) {
        setState(__assign(__assign({}, state), { isOpen: false, selectedRange: range }));
        if (!!props.selectRange)
            props.selectRange(range);
        if (!!props.selectRangeString)
            props.selectRangeString(DateRangeToString(range));
    };
    var handleCustomApplyClick = function () {
        setState(__assign(__assign({}, state), { isOpen: false, selectedRange: state.customRange }));
        if (!!props.selectRange)
            props.selectRange(state.customRange);
        if (!!props.selectRangeString)
            props.selectRangeString(DateRangeToString(state.customRange));
    };
    var handleCustomClick = function () {
        var customRange = __assign(__assign({}, getCurrentRange()), { name: customRangeName });
        setState(__assign(__assign({}, state), { prevPreset: currentRange, customRange: customRange }));
    };
    var handleUnCustomClick = function () {
        var customRange = __assign(__assign({}, getCurrentRange()), { name: customRangeName });
        setState(__assign(__assign({}, state), { prevPreset: null, customRange: customRange }));
    };
    var handleDateClick = function (day) {
        var _a;
        var newState = __assign({}, state);
        if (newState.applyToFirst) {
            newState.customRange.start = day;
        }
        else {
            newState.customRange.end = day;
        }
        if (newState.customRange.start.isAfter(newState.customRange.end)) {
            _a = [newState.customRange.end, newState.customRange.start], newState.customRange.start = _a[0], newState.customRange.end = _a[1];
        }
        newState.applyToFirst = !newState.applyToFirst;
        setState(newState);
    };
    var prevMonth = function () {
        var prev = state.monthToShow.clone().subtract(1, 'month');
        setState(__assign(__assign({}, state), { monthToShow: prev }));
    };
    var nextMonth = function () {
        var next = state.monthToShow.clone().add(1, 'month');
        setState(__assign(__assign({}, state), { monthToShow: next }));
    };
    React.useEffect(function () {
        document.addEventListener('mousedown', handleClick);
        return function () {
            document.removeEventListener('mousedown', handleClick);
        };
    });
    return (React__default['default'].createElement("div", { className: 'DateRangeDD ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') + (props.borderless ? '' : ' border') + (props.showCaret ? ' dropdown-toggle' : ''), onClick: setOpen, ref: nodeParent, color: props.color },
        props.faIcon !== null ?
            React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: props.faIcon ? props.faIcon : proRegularSvgIcons.faCalendarAlt, fixedWidth: true })
            : null,
        " ",
        rangeDescription(state.selectedRange),
        React__default['default'].createElement("div", { className: 'DateRangeLB OpensRight' + (state.isOpen ? '' : ' d-none'), ref: nodeBody },
            React__default['default'].createElement("div", { className: 'ranges' + (state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("ul", null,
                    props.presetRanges.map(function (preset, idx) {
                        return React__default['default'].createElement("li", { key: idx, onClick: function () { return handlePresetClick(preset); }, className: (preset.name === currentRange.name ? 'active' : '') }, preset.name);
                    }),
                    React__default['default'].createElement("li", { onClick: handleCustomClick },
                        customRangeName,
                        React__default['default'].createElement("span", { className: "float-right" }, ">")))),
            React__default['default'].createElement("div", { className: 'drp-headers' + (!state.prevPreset ? ' d-none' : ''), onClick: handleUnCustomClick },
                React__default['default'].createElement("span", null, "< Presets")),
            React__default['default'].createElement("div", { className: 'drp-calendar left' + (!state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("div", { className: "calendar-table" },
                    React__default['default'].createElement(DateRangeCalendar, { month: state.monthToShow, startSelected: state.customRange.start, endSelected: state.customRange.end, prevMonth: prevMonth, nextMonth: nextMonth, dateClick: handleDateClick }))),
            React__default['default'].createElement("div", { className: 'drp-buttons' + (!state.prevPreset ? ' d-none' : '') },
                React__default['default'].createElement("span", { className: "drp-selected" }, rangeDescription(state.customRange)),
                React__default['default'].createElement("button", { className: "btn btn-sm btn-primary", type: "button", onClick: handleCustomApplyClick }, "Apply")))));
};
var defaultRanges = [
    {
        name: 'This Week #' + moment__default['default']().format('w'),
        start: moment__default['default']().startOf('week'),
        end: moment__default['default']().endOf('week')
    },
    {
        name: 'Last Week #' + moment__default['default']().subtract(1, 'week').format('w'),
        start: moment__default['default']().subtract(1, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'Previous 4 Weeks',
        start: moment__default['default']().subtract(4, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'This Month',
        start: moment__default['default']().startOf('month'),
        end: moment__default['default']().endOf('month')
    },
    {
        name: 'Last Month',
        start: moment__default['default']().subtract(1, 'month').startOf('month'),
        end: moment__default['default']().subtract(1, 'month').endOf('month')
    },
    {
        name: 'Last 7 Days',
        start: moment__default['default']().subtract(6, 'days').startOf('day'),
        end: moment__default['default']().endOf('day')
    },
    {
        name: 'Last 30 Days',
        start: moment__default['default']().subtract(29, 'days').startOf('day'),
        end: moment__default['default']().endOf('day')
    }
];
var defaultRangeStrings = defaultRanges.map(function (range) { return DateRangeToString(range); });
var defaultRangesReport = [
    {
        name: 'This Week',
        start: moment__default['default']().startOf('week'),
        end: moment__default['default']().endOf('week')
    },
    {
        name: 'Last Week',
        start: moment__default['default']().subtract(1, 'week').startOf('week'),
        end: moment__default['default']().subtract(1, 'week').endOf('week')
    },
    {
        name: 'This Month',
        start: moment__default['default']().startOf('month'),
        end: moment__default['default']().endOf('month')
    },
    {
        name: 'Last Month',
        start: moment__default['default']().subtract(1, 'month').startOf('month'),
        end: moment__default['default']().subtract(1, 'month').endOf('month')
    },
    {
        name: 'Year-to-Date',
        start: moment__default['default']().startOf('year'),
        end: moment__default['default']().endOf('year')
    },
    {
        name: 'Last Year',
        start: moment__default['default']().subtract(1, 'year').startOf('year'),
        end: moment__default['default']().subtract(1, 'year').endOf('year')
    }
];
var defaultRangeStringsReport = defaultRangesReport.map(function (range) { return DateRangeToString(range); });
/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
var defaultRange = {
    name: 'This Month',
    start: moment__default['default']().startOf('month'),
    end: moment__default['default']().endOf('month')
};
/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
var defaultRangeWeek = {
    name: 'This Week',
    start: moment__default['default']().startOf('week'),
    end: moment__default['default']().endOf('week')
};
/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
var defaultRangeLast4Weeks = {
    name: 'Last 4 Weeks',
    start: moment__default['default']().subtract(3, 'week').startOf('week'),
    end: moment__default['default']().endOf('week')
};
/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
var defaultRangeYear = {
    name: 'Year-to-Date',
    start: moment__default['default']().startOf('year'),
    end: moment__default['default']().endOf('year')
};
var defaultRangeString = DateRangeToString(defaultRange);
// DateRange.defaultProps = {
// 	presetRanges: defaultRanges,
// 	showCaret: true,
// 	borderless: false
// } as Partial<IPropsDateRange>

/**
 * An array-driven drop down control
 */
var DDActions = function (props) {
    var _a;
    var visibleDDActions = React.useMemo(function () {
        return (typeof props.ddActions === 'function' ? props.ddActions() : props.ddActions).filter(function (ddAction) { return !ddAction.hidden; });
    }, [props.ddActions]);
    var showDDActions = React.useMemo(function () { return !props.hidden && visibleDDActions.length > 0; }, [visibleDDActions, props.hidden]);
    var showFAProps = React.useMemo(function () { return !!visibleDDActions.find(function (ddAction) { return !!ddAction.faProps; }); }, [visibleDDActions]);
    if (!showDDActions)
        return null;
    return (React__default['default'].createElement(reactstrap.UncontrolledButtonDropdown, null,
        React__default['default'].createElement(reactstrap.DropdownToggle, { caret: !props.noCaret, className: props.className, color: props.color, size: props.size },
            props.faProps !== null && (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, __assign({}, ((_a = props.faProps) !== null && _a !== void 0 ? _a : { icon: proRegularSvgIcons.faCog }), { fixedWidth: !!props.buttonText }))),
            props.buttonText),
        React__default['default'].createElement(reactstrap.DropdownMenu, { right: props.right }, visibleDDActions.map(function (ddAction, idx) { return (React__default['default'].createElement(reactstrap.DropdownItem, { key: idx, disabled: !!ddAction.disabled, divider: !!ddAction.divider, header: !!ddAction.header, onClick: function () { return (!!ddAction.action ? ddAction.action() : function () { }); } },
            showFAProps && (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, __assign({ icon: proRegularSvgIcons.faCog }, ddAction.faProps, { className: !ddAction.faProps || ddAction.faPropHidden ? 'invisible' : '', fixedWidth: true }))),
            ddAction.title)); }))));
};

function InputCheckBox(props) {
    var _a;
    var newID = React.useMemo(function () { var _a; return (_a = props.id) !== null && _a !== void 0 ? _a : 'cb' + props.name + Math.floor(Math.random() * 100000 + 1); }, [
        props.name,
        props.id
    ]);
    var handleInputChange = function (e) {
        e.target.value = e.target.checked.toString();
        e.target.customValue = e.target.checked;
        if (!!props.onChange) {
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(e.target.checked, e.target.name);
        }
    };
    return (React__default['default'].createElement(reactstrap.CustomInput, { type: "checkbox", label: props.label, name: props.name, className: 'inputCheckbox ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') + (props.plainText ? ' plainText' : ''), id: newID, hidden: props.hidden, checked: props.checked, onChange: !props.plainText ? handleInputChange : function () { }, disabled: props.plainText }));
}

var ReduceInputProps = function (props) {
    var subset = __assign({}, props);
    delete subset.plainText;
    delete subset.plainTextURL;
    delete subset.plainTextProps;
    delete subset.changeValue;
    delete subset.onChange;
    return subset;
};
var HandleChangeValue = function (e, changeValue, onChange) {
    if (!!changeValue) {
        changeValue(ElementCustomValue(e), e.target.name);
    }
    if (!!onChange) {
        onChange(e);
    }
};
//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}

function InputColor(props) {
    var _a, _b, _c;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.className;
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps),
            React__default['default'].createElement(reactstrap.Input, __assign({ type: "color", className: (_a = 'inputText ' + props.className) !== null && _a !== void 0 ? _a : '' }, inputProps, { disabled: true })),
            props.value))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps),
        React__default['default'].createElement(reactstrap.Input, __assign({ type: "color", className: (_b = 'inputText ' + props.className) !== null && _b !== void 0 ? _b : '' }, inputProps, { disabled: true })),
        props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "color", className: (_c = 'inputText ' + props.className) !== null && _c !== void 0 ? _c : '' }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); } })))));
}

var originalValue = ' ';
function InputDate(props) {
    var _a;
    var lastDateValue = React.useRef(originalValue);
    var nextDateValue = React.useRef(originalValue);
    var _b = React.useState(originalValue), overrideValue = _b[0], setOverrideValue = _b[1];
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.value;
        delete subset.onChange;
        return subset;
    }, [props]);
    React.useEffect(function () {
        var _a, _b, _c, _d, _e;
        if (![lastDateValue.current, nextDateValue.current].includes((_a = intelliwaketsfoundation.MomentDateString(props.value)) !== null && _a !== void 0 ? _a : '')) {
            lastDateValue.current = (_c = intelliwaketsfoundation.MomentDateString(((_b = props.value) !== null && _b !== void 0 ? _b : ''))) !== null && _c !== void 0 ? _c : '';
            nextDateValue.current = lastDateValue.current;
            setOverrideValue(lastDateValue.current);
        }
        else {
            lastDateValue.current = (_e = intelliwaketsfoundation.MomentDateString(((_d = props.value) !== null && _d !== void 0 ? _d : ''))) !== null && _e !== void 0 ? _e : '';
        }
    }, [props.value]);
    var handleInputChange = function (e) {
        var _a, _b;
        nextDateValue.current = (_a = intelliwaketsfoundation.MomentDateString(e.target.value)) !== null && _a !== void 0 ? _a : '';
        setOverrideValue(e.target.value);
        var customValue = (nextDateValue.current + ' ' + ((_b = intelliwaketsfoundation.MomentTimeString(props.value)) !== null && _b !== void 0 ? _b : '')).trim();
        if (!!props.onChange) {
            e.target.customValue = customValue;
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(customValue, e.target.name);
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.showTime && !!intelliwaketsfoundation.MomentTimeString(props.value)
        ? intelliwaketsfoundation.MomentDisplayDayDateTime(props.value)
        : intelliwaketsfoundation.MomentDisplayDayDate(props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "date", className: "inputDate" }, inputProps, { placeholder: "yyyy-mm-dd", value: overrideValue !== null && overrideValue !== void 0 ? overrideValue : '', onChange: handleInputChange, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_a = props.name) !== null && _a !== void 0 ? _a : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

/**
 * A react datetime picker wrapper. Can also be used as a plain text to display the date/time values.
 */
function InputDatePicker(props) {
    var _a, _b;
    var setValue = function (date) {
        var _a, _b, _c;
        if (!!props.changeValue) {
            if (!date) {
                props.changeValue(intelliwaketsfoundation.MomentTimeString((_a = props.value) !== null && _a !== void 0 ? _a : ''), props.name);
            }
            else {
                if (!Array.isArray(date)) {
                    var dateValueString = moment__default['default'](date).format(intelliwaketsfoundation.MOMENT_FORMAT_DATE);
                    var timeValueString = (_c = intelliwaketsfoundation.MomentTimeString((_b = props.value) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : '';
                    props.changeValue((dateValueString + " " + timeValueString).trim(), props.name);
                }
            }
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.showTime && !!intelliwaketsfoundation.MomentTimeString(props.value)
        ? intelliwaketsfoundation.MomentDisplayDayDateTime(props.value)
        : intelliwaketsfoundation.MomentDisplayDayDate(props.value))) : (React__default['default'].createElement(ReactDatePicker__default['default'], { value: (_b = intelliwaketsfoundation.MomentDateString((_a = props.value) !== null && _a !== void 0 ? _a : '')) !== null && _b !== void 0 ? _b : '', onChange: setValue, className: "form-control inputDate", placeholderText: props.placeholder, todayButton: !props.noTodayButton ? 'Today' : undefined }))));
}

function InputEmail(props) {
    var _a;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.value ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps),
        React__default['default'].createElement("a", { href: 'mailto:' + props.value }, props.value))) : null) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "email", inputMode: "email", className: "inputEmail" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_a = props.name) !== null && _a !== void 0 ? _a : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

function InputSelect(props) {
    var _a;
    var handleInputChange = function (e) {
        if (!!props.isNumeric || !!props.isNumericOrNull) {
            var value = intelliwaketsfoundation.CleanNumber(e.target.value);
            if (!!props.isNumericOrNull && value === 0) {
                e.target.customValue = null;
            }
            else {
                e.target.customValue = value;
            }
        }
        else if (!!props.isStringOrNull && !e.target.value) {
            e.target.customValue = null;
        }
        if (!!props.onChange)
            props.onChange(e);
        if (!!props.changeValue)
            props.changeValue(ElementCustomValue(e), e.target.name);
    };
    var className = ((_a = props.className) !== null && _a !== void 0 ? _a : '') + " " + (!!props.required ? 'is-required' : '');
    return !!props.plainText && !!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement(reactstrap.Input, { type: "select", name: props.name, value: props.value, onChange: function () { }, innerRef: props.innerRef, className: 'inputSelect disabledLink ' + className, style: __assign(__assign({}, props.style), { pointerEvents: 'none' }), id: props.id, invalid: props.invalid }, props.children))) : !!props.plainText && !!props.plainOnClick ? (React__default['default'].createElement("div", { onClick: props.plainOnClick, className: "cursor-pointer" },
        React__default['default'].createElement(reactstrap.Input, { type: "select", name: props.name, value: props.value, onChange: function () { }, innerRef: props.innerRef, className: 'inputSelect disabledLink ' + className, style: __assign(__assign({}, props.style), { pointerEvents: 'none' }), id: props.id, invalid: props.invalid }, props.children))) : (React__default['default'].createElement(reactstrap.Input, { type: "select", name: props.name, value: props.value, onChange: handleInputChange, onBlur: props.onBlur, onKeyDown: props.onKeyDown, innerRef: props.innerRef, className: 'inputSelect ' + className, style: props.style, id: props.id, disabled: !!props.plainText, invalid: props.invalid }, props.children));
}

function InputGender(props) {
    var inputProps = React.useMemo(function () {
        var _a;
        var subset = ReduceInputProps(props);
        subset.value = (_a = subset.value) !== null && _a !== void 0 ? _a : '';
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(InputSelect, __assign({}, inputProps, { isStringOrNull: true, onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); } }),
            React__default['default'].createElement("option", null),
            React__default['default'].createElement("option", { value: "Male" }, "Male"),
            React__default['default'].createElement("option", { value: "Female" }, "Female"))))));
}

function InputNumber(props) {
    var _a, _b, _c, _d, _e;
    var _f = React.useState(undefined), currentStringOverride = _f[0], setCurrentStringOverride = _f[1];
    var handleKeyDown = function (e) {
        if (e.key === '-') {
            if (!(props.lowerBound !== undefined && props.lowerBound < 0)) {
                if (!props.allowNegative || (props.lowerBound !== undefined && props.lowerBound >= 0)) {
                    e.preventDefault();
                }
            }
        }
        if (e.key === '.' && props.decimalScale === 0) {
            e.preventDefault();
        }
        if (!!props.onKeyDown)
            props.onKeyDown(e);
    };
    var handleInputChange = function (e) {
        var _a, _b;
        var cleanNumber = intelliwaketsfoundation.CleanNumber((_a = e.target.value) !== null && _a !== void 0 ? _a : '');
        if (isNaN(cleanNumber)) {
            setCurrentStringOverride((_b = e.target.value) !== null && _b !== void 0 ? _b : '');
            e.target.customValue = 0;
            if (!!props.onChange) {
                props.onChange(e);
            }
            if (!!props.changeValue) {
                props.changeValue(e.target.customValue, e.target.name);
            }
        }
        else {
            if (props.lowerBound !== undefined && cleanNumber < props.lowerBound)
                cleanNumber = props.lowerBound;
            if (props.upperBound !== undefined && cleanNumber > props.upperBound)
                cleanNumber = props.upperBound;
            e.target.customValue = cleanNumber;
            if (!!props.onChange) {
                props.onChange(e);
            }
            if (!!props.changeValue) {
                props.changeValue(e.target.customValue, e.target.name);
            }
            // setCurrentStringOverride(undefined)
        }
    };
    var handleFocus = function (e) {
        e.target.select();
    };
    var options = {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
    };
    if (!!props.decimalScale)
        options.numeralDecimalScale = props.decimalScale;
    if (!!props.integerScale)
        options.numeralIntegerScale = props.integerScale;
    if (!!props.currency) {
        options.prefix = '$ ';
        options.numeralDecimalScale = props.decimalScale === undefined ? 2 : (_a = props.decimalScale) !== null && _a !== void 0 ? _a : undefined;
    }
    var hasDecimals = ((_b = props.decimalScale) !== null && _b !== void 0 ? _b : 0) > 0;
    React.useEffect(function () {
        var _a;
        var newVal = !props.value ? '' : ((_a = props.value) !== null && _a !== void 0 ? _a : '').toString();
        setCurrentStringOverride(newVal);
    }, [props.value]);
    var showCleave = React__default['default'].createElement(Cleave__default['default'], { options: options, className: props.className +
            ' inputNumber form-control ' +
            (hasDecimals ? 'numerics' : 'integers') +
            (!!props.invalid ? ' is-invalid' : ''), name: props.name, inputMode: hasDecimals ? 'decimal' : 'numeric', value: currentStringOverride, onChange: handleInputChange, onBlur: props.onBlur, htmlRef: props.htmlRef, onKeyDown: handleKeyDown, onFocus: handleFocus, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_c = props.name) !== null && _c !== void 0 ? _c : '') + "_" + intelliwaketsfoundation.RandomString(5), placeholder: props.placeholder, required: props.required, autoFocus: props.autoFocus, style: props.style, id: props.id });
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value !== null
        && !!props.currency
        ? (React__default['default'].createElement(React__default['default'].Fragment, null,
            props.prepend,
            intelliwaketsfoundation.ToCurrency(props.value, (_d = props.decimalScale) !== null && _d !== void 0 ? _d : 0),
            props.append))
        : (React__default['default'].createElement(React__default['default'].Fragment, null,
            props.prepend,
            intelliwaketsfoundation.ToDigits(props.value, (_e = props.decimalScale) !== null && _e !== void 0 ? _e : 0),
            props.append)))) : !!props.prepend || !!props.append ? (React__default['default'].createElement(reactstrap.InputGroup, null,
        React__default['default'].createElement(reactstrap.InputGroupAddon, { addonType: "prepend", hidden: !props.prepend },
            React__default['default'].createElement(reactstrap.InputGroupText, null, props.prepend)),
        showCleave,
        React__default['default'].createElement(reactstrap.InputGroupAddon, { addonType: "append", hidden: !props.append },
            React__default['default'].createElement(reactstrap.InputGroupText, null, props.append)))) : (React__default['default'].createElement(React__default['default'].Fragment, null, showCleave))));
}
// !== undefined
//              ? currentStringOverride
//              : props.value === null || (!!props.hideZero && !CleanNumber(props.value))
//              ? undefined
//              : props.value
//

function InputRadio(props) {
    var _a;
    var newID = React.useMemo(function () { var _a; return (_a = props.id) !== null && _a !== void 0 ? _a : 'r' + props.name + Math.floor(Math.random() * 100000 + 1); }, [
        props.name,
        props.id
    ]);
    return !!props.plainText ? (props.checked ? (props.label) : null) : (React__default['default'].createElement(reactstrap.CustomInput, { type: "radio", label: props.label, name: props.name, id: newID, className: 'inputRadio ' + ((_a = props.className) !== null && _a !== void 0 ? _a : ''), checked: props.checked, onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, value: props.value }));
}

/**
 * A search input with an option to have a trigger delay or not.
 */
var InputSearch = function (props) {
    var _a, _b, _c;
    var inputRef = React.useRef();
    var triggeredText = React.useRef((_a = props.initialValue) !== null && _a !== void 0 ? _a : '');
    var searchTimeout = React.useRef(setTimeout(function () { }, 100));
    var _d = React.useState(''), currentText = _d[0], setCurrentText = _d[1];
    var handleInputChange = function (e) {
        var _a;
        var value = (_a = e.target.value) !== null && _a !== void 0 ? _a : '';
        setCurrentText(value);
        if (!!props.triggerDelayAmount) {
            clearTimeout(searchTimeout.current);
            searchTimeout.current = setTimeout(function () {
                triggerChange(value);
            }, props.triggerDelayAmount);
        }
        else if (!props.triggerOnEnter) {
            props.triggerSearchText(value);
        }
    };
    var handleKeyDown = function (e) {
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout.current);
            triggerChange();
        }
        if (!!props.onKeyDown) {
            props.onKeyDown(e);
        }
    };
    var handleOnBlur = function () {
        clearTimeout(searchTimeout.current);
        triggerChange();
    };
    var triggerChange = function (searchText) {
        var textToSearch = searchText !== null && searchText !== void 0 ? searchText : currentText;
        if (textToSearch !== triggeredText.current) {
            triggeredText.current = textToSearch;
            props.triggerSearchText(textToSearch);
        }
    };
    React.useEffect(function () {
        var _a;
        setCurrentText((_a = props.initialValue) !== null && _a !== void 0 ? _a : '');
    }, [props.initialValue]);
    var handleOnFocus = function (e) {
        if (!!props.onFocus) {
            props.onFocus(e);
        }
        if (!props.noSelectOnFocus) {
            setTimeout(function () {
                if (!!inputRef.current) {
                    inputRef.current.select();
                }
            }, 250);
        }
    };
    var inputProps = {
        type: 'search',
        inputMode: 'search',
        className: "inputSearch " + ((_b = props.className) !== null && _b !== void 0 ? _b : '') + " " + (!!props.bordered ? '' : 'bg-transparent border-0'),
        value: currentText,
        onChange: handleInputChange,
        onBlur: handleOnBlur,
        innerRef: (function (ref) {
            if (!!props.innerRef) {
                props.innerRef(ref);
            }
            inputRef.current = ref;
        }),
        bsSize: props.size,
        style: props.style,
        placeholder: props.placeholder,
        onKeyDown: handleKeyDown,
        id: props.id,
        autoFocus: props.autoFocus,
        onFocus: handleOnFocus,
        autoComplete: props.autoCompleteOn ? 'on' : "AC_" + intelliwaketsfoundation.RandomString(12)
    };
    return (!!props.iconPrefix || !!props.reactPrefix) ? (React__default['default'].createElement(reactstrap.InputGroup, { className: "searchGroup " + ((_c = props.inputGroupClass) !== null && _c !== void 0 ? _c : '') + " " + (props.bordered ? '' : 'transparent') },
        (!!props.iconPrefix || !!props.reactPrefix) &&
            React__default['default'].createElement(reactstrap.InputGroupText, { onClick: function () {
                    if (!!inputRef.current)
                        inputRef.current.focus();
                } }, props.iconPrefix !== undefined ? (typeof props.iconPrefix === 'boolean' ?
                React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: proRegularSvgIcons.faSearch })
                :
                    React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, __assign({}, props.iconPrefix))) : props.reactPrefix),
        React__default['default'].createElement(reactstrap.Input, __assign({}, inputProps)))) : (React__default['default'].createElement(reactstrap.Input, __assign({}, inputProps)));
};

var OptionsActive = [
    { key: true, description: 'Active' },
    { key: false, description: 'Inactive' }
];
var OptionsActiveAll = __spreadArrays(OptionsActive, [{ key: null, description: 'All' }]);
/**
 * A input select that lets you update a state when selecting an option.
 */
var InputSelectStep = function (props) {
    var _a, _b, _c, _d;
    var classNames = !!props.inline
        ? 'd-inline-block outline-none '
        : 'form-control ' + (!!props.borderless ? ' bg-transparent border-0 ' : '');
    if (!props.plainText) {
        classNames += 'cursor-pointer ';
        if (!!props.inline)
            classNames += ' hoverUnderline ' + (props.color === '' ? '' : "text-" + ((_a = props.color) !== null && _a !== void 0 ? _a : 'primary') + " ");
    }
    classNames += (_b = ' ' + props.className) !== null && _b !== void 0 ? _b : '';
    var currentOptionIDX = React.useMemo(function () { return props.options.findIndex(function (option) { return option.key === props.value; }); }, [
        props.options,
        props.value
    ]);
    var click = function () {
        var _a;
        var newValue = (_a = props.options.find(function () { return true; })) === null || _a === void 0 ? void 0 : _a.key;
        if (currentOptionIDX < props.options.length - 1 && currentOptionIDX >= 0) {
            newValue = props.options[currentOptionIDX + 1].key;
        }
        if (!!props.changeValue)
            props.changeValue(newValue, props.name);
    };
    return (React__default['default'].createElement("div", { className: classNames, onClick: click, onKeyPress: click, tabIndex: 0 }, (_d = (_c = props.options[currentOptionIDX]) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : ''));
};

function InputSSN(props) {
    var _a, _b, _c;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.plainTextLast4Only;
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.plainTextLast4Only ? '...-' + ((_a = props.value) !== null && _a !== void 0 ? _a : '').toString().substr(-4) : props.value))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.plainTextLast4Only ? '...-' + ((_b = props.value) !== null && _b !== void 0 ? _b : '').toString().substr(-4) : props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "text", className: "inputText" }, inputProps, { pattern: "\\d{3}-?\\d{2}-?\\d{4}", onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_c = props.name) !== null && _c !== void 0 ? _c : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

function InputState(props) {
    var _a;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.onChange;
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    var handleInputChange = function (e) {
        if (!!props.onChange) {
            e.target.customValue = e.target.value.toUpperCase();
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(e.target.value.toUpperCase(), e.target.name);
        }
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "text", className: "inputText" }, inputProps, { onChange: handleInputChange, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_a = props.name) !== null && _a !== void 0 ? _a : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

function InputSwitch(props) {
    var _a;
    var newID = React.useMemo(function () { var _a; return (_a = props.id) !== null && _a !== void 0 ? _a : 'sw' + props.name + Math.floor(Math.random() * 100000 + 1); }, [
        props.name,
        props.id
    ]);
    var handleInputChange = function (e) {
        e.target.value = e.target.checked.toString();
        e.target.customValue = e.target.checked;
        if (!!props.onChange) {
            props.onChange(e);
        }
        if (!!props.changeValue) {
            props.changeValue(e.target.checked, e.target.name);
        }
    };
    return (React__default['default'].createElement(reactstrap.CustomInput, { type: "switch", label: props.label, name: props.name, className: 'inputSwitch cursor-pointer ' + ((_a = props.className) !== null && _a !== void 0 ? _a : '') + (props.plainText ? ' plainText' : ''), id: newID, hidden: props.hidden, checked: props.checked, onChange: !props.plainText ? handleInputChange : function () { }, disabled: props.plainText }));
}

var InputSwitchAlternate = function (props) {
    var _a, _b;
    var newID = React.useMemo(function () { var _a; return (_a = props.id) !== null && _a !== void 0 ? _a : 'sw' + props.name + Math.floor(Math.random() * 100000 + 1); }, [
        props.name,
        props.id
    ]);
    var valuesOnOff = (_a = props.valuesOnOff) !== null && _a !== void 0 ? _a : [1, 0];
    var handleInputChange = function (e) {
        e.target.value = (e.target.checked ? valuesOnOff[0] : valuesOnOff[1]).toString();
        e.target.customValue = e.target.checked ? valuesOnOff[0] : valuesOnOff[1];
        if (!!props.onChange)
            props.onChange(e);
        if (!!props.changeValue)
            props.changeValue(e.target.customValue, e.target.name);
    };
    return (React__default['default'].createElement(reactstrap.CustomInput, { type: "switch", label: props.label, name: props.name, className: 'inputSwitch ' + ((_b = props.className) !== null && _b !== void 0 ? _b : '') + (props.plainText ? ' plainText' : ''), id: newID, checked: props.value === valuesOnOff[0], onChange: !props.plainText ? handleInputChange : function () { } }));
};

function InputTel(props) {
    var _a, _b;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.showFAIcon;
        delete subset.onChange;
        return subset;
    }, [props]);
    var faIconToShow = React.useMemo(function () {
        if (!props.showFAIcon)
            return null;
        if (props.showFAIcon === true)
            return proRegularSvgIcons.faPhone;
        return props.showFAIcon;
    }, [props.showFAIcon]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), intelliwaketsfoundation.FormatPhoneNumber(props.value))) : !faIconToShow ? (React__default['default'].createElement(reactstrap.Input, __assign({ type: "tel", inputMode: "tel", className: "inputTel" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_a = props.name) !== null && _a !== void 0 ? _a : '') + "_" + intelliwaketsfoundation.RandomString(5) }))) : (React__default['default'].createElement(reactstrap.InputGroup, null,
        React__default['default'].createElement(reactstrap.Input, __assign({ type: "tel", inputMode: "tel", className: "inputTel" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_b = props.name) !== null && _b !== void 0 ? _b : '') + "_" + intelliwaketsfoundation.RandomString(5) })),
        React__default['default'].createElement(reactstrap.InputGroupAddon, { addonType: "append" },
            React__default['default'].createElement(reactstrap.InputGroupText, null,
                React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: faIconToShow })))))));
}

function InputText(props) {
    var _a, _b;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.className;
        delete subset.onChange;
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "text", className: (_a = 'inputText ' + props.className) !== null && _a !== void 0 ? _a : '' }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_b = props.name) !== null && _b !== void 0 ? _b : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

function InputTextArea(props) {
    var inputProps = React.useMemo(function () {
        var _a;
        var subset = ReduceInputProps(props);
        delete subset.plainText;
        delete subset.plainTextProps;
        delete subset.bordered;
        delete subset.onChange;
        subset.value = (_a = props.value) !== null && _a !== void 0 ? _a : '';
        return subset;
    }, [props]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: 'form-control-plaintext vertical-scroll horizontal-scroll' + (!!props.bordered ? ' border' : '') }, props.plainTextProps, { dangerouslySetInnerHTML: { __html: intelliwaketsfoundation.ReplaceLinks(intelliwaketsfoundation.CleanScripts('' + props.value)) }, style: {
            maxHeight: !!props.rows ? props.rows + 'rem' : '5rem',
            overflowY: 'scroll'
        } }))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "textarea", className: "inputTextArea" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); } })))));
}

var originalValue$1 = ' ';
function InputTime(props) {
    var lastTimeValue = React.useRef(originalValue$1);
    var nextTimeValue = React.useRef(originalValue$1);
    var _a = React.useState(originalValue$1), overrideValue = _a[0], setOverrideValue = _a[1];
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.value;
        delete subset.onChange;
        delete subset.editSeconds;
        return subset;
    }, [props]);
    React.useEffect(function () {
        var _a, _b, _c, _d, _e, _f;
        if (![lastTimeValue.current, nextTimeValue.current].includes((_a = intelliwaketsfoundation.MomentTimeString(props.value)) !== null && _a !== void 0 ? _a : '')) {
            lastTimeValue.current = (_c = intelliwaketsfoundation.MomentTimeString(((_b = props.value) !== null && _b !== void 0 ? _b : ''))) !== null && _c !== void 0 ? _c : '';
            nextTimeValue.current = lastTimeValue.current;
            setOverrideValue((_d = intelliwaketsfoundation.MomentFormatString(lastTimeValue.current, !!props.editSeconds ? intelliwaketsfoundation.MOMENT_FORMAT_TIME_SECONDS : intelliwaketsfoundation.MOMENT_FORMAT_TIME_NO_SECONDS)) !== null && _d !== void 0 ? _d : '');
        }
        else {
            lastTimeValue.current = (_f = intelliwaketsfoundation.MomentTimeString(((_e = props.value) !== null && _e !== void 0 ? _e : ''))) !== null && _f !== void 0 ? _f : '';
        }
    }, [props.value, props.editSeconds]);
    var handleInputChange = function (e) {
        var _a, _b;
        nextTimeValue.current = (_a = intelliwaketsfoundation.MomentTimeString(e.target.value)) !== null && _a !== void 0 ? _a : '';
        setOverrideValue(e.target.value);
        var customValue = (((_b = intelliwaketsfoundation.MomentDateString(props.value)) !== null && _b !== void 0 ? _b : '') + ' ' + nextTimeValue.current).trim();
        if (!!props.onChange) {
            e.target.customValue = customValue;
            props.onChange(e);
        }
        if (!!props.changeValue)
            props.changeValue(customValue, e.target.name);
    };
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), intelliwaketsfoundation.MomentDisplayTime(props.value))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "time", className: "inputTime" }, inputProps, { value: overrideValue, onChange: handleInputChange, step: !!props.editSeconds ? 1 : 60 })))));
}

function InputTimeZone(props) {
    var inputProps = React.useMemo(function () {
        var _a;
        var subset = ReduceInputProps(props);
        subset.value = (_a = subset.value) !== null && _a !== void 0 ? _a : '';
        if (subset.autoComplete === undefined) {
            subset.autoComplete = 'off';
        }
        return subset;
    }, [props]);
    var timeZonesList = React.useMemo(function () {
        var tzItems = intelliwaketsfoundation.TimeZoneOlsons();
        if (!!props.value && !tzItems.map(function (tzItem) { return tzItem.olson; }).includes(props.value)) {
            tzItems.push({ zone: '', olson: props.value, hours: '' });
        }
        return tzItems;
    }, []);
    var valueTZ = React.useMemo(function () { return (!props.value ? '' : intelliwaketsfoundation.IANAZoneAbbr(props.value)); }, [props.value]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.plainTextURL ? (React__default['default'].createElement(reactRouterDom.Link, { to: props.plainTextURL },
        React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.value ? (React__default['default'].createElement(React__default['default'].Fragment, null,
            valueTZ,
            ":",
            React__default['default'].createElement("span", { className: "text-muted" },
                " ",
                props.value))) : (React__default['default'].createElement("span", { className: "text-danger" }, "No Timezone set"))))) : (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), !!props.value ? (React__default['default'].createElement(React__default['default'].Fragment, null,
        valueTZ,
        ":",
        React__default['default'].createElement("span", { className: "text-muted" },
            " ",
            props.value))) : (React__default['default'].createElement("span", { className: "text-danger" }, "No Timezone set"))))) : (React__default['default'].createElement(React__default['default'].Fragment, null,
        React__default['default'].createElement(InputSelect, __assign({}, inputProps, { isStringOrNull: true, onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); } }),
            React__default['default'].createElement("option", null),
            timeZonesList.map(function (tzItem) { return (React__default['default'].createElement("option", { key: tzItem.olson, value: tzItem.olson },
                tzItem.zone,
                ": ",
                tzItem.olson)); }))))));
}

function InputUrl(props) {
    var _a;
    var inputProps = React.useMemo(function () {
        var subset = ReduceInputProps(props);
        delete subset.plainText;
        delete subset.plainTextProps;
        delete subset.onChange;
        return subset;
    }, [props]);
    var href = React.useMemo(function () {
        if (!('' + props.value).toString().toLowerCase().startsWith('http')) {
            return 'http://' + props.value;
        }
        return '' + props.value;
    }, [props.value]);
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (!!props.value ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext ellipses-truncate" }, props.plainTextProps),
        React__default['default'].createElement("a", { href: href, target: "_blank", rel: "noopener noreferrer" }, props.value))) : null) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "url", pattern: "https://.*", inputMode: "url", className: "inputUrl" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_a = props.name) !== null && _a !== void 0 ? _a : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

function InputZip(props) {
    var _a, _b;
    var inputProps = React.useMemo(function () {
        return ReduceInputProps(props);
    }, [props]);
    //pattern={!!props.withNine ? 'd{5}-?d{4}' : 'd{5}'}
    return (React__default['default'].createElement(React__default['default'].Fragment, null, !!props.plainText ? (React__default['default'].createElement("div", __assign({ className: "form-control-plaintext" }, props.plainTextProps), intelliwaketsfoundation.FormatZip(((_a = props.value) !== null && _a !== void 0 ? _a : '').toString()))) : (React__default['default'].createElement(reactstrap.Input, __assign({ type: "text", className: "inputZip" }, inputProps, { onChange: function (e) { return HandleChangeValue(e, props.changeValue, props.onChange); }, autoComplete: props.autoCompleteOn ? 'on' : "AC_" + ((_b = props.name) !== null && _b !== void 0 ? _b : '') + "_" + intelliwaketsfoundation.RandomString(5) })))));
}

/**
 * The IWServerData control is a React control that calls API's to a server and manages the state of the data in its control.
 *
 * The below example assumes that a higher-order-component called ServerData has been created.
 *
 * @example
 * const [serverDataUpdateProps, setServerDataUpdateProps] = useState<TServerDataUpdatedState>(null)
 *
 * setServerDataUpdateProps({
 *   item: 'Employee',
 *   updateVerb: 'Update',
 *   updateRequest: {
 *     id: 1,
 *     name: 'Bob Smith'
 *   },
 *   updatedAction: (response) => {
 *   		console.log(response)
 *   }
 * } as TServerDataUpdatedStateLocal<API_Employee_Update_Request, API_Employee_Update_Response>)
 *
 * <ServerData {...serverDataUpdateProps} setUpdateResponse={setServerDataUpdateProps} />
 *
 * @example
 * const apiEmployeeGetRequest: API_Employee_Get_Request = useMemo(() => {
 * 	return {id: props.id}
 * }, [props.id])
 *
 * const [apiEmployeeGetResponse, setAPIEmployeeGetResponse] = useState(undefined as TServerData<API_Employee_Get_Response>)
 *
 * <ServerData<API_Employee_Get_Request, API_Employee_Get_Response>
 *   item="Employee"
 *   verb="Get"
 *   request={apiEmployeeGetRequest}
 *   response={apiEmployeeGetResponse}
 *   setResponse={setAPIEmployeeGetResponse}>
 *   	{!!apiEmployeeGetResponse && (
 *   		<span>Employee: {apiEmployeeGetResponse.name}</span>
 *   	)}
 * </ServerData>
 *
 */
var IWServerData = function (props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var isMounted = React.useRef(true);
    var forceRefreshRef = React.useRef(props.forceRefresh);
    var lastRequest = React.useRef(props.request);
    // const cancelTokenSource = useRef(null as CancelTokenSource | null)
    var inProgress = React.useRef(false);
    var lastTS = React.useRef(0);
    var _m = React.useState(false), showInProgressControl = _m[0], setShowInProgressControl = _m[1];
    var setResponse = React.useCallback((_a = props.setResponse) !== null && _a !== void 0 ? _a : (function () { }), [props.setResponse]);
    var setUpdateResponse = React.useCallback((_b = props.setUpdateResponse) !== null && _b !== void 0 ? _b : (function () { }), [props.setUpdateResponse]);
    var startingAction = React.useCallback((_c = props.startingAction) !== null && _c !== void 0 ? _c : (function () { }), [props.startingAction]);
    var axiosResponseAction = React.useCallback((_d = props.axiosResponseAction) !== null && _d !== void 0 ? _d : (function () { }), [props.axiosResponseAction]);
    var handleServerData = React.useCallback((_e = props.handleServerData) !== null && _e !== void 0 ? _e : (function () { }), [props.handleServerData]);
    var updatedAction = React.useCallback((_f = props.updatedAction) !== null && _f !== void 0 ? _f : (function () { }), [props.updatedAction]);
    var catchAction = React.useCallback((_g = props.catchAction) !== null && _g !== void 0 ? _g : (function () { }), [props.catchAction]);
    var finallyAction = React.useCallback((_h = props.finallyAction) !== null && _h !== void 0 ? _h : (function () { }), [props.finallyAction]);
    var showUserMessage = React.useCallback((_j = props.showUserMessage) !== null && _j !== void 0 ? _j : (function () { }), [props.showUserMessage]);
    var failedAction = React.useCallback((_k = props.failedAction) !== null && _k !== void 0 ? _k : (function () { }), [props.failedAction]);
    var isGet = React.useMemo(function () {
        return !props.noExecution &&
            !!props.item &&
            !!props.verb &&
            props.request !== null &&
            !!setResponse &&
            (props.response === undefined ||
                forceRefreshRef.current !== props.forceRefresh ||
                (!props.noRefreshOnRequestChange && !___default['default'].isEqual(props.request, lastRequest.current)));
    }, [props.noExecution, props.item, props.verb, setResponse, props.response, props.request, props.forceRefresh]);
    var isUpdate = React.useMemo(function () { return !props.noExecution && !!props.updateVerb && !!props.updateRequest && !!setUpdateResponse; }, [props.noExecution, props.updateVerb, props.updateRequest, setUpdateResponse]);
    if (props.verboseConsole && (props.superVerboseConsole || ((isGet || isUpdate) && !inProgress.current)))
        console.log('IWServerData-Local', props.item, props.verb, props.updateVerb, 'isGet', isGet, 'isUpdate', isUpdate, 'inProgress', inProgress.current, 'refresh', props.forceRefresh, forceRefreshRef.current, 'starting', (isGet || isUpdate) && !inProgress.current);
    React.useEffect(function () {
        var _a, _b, _c;
        isMounted.current = true;
        if (!inProgress.current && (isGet || isUpdate)) {
            inProgress.current = true;
            var currentTS = moment__default['default']().valueOf();
            if (lastTS.current > currentTS - 1000) {
                console.log('!WARNING!', props.item, props.verb, 'processed less than a second ago!');
                if (props.response === undefined)
                    console.log('Get re-run due to undefined response');
                if (forceRefreshRef.current !== props.forceRefresh)
                    console.log('Get re-run due to forceRefresh flag');
                if (!props.noRefreshOnRequestChange && !___default['default'].isEqual(props.request, lastRequest.current))
                    console.log('Get re-run due to request change');
                if (isUpdate)
                    console.log('Update re-run');
            }
            if (isGet) {
                lastRequest.current = props.request;
            }
            lastTS.current = currentTS;
            forceRefreshRef.current = props.forceRefresh;
            // cancelTokenSource.current = axios.CancelToken.source()
            setShowInProgressControl(true);
            var authorizationHeader = __assign({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null, localtime: moment__default['default']().format(intelliwaketsfoundation.MOMENT_FORMAT_DATE_TIME), locationhref: window.location.href }, props.authorizationHeader);
            if (!!props.superVerboseConsole)
                console.log('aH', authorizationHeader);
            var headers = {
                Authorization: JSON.stringify(authorizationHeader)
            };
            var config = {
                headers: headers
            };
            // if (!!cancelTokenSource.current) {
            // 	config.cancelToken = cancelTokenSource.current.token
            // }
            !!startingAction && startingAction();
            var verb_1 = isUpdate ? props.updateVerb : props.verb;
            var request = isUpdate ? props.updateRequest : (_a = props.request) !== null && _a !== void 0 ? _a : {};
            // if (!props.noCredentials) axios.defaults.withCredentials = true
            if (!props.noCredentials)
                config.withCredentials = true;
            // if (!props.noCrossDomain) {
            // 	config.baseURL = `${window.location.origin ?? ''}`
            // }
            if (!!props.verboseConsole)
                console.log("API Request for " + ((_b = props.urlPrefix) !== null && _b !== void 0 ? _b : '') + "/" + props.item + "/" + verb_1, request, config);
            axios__default['default']
                .post(((_c = props.urlPrefix) !== null && _c !== void 0 ? _c : '') + "/" + props.item + "/" + verb_1, request, config)
                .then(function (response) {
                var _a, _b, _c, _d;
                if (isMounted.current) {
                    if (!!props.verboseConsole)
                        console.log("API Response for " + ((_a = props.urlPrefix) !== null && _a !== void 0 ? _a : '') + "/" + props.item + "/" + verb_1, response);
                    if (!!props.superVerboseConsole)
                        console.log('headers', response.headers);
                    !!axiosResponseAction && axiosResponseAction(response);
                    if (!!handleServerData && !!response.headers.serverdata) {
                        if (!handleServerData(intelliwaketsfoundation.JSONParse((_b = response.headers.serverdata) !== null && _b !== void 0 ? _b : '{}'))) {
                            if (isUpdate) {
                                !!setUpdateResponse && setUpdateResponse(null);
                            }
                            else {
                                !!setResponse && setResponse(null);
                            }
                            return;
                        }
                    }
                    var serverStatus = intelliwaketsfoundation.JSONParse((_c = response.headers.serverstatus) !== null && _c !== void 0 ? _c : '{}');
                    var resultsData = ((_d = response.data) !== null && _d !== void 0 ? _d : {});
                    if (isMounted.current) {
                        if (!!serverStatus) {
                            if (intelliwaketsfoundation.IsStageDevFocused() && serverStatus.dev_message) {
                                console.log(serverStatus.dev_message);
                            }
                            if (serverStatus.success) {
                                if (isUpdate) {
                                    !!setUpdateResponse && setUpdateResponse(null);
                                    !!props.updateMessage && !!showUserMessage && showUserMessage(props.updateMessage);
                                    !!updatedAction && updatedAction(resultsData);
                                }
                                else {
                                    !!props.responseMessage && !!showUserMessage && showUserMessage(props.responseMessage);
                                    !!setResponse && setResponse(resultsData);
                                }
                                !!serverStatus.message && !!showUserMessage && showUserMessage(serverStatus.message);
                            }
                            else {
                                !!failedAction && failedAction(serverStatus);
                                if (isUpdate) {
                                    !!setUpdateResponse && setUpdateResponse(null);
                                }
                                else {
                                    !!setResponse && setResponse(null);
                                }
                            }
                        }
                        else {
                            if (intelliwaketsfoundation.IsStageDevFocused()) {
                                console.warn(props.item, verb_1, 'API: Response Empty', response);
                            }
                            !!showUserMessage && showUserMessage('Could not connect to server', true);
                            if (isUpdate) {
                                !!setUpdateResponse && setUpdateResponse(null);
                            }
                            else {
                                !!setResponse && setResponse(null);
                            }
                        }
                    }
                }
            })
                .catch(function (error) {
                var _a;
                if (isMounted.current) {
                    if (intelliwaketsfoundation.IsStageDevFocused()) {
                        console.warn("API Error for " + ((_a = props.urlPrefix) !== null && _a !== void 0 ? _a : '') + "/" + props.item + "/" + verb_1, error);
                    }
                    // axios.isCancel(error)
                    !!showUserMessage && showUserMessage('Could not connect to server', true);
                    if (isUpdate) {
                        !!setUpdateResponse && setUpdateResponse(null);
                    }
                    else {
                        !!setResponse && setResponse(null);
                    }
                    !!catchAction && catchAction(error);
                }
            })
                .finally(function () {
                // if (isMounted.current) {
                // cancelTokenSource.current = null
                // }
                !!finallyAction && finallyAction();
                inProgress.current = false;
                if (isMounted.current) {
                    setShowInProgressControl(false);
                }
            });
        }
        return function () {
            isMounted.current = false;
            // if (cancelTokenSource.current) {
            // 	cancelTokenSource.current.cancel()
            // 	cancelTokenSource.current = null
            // }
        };
    }, [
        props.item,
        props.verb,
        props.request,
        props.response,
        props.responseMessage,
        props.forceRefresh,
        props.updateVerb,
        props.updateRequest,
        props.updateMessage,
        setResponse,
        setUpdateResponse,
        startingAction,
        axiosResponseAction,
        handleServerData,
        catchAction,
        updatedAction,
        finallyAction,
        failedAction,
        showUserMessage,
        props.authorizationHeader,
        props.urlPrefix,
        isGet,
        isUpdate,
        props.verboseConsole,
        props.superVerboseConsole,
        props.noCredentials
    ]);
    return props.children === undefined ? null : (React__default['default'].createElement(React__default['default'].Fragment, null,
        props.children,
        showInProgressControl &&
            !props.noActivityOverlay &&
            !props.globalActivityOverlay &&
            props.loadingReactNodes !== null &&
            ((_l = props.loadingReactNodes) !== null && _l !== void 0 ? _l : React__default['default'].createElement(ActivityOverlayControl, { show: true }))));
};

var initialMenuBackItem = {
    menuBackActive: false,
    menuBackButtonTitle: '',
    menuBackButtonURL: '',
    menuPageTitle: '',
    menuDisplaySize: undefined
};
var initialMDContext = {
    breakAt: 'lg',
    mdPath: '',
    baseFullPath: '',
    isOpen: false,
    setMenuBackItemState: function () { }
};
var MDContext = React__default['default'].createContext(initialMDContext);
var MasterDetail = function (props) {
    var _a, _b, _c;
    var mdContextParent_RAW = React.useContext(MDContext);
    var mdContextParent = mdContextParent_RAW.baseFullPath ? mdContextParent_RAW : undefined;
    // const basePath = mdContextParent_RAW.baseFullPath ?
    //     mdContextParent_RAW.baseFullPath + props.mdPath
    //     :
    //     window.location.pathname.substr(0, window.location.pathname.indexOf(props.mdPath)) + props.mdPath;
    var basePath = (_a = GetPathThrough(props.mdPath)) !== null && _a !== void 0 ? _a : window.location.pathname + '/' + props.mdPath;
    var isOpen = window.location.pathname.length > basePath.length && GetPathComponentAfter(basePath) !== '~';
    var mdContext = {
        breakAt: props.breakAt,
        mdPath: props.mdPath,
        baseFullPath: basePath,
        backText: (_b = props.backText) !== null && _b !== void 0 ? _b : 'Back',
        isOpen: isOpen,
        parentMDContext: mdContextParent,
        setMenuBackItemState: props.setMenuBackItemState
    };
    var previousDashboardLastURL = window.sessionStorage.getItem(basePath + '-LastURL');
    if (props.rememberLast &&
        !GetPathComponentAfter(basePath) &&
        previousDashboardLastURL &&
        previousDashboardLastURL !== window.location.pathname) {
        return React__default['default'].createElement(reactRouterDom.Redirect, { to: previousDashboardLastURL });
    }
    else {
        if (props.rememberLast) {
            window.sessionStorage.setItem(basePath + '-LastURL', window.location.pathname);
        }
        return (React__default['default'].createElement(MDContext.Provider, { value: mdContext },
            React__default['default'].createElement("div", { className: ((_c = props.className) !== null && _c !== void 0 ? _c : '') + ' masterDetail masterDetail-' + props.breakAt }, props.children)));
    }
};
var MDMaster = function (props) {
    var mdContext = React.useContext(MDContext);
    var style = {};
    if (props.width) {
        style.width = props.width;
        style.minWidth = props.width;
    }
    return (React__default['default'].createElement("div", { className: (!!props.includePrint ? '' : 'd-print-none ') +
            props.className +
            ' masterDetailMaster' +
            (mdContext.isOpen ? ' isOpen' : ''), style: style }, props.children));
};
var MDLink = function (props) {
    var _a, _b, _c;
    var history = reactRouterDom.useHistory();
    var mdContext = React.useContext(MDContext);
    var selectedRow = React.useRef(null);
    var panelURLAddOn = mdContext.baseFullPath +
        (props.panel ? '/' + props.panel.replace(/\s+/g, '') : '') +
        (props.id ? '/' + props.id : '') +
        (!!props.postPath ? '/' + props.postPath : '');
    var linkActive = (props.panel &&
        (window.location.pathname.startsWith(panelURLAddOn + '/') || window.location.pathname === panelURLAddOn)) ||
        (!props.panel && window.location.pathname === panelURLAddOn);
    var displayProps = Object.assign({}, props);
    var classNames = ['cursor-pointer'];
    if (displayProps.className)
        classNames.push(displayProps.className);
    if (linkActive)
        classNames.push('active');
    if (linkActive && props.activeClassName)
        classNames.push(props.activeClassName);
    displayProps.className = classNames.join(' ');
    delete displayProps.postPath;
    delete displayProps.id;
    var selectItem = function () {
        window.sessionStorage.removeItem(mdContext.baseFullPath + '-LastURL');
        history.push(linkActive ? mdContext.baseFullPath : panelURLAddOn);
    };
    React.useEffect(function () {
        var _a;
        if (!!selectedRow.current) {
            (_a = selectedRow.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'nearest' });
            selectedRow.current = null;
        }
    }, [props.children]);
    switch (props.tag) {
        case 'li':
            return (React__default['default'].createElement("li", __assign({}, displayProps, { onClick: function () {
                    if (!!props.onClick) {
                        if (props.onClick() === true)
                            selectItem();
                    }
                    else {
                        selectItem();
                    }
                }, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
        case 'tr':
            return (React__default['default'].createElement("tr", __assign({}, displayProps, { onClick: (_a = props.onClick) !== null && _a !== void 0 ? _a : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
        case 'div':
            return (React__default['default'].createElement("div", __assign({}, displayProps, { onClick: (_b = props.onClick) !== null && _b !== void 0 ? _b : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
        default:
            return (React__default['default'].createElement("span", __assign({}, displayProps, { onClick: (_c = props.onClick) !== null && _c !== void 0 ? _c : selectItem, onDoubleClick: props.onDoubleClick, style: props.style, title: props.title, ref: !props.noAutoScroll && linkActive ? selectedRow : null }), props.children));
    }
};
var MDDetail = function (props) {
    var _a, _b;
    // const dispatch = useDispatch();
    var mdContext = React.useContext(MDContext);
    var checkPath = mdContext.baseFullPath + '/' + ((_a = props.panel) !== null && _a !== void 0 ? _a : '').replace(/\s+/g, '');
    var activated = (props.panel &&
        !props.hidden &&
        (window.location.pathname.startsWith(checkPath + '/') || window.location.pathname === checkPath)) ||
        (!props.panel && window.location.pathname === mdContext.baseFullPath);
    React.useEffect(function () {
        if (activated) {
            if (props.panel) {
                if (!props.titleText) {
                    console.log('titleText not set on MDDetail!');
                }
                mdContext.setMenuBackItemState(function (prevState) {
                    var _a, _b, _c;
                    var location = window.location.pathname;
                    var newMenuBackItem = {
                        menuBackActive: activated,
                        menuBackButtonTitle: (_b = (_a = props.backText) !== null && _a !== void 0 ? _a : mdContext.backText) !== null && _b !== void 0 ? _b : 'Back',
                        menuBackButtonURL: mdContext.baseFullPath,
                        menuPageTitle: (_c = props.titleText) !== null && _c !== void 0 ? _c : 'Detail',
                        menuDisplaySize: mdContext.breakAt
                    };
                    return __spreadArrays(prevState, [newMenuBackItem]).filter(function (item) {
                        return item.menuBackButtonURL.length < location.length;
                    });
                });
                // AddMenuBackItem(menuBackItem)(dispatch)
            }
        }
        return function () {
            mdContext.setMenuBackItemState(function (prevState) {
                var location = window.location.pathname;
                return __spreadArrays(prevState).filter(function (item) {
                    return item.menuBackButtonURL.length < location.length;
                });
            });
            // CleanMenuBackItem()(dispatch)
        };
    }, [
        /*dispatch, */ activated,
        props.titleText,
        props.panel,
        props.backText,
        mdContext.backText,
        mdContext.baseFullPath,
        mdContext.breakAt
    ]);
    if (activated) {
        return (React__default['default'].createElement("div", { className: ((_b = props.className) !== null && _b !== void 0 ? _b : '') +
                ' masterDetailDetail' +
                (window.location.pathname === mdContext.baseFullPath ? ' hideWhenSmall' : ''), hidden: props.hidden }, props.children));
    }
    else {
        return null;
    }
};

var initialMessageBoxState = {
    message: null
};
/**
 * An alert box that appears when a message is passed as a prop,and dismisses after three seconds.
 */
var MessageBox = function (props) {
    var _a, _b;
    var propsMessageBoxState = (typeof props.messageBoxState === 'string' || props.messageBoxState instanceof String) ? __assign(__assign({}, initialMessageBoxState), { message: props.messageBoxState }) : props.messageBoxState;
    var dismissTimeout = React.useRef(setTimeout(function () { }, 1));
    var messageBoxHTML = intelliwaketsfoundation.TextToHTML((_a = propsMessageBoxState.messageBody) !== null && _a !== void 0 ? _a : "");
    var dismissMessageBox = React.useCallback(props.dismissMessageBox, [props.dismissMessageBox]);
    React.useEffect(function () {
        clearTimeout(dismissTimeout.current);
        if (!!propsMessageBoxState.message && !propsMessageBoxState.noDismiss) {
            dismissTimeout.current = setTimeout(dismissMessageBox, 3000);
        }
    }, [propsMessageBoxState.message, propsMessageBoxState.noDismiss, dismissMessageBox]);
    return (React__default['default'].createElement(reactstrap.Alert, { className: "System_MessageBox", color: (_b = propsMessageBoxState.color) !== null && _b !== void 0 ? _b : 'primary', isOpen: !!propsMessageBoxState.message, toggle: props.dismissMessageBox },
        propsMessageBoxState.message,
        !!propsMessageBoxState.messageBody ?
            React__default['default'].createElement("small", null,
                React__default['default'].createElement("hr", null),
                React__default['default'].createElement("span", { dangerouslySetInnerHTML: { __html: messageBoxHTML } }))
            : null));
};

/**
 * A wrapper for Bootstrap's Modal that handles all the actions.
 *
 * @example
 * const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)
 *
 * setModalPromptProps({
 * 	title: 'Do action?',
 * 	color: 'danger',
 * 	messageBody: 'Are you sure you want to do the action?',
 * 	okLabel: 'Do',
 * 	okAction: () => {doAction()}
 * 	})
 *
 * <ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
 */
var ModalPrompt = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var promptResponsesAsArray = React.useMemo(function () {
        if (props.promptResponses === null || props.promptResponses === undefined)
            return [];
        if (props.promptResponses.constructor === Array) {
            return props.promptResponses;
        }
        else {
            return [props.promptResponses];
        }
    }, [props.promptResponses]);
    var title = React.useMemo(function () {
        if (typeof props.title !== 'string' || !props.variables)
            return props.title;
        return intelliwaketsfoundation.EvaluateString(props.title, props.variables);
    }, [props.title, props.variables]);
    var messageBody = React.useMemo(function () {
        if (typeof props.messageBody !== 'string' || !props.variables)
            return props.messageBody;
        return intelliwaketsfoundation.EvaluateString(props.messageBody, props.variables);
    }, [props.messageBody, props.variables]);
    var isOpen = React.useMemo(function () {
        return ((props.promptResponses !== null && props.promptResponses !== undefined) ||
            (!!props.okLabel && !!props.okAction)) &&
            !props.hidden;
    }, [props.promptResponses, props.okLabel, props.okAction, props.hidden]);
    var dismiss = React.useCallback(function (canceled) {
        if (!!props.dismiss)
            props.dismiss(null, canceled);
        if (canceled && !!props.cancelAction)
            props.cancelAction();
    }, [props.dismiss, props.cancelAction]);
    var okAction = function () {
        !!props.okAction && props.okAction();
        dismiss(false);
    };
    var okKeyPress = function (e) {
        if (!!props.okKeys) {
            if (Array.isArray(props.okKeys)) {
                for (var _i = 0, _a = props.okKeys; _i < _a.length; _i++) {
                    var okKey = _a[_i];
                    if (e.key === okKey) {
                        okAction();
                        break;
                    }
                }
            }
            else {
                if (e.key === KEY_STRING_ENTER) {
                    okAction();
                }
                else if (e.key === props.okKeys) {
                    okAction();
                }
            }
        }
        else if (e.key === KEY_STRING_ENTER) {
            okAction();
        }
    };
    return (React__default['default'].createElement(reactstrap.Modal, { backdrop: true, keyboard: true, isOpen: isOpen, toggle: function () { return dismiss(true); }, autoFocus: false },
        React__default['default'].createElement(reactstrap.ModalHeader, { className: 'alert-' + ((_a = props.color) !== null && _a !== void 0 ? _a : 'primary') }, title),
        !!messageBody && React__default['default'].createElement(reactstrap.ModalBody, null, messageBody),
        React__default['default'].createElement(reactstrap.ModalFooter, null,
            React__default['default'].createElement(reactstrap.Button, { type: "button", onClick: function () { return dismiss(true); }, outline: props.cancelOutline, color: (_b = props.cancelColor) !== null && _b !== void 0 ? _b : (promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction)
                    ? (_c = props.color) !== null && _c !== void 0 ? _c : 'primary' : 'link') }, (_d = props.cancelLabel) !== null && _d !== void 0 ? _d : (promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction) ? 'OK' : 'Cancel')),
            promptResponsesAsArray.map(function (promptResponse, idx) {
                var _a, _b;
                return (React__default['default'].createElement(reactstrap.Button, { key: idx, onClick: function () {
                        promptResponse.action();
                        dismiss(false);
                    }, outline: promptResponse.outline, color: (_b = (_a = promptResponse.color) !== null && _a !== void 0 ? _a : props.color) !== null && _b !== void 0 ? _b : 'primary', className: "ml-1" }, promptResponse.label));
            }),
            !!props.okLabel && !!props.okAction && (React__default['default'].createElement(reactstrap.Button, { onClick: okAction, color: (_f = (_e = props.color) !== null && _e !== void 0 ? _e : props.color) !== null && _f !== void 0 ? _f : 'primary', className: "ml-1", onKeyPress: okKeyPress, autoFocus: true, tabIndex: 0 }, props.okLabel)))));
};

var SelectDD = function (props) {
    var _a;
    var _b, _c, _d, _e, _f;
    var _g = React.useState((_b = props.items.find(function (item) { return props.selectedID === undefined || item.id === props.selectedID; })) !== null && _b !== void 0 ? _b : undefined), selectedItem = _g[0], setSelectedItem = _g[1];
    var handleSelect = function (id) {
        var _a, _b, _c;
        var newItem = (_a = props.items.find(function (item) { return id === undefined || item.id === id; })) !== null && _a !== void 0 ? _a : undefined;
        setSelectedItem(newItem);
        if (!!props.handleSelectItem) {
            props.handleSelectItem(newItem);
        }
        if (!!props.handleSelectData) {
            props.handleSelectData(!newItem ? null : (_b = newItem.data) !== null && _b !== void 0 ? _b : null);
        }
        if (!!props.handleSelectID) {
            props.handleSelectID((_c = (newItem !== null && newItem !== void 0 ? newItem : { id: undefined }).id) !== null && _c !== void 0 ? _c : null);
        }
    };
    React.useEffect(function () {
        var _a;
        setSelectedItem((_a = props.items.find(function (item) { return props.selectedID === undefined || item.id === props.selectedID; })) !== null && _a !== void 0 ? _a : undefined);
    }, [props.selectedID, props.items]);
    return (React__default['default'].createElement(reactstrap.UncontrolledDropdown, { size: props.size, className: ((_c = props.className) !== null && _c !== void 0 ? _c : '') + (!!props.likeSelect ? ' input-dd' : '') + (!!props.inline ? ' d-inline-block' : '') },
        React__default['default'].createElement(reactstrap.DropdownToggle, { color: (_d = props.color) !== null && _d !== void 0 ? _d : (!!props.inline ? 'primary-outline' : 'primary'), caret: !!props.caret, className: (!!props.classNameBtn ? props.classNameBtn : '') + ' ' + (!!props.inline ? ' btn-link-inline' : '') },
            !!(props !== null && props !== void 0 ? props : {}).faIcon ? (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: props.faIcon, className: "mr-1" })) : !!selectedItem && selectedItem.faIcon ? (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: selectedItem.faIcon, className: ClassNames((_a = {
                        'mr-1': true
                    },
                    _a[(_e = 'text-' + selectedItem.faIconColor) !== null && _e !== void 0 ? _e : ''] = !!selectedItem.faIconColor,
                    _a)) })) : null, (_f = (selectedItem !== null && selectedItem !== void 0 ? selectedItem : {}).name) !== null && _f !== void 0 ? _f : 'No Selection'),
        React__default['default'].createElement(reactstrap.DropdownMenu, null, (props !== null && props !== void 0 ? props : {}).items.map(function (item) {
            var _a;
            var _b, _c;
            return (React__default['default'].createElement(reactstrap.DropdownItem, { key: ((_b = item.id) !== null && _b !== void 0 ? _b : -1).toString(), onClick: function () { return handleSelect(item.id); } },
                item.faIcon ? (React__default['default'].createElement(reactFontawesome.FontAwesomeIcon, { icon: item.faIcon, fixedWidth: true, className: ClassNames((_a = {}, _a[(_c = 'text-' + item.faIconColor) !== null && _c !== void 0 ? _c : ''] = !!item.faIconColor, _a)) })) : null,
                item.name));
        }))));
};

var initialTextStatusState = {
    message: null
};
var TextStatus = function (props) {
    var dismissTimeout = React.useRef(setTimeout(function () { }, 1));
    var dismissTextStatus = React.useCallback(props.clearTextStatus, [props.clearTextStatus]);
    var textStatus = React.useMemo(function () {
        if (props.textStatus === null)
            return __assign({}, initialTextStatusState);
        if (typeof props.textStatus === 'string') {
            return __assign(__assign({}, initialTextStatusState), { message: props.textStatus });
        }
        return props.textStatus;
    }, [props.textStatus]);
    React.useEffect(function () {
        clearTimeout(dismissTimeout.current);
        if (!!textStatus.message && !textStatus.noDismiss) {
            dismissTimeout.current = setTimeout(dismissTextStatus, 1500);
        }
    }, [textStatus.message, textStatus.noDismiss, dismissTextStatus]);
    return !!textStatus.message ?
        React__default['default'].createElement("span", { className: (!!textStatus.className ? textStatus.className : '') + (!!textStatus.color ? " text-" + textStatus.color : '') }, textStatus.message)
        : !!props.children ?
            React__default['default'].createElement(React__default['default'].Fragment, null, props.children)
            :
                null;
};

exports.ActivityOverlay = ActivityOverlay;
exports.ActivityOverlayControl = ActivityOverlayControl;
exports.AddActivityOverlay = AddActivityOverlay;
exports.ArrayTable = ArrayTable;
exports.CaptureGPS = CaptureGPS;
exports.ClassNames = ClassNames;
exports.ColumnBodyClassNames = ColumnBodyClassNames;
exports.ColumnClassNames = ColumnClassNames;
exports.ColumnHeadClassNames = ColumnHeadClassNames;
exports.ColumnHeaderClick = ColumnHeaderClick;
exports.ComputeValue = ComputeValue;
exports.CookieCreate = CookieCreate;
exports.CookieErase = CookieErase;
exports.CookieRead = CookieRead;
exports.DDActions = DDActions;
exports.DateRange = DateRange;
exports.DateRangeCalendar = DateRangeCalendar;
exports.DateRangeDateMomentToString = DateRangeDateMomentToString;
exports.DateRangeDateStringToMoment = DateRangeDateStringToMoment;
exports.DateRangeToMoment = DateRangeToMoment;
exports.DateRangeToString = DateRangeToString;
exports.DownloadBase64Data = DownloadBase64Data;
exports.ElementCustomValue = ElementCustomValue;
exports.FilterObjects = FilterObjects;
exports.FormatValue = FormatValue;
exports.GetPathComponentAfter = GetPathComponentAfter;
exports.GetPathThrough = GetPathThrough;
exports.HandleChangeValue = HandleChangeValue;
exports.HasPathComponent = HasPathComponent;
exports.IWServerData = IWServerData;
exports.InputCheckBox = InputCheckBox;
exports.InputColor = InputColor;
exports.InputDate = InputDate;
exports.InputDatePicker = InputDatePicker;
exports.InputEmail = InputEmail;
exports.InputGender = InputGender;
exports.InputNumber = InputNumber;
exports.InputRadio = InputRadio;
exports.InputSSN = InputSSN;
exports.InputSearch = InputSearch;
exports.InputSelect = InputSelect;
exports.InputSelectStep = InputSelectStep;
exports.InputState = InputState;
exports.InputSwitch = InputSwitch;
exports.InputSwitchAlternate = InputSwitchAlternate;
exports.InputTel = InputTel;
exports.InputText = InputText;
exports.InputTextArea = InputTextArea;
exports.InputTime = InputTime;
exports.InputTimeZone = InputTimeZone;
exports.InputUrl = InputUrl;
exports.InputZip = InputZip;
exports.IsColumnEmpty = IsColumnEmpty;
exports.IsDevFocused = IsDevFocused;
exports.IsENV = IsENV;
exports.KEY_BACKSPACE = KEY_BACKSPACE;
exports.KEY_DOWN_ARROW = KEY_DOWN_ARROW;
exports.KEY_ENTER = KEY_ENTER;
exports.KEY_ESCAPE = KEY_ESCAPE;
exports.KEY_LEFT_ARROW = KEY_LEFT_ARROW;
exports.KEY_RIGHT_ARROW = KEY_RIGHT_ARROW;
exports.KEY_SPACE = KEY_SPACE;
exports.KEY_STRING_BACKSPACE = KEY_STRING_BACKSPACE;
exports.KEY_STRING_DOWN_ARROW = KEY_STRING_DOWN_ARROW;
exports.KEY_STRING_ENTER = KEY_STRING_ENTER;
exports.KEY_STRING_ESCAPE = KEY_STRING_ESCAPE;
exports.KEY_STRING_LEFT_ARROW = KEY_STRING_LEFT_ARROW;
exports.KEY_STRING_RIGHT_ARROW = KEY_STRING_RIGHT_ARROW;
exports.KEY_STRING_TAB = KEY_STRING_TAB;
exports.KEY_STRING_UP_ARROW = KEY_STRING_UP_ARROW;
exports.KEY_TAB = KEY_TAB;
exports.KEY_UP_ARROW = KEY_UP_ARROW;
exports.MDDetail = MDDetail;
exports.MDLink = MDLink;
exports.MDMaster = MDMaster;
exports.MasterDetail = MasterDetail;
exports.MessageBox = MessageBox;
exports.ModalPrompt = ModalPrompt;
exports.OptionsActive = OptionsActive;
exports.OptionsActiveAll = OptionsActiveAll;
exports.ReduceInputProps = ReduceInputProps;
exports.RemoveActivityOverlay = RemoveActivityOverlay;
exports.ScreenFormatValue = ScreenFormatValue;
exports.SelectDD = SelectDD;
exports.SetSort = SetSort;
exports.SortObjects = SortObjects;
exports.StructuredArray = StructuredArray;
exports.TextStatus = TextStatus;
exports.ValidColumns = ValidColumns;
exports.WriteBodyTD = WriteBodyTD;
exports.WriteBodyTR = WriteBodyTR;
exports.WriteFootTR = WriteFootTR;
exports.WriteHeadTR = WriteHeadTR;
exports.arrayIDMapsForArrayWithID = arrayIDMapsForArrayWithID;
exports.arrayMapWithMapIDIndex = arrayMapWithMapIDIndex;
exports.customRangeName = customRangeName;
exports.defaultRange = defaultRange;
exports.defaultRangeLast4Weeks = defaultRangeLast4Weeks;
exports.defaultRangeString = defaultRangeString;
exports.defaultRangeStrings = defaultRangeStrings;
exports.defaultRangeStringsReport = defaultRangeStringsReport;
exports.defaultRangeWeek = defaultRangeWeek;
exports.defaultRangeYear = defaultRangeYear;
exports.defaultRanges = defaultRanges;
exports.defaultRangesReport = defaultRangesReport;
exports.initialActivityOverlayState = initialActivityOverlayState;
exports.initialDateRange = initialDateRange;
exports.initialDateRangeString = initialDateRangeString;
exports.initialMenuBackItem = initialMenuBackItem;
exports.initialMessageBoxState = initialMessageBoxState;
exports.initialSortProperties = initialSortProperties;
exports.initialTextStatusState = initialTextStatusState;
