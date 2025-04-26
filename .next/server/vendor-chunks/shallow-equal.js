"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/shallow-equal";
exports.ids = ["vendor-chunks/shallow-equal"];
exports.modules = {

/***/ "(ssr)/./node_modules/shallow-equal/arrays/index.js":
/*!****************************************************!*\
  !*** ./node_modules/shallow-equal/arrays/index.js ***!
  \****************************************************/
/***/ ((module) => {

eval("\n\nfunction shallowEqualArrays(arrA, arrB) {\n  if (arrA === arrB) {\n    return true;\n  }\n\n  if (!arrA || !arrB) {\n    return false;\n  }\n\n  var len = arrA.length;\n\n  if (arrB.length !== len) {\n    return false;\n  }\n\n  for (var i = 0; i < len; i++) {\n    if (arrA[i] !== arrB[i]) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nmodule.exports = shallowEqualArrays;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2hhbGxvdy1lcXVhbC9hcnJheXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyIvVXNlcnMvbmlsbC9EZXNrdG9wL2luZHJhbmlsL3N0cnV0bGUvbm9kZV9tb2R1bGVzL3NoYWxsb3ctZXF1YWwvYXJyYXlzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsQXJyYXlzKGFyckEsIGFyckIpIHtcbiAgaWYgKGFyckEgPT09IGFyckIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICghYXJyQSB8fCAhYXJyQikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBsZW4gPSBhcnJBLmxlbmd0aDtcblxuICBpZiAoYXJyQi5sZW5ndGggIT09IGxlbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyQVtpXSAhPT0gYXJyQltpXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYWxsb3dFcXVhbEFycmF5cztcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/shallow-equal/arrays/index.js\n");

/***/ })

};
;