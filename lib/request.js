"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _package = require("../package.json");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function request(_x, _x2, _x3, _x4) {
  return _request.apply(this, arguments);
}

function _request() {
  _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(engineKey, method, path, params) {
    var headers, response, json, message;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = new Headers({
              "Content-Type": "application/json",
              "x-swiftype-integration": "search-ui",
              "x-swiftype-integration-version": _package.version
            });
            _context.next = 3;
            return fetch("https://search-api.swiftype.com/api/v1/public/".concat(path), {
              method: method,
              headers: headers,
              body: JSON.stringify(_objectSpread({
                engine_key: engineKey
              }, params)),
              credentials: "include"
            });

          case 3:
            response = _context.sent;
            _context.prev = 4;
            _context.next = 7;
            return response.json();

          case 7:
            json = _context.sent;
            _context.next = 12;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);

          case 12:
            if (!(response.status >= 200 && response.status < 300)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", json);

          case 16:
            message = json && json.error ? json.error : response.status;
            throw new Error(message);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));
  return _request.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJlbmdpbmVLZXkiLCJtZXRob2QiLCJwYXRoIiwicGFyYW1zIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJ2ZXJzaW9uIiwiZmV0Y2giLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVuZ2luZV9rZXkiLCJjcmVkZW50aWFscyIsInJlc3BvbnNlIiwianNvbiIsInN0YXR1cyIsIm1lc3NhZ2UiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O1NBRThCQSxPOzs7OztxRkFBZixpQkFBdUJDLFNBQXZCLEVBQWtDQyxNQUFsQyxFQUEwQ0MsSUFBMUMsRUFBZ0RDLE1BQWhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyxZQUFBQSxPQURPLEdBQ0csSUFBSUMsT0FBSixDQUFZO0FBQzFCLDhCQUFnQixrQkFEVTtBQUUxQix3Q0FBMEIsV0FGQTtBQUcxQixnREFBa0NDO0FBSFIsYUFBWixDQURIO0FBQUE7QUFBQSxtQkFPVUMsS0FBSyx5REFDdUJMLElBRHZCLEdBRTFCO0FBQ0VELGNBQUFBLE1BQU0sRUFBTkEsTUFERjtBQUVFRyxjQUFBQSxPQUFPLEVBQVBBLE9BRkY7QUFHRUksY0FBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUw7QUFDSkMsZ0JBQUFBLFVBQVUsRUFBRVg7QUFEUixpQkFFREcsTUFGQyxFQUhSO0FBT0VTLGNBQUFBLFdBQVcsRUFBRTtBQVBmLGFBRjBCLENBUGY7O0FBQUE7QUFPUEMsWUFBQUEsUUFQTztBQUFBO0FBQUE7QUFBQSxtQkFzQkVBLFFBQVEsQ0FBQ0MsSUFBVCxFQXRCRjs7QUFBQTtBQXNCWEEsWUFBQUEsSUF0Qlc7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLGtCQTJCVEQsUUFBUSxDQUFDRSxNQUFULElBQW1CLEdBQW5CLElBQTBCRixRQUFRLENBQUNFLE1BQVQsR0FBa0IsR0EzQm5DO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQTRCSkQsSUE1Qkk7O0FBQUE7QUE4QkxFLFlBQUFBLE9BOUJLLEdBOEJLRixJQUFJLElBQUlBLElBQUksQ0FBQ0csS0FBYixHQUFxQkgsSUFBSSxDQUFDRyxLQUExQixHQUFrQ0osUUFBUSxDQUFDRSxNQTlCaEQ7QUFBQSxrQkErQkwsSUFBSUcsS0FBSixDQUFVRixPQUFWLENBL0JLOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0KGVuZ2luZUtleSwgbWV0aG9kLCBwYXRoLCBwYXJhbXMpIHtcbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICBcIngtc3dpZnR5cGUtaW50ZWdyYXRpb25cIjogXCJzZWFyY2gtdWlcIixcbiAgICBcIngtc3dpZnR5cGUtaW50ZWdyYXRpb24tdmVyc2lvblwiOiB2ZXJzaW9uXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vc2VhcmNoLWFwaS5zd2lmdHlwZS5jb20vYXBpL3YxL3B1YmxpYy8ke3BhdGh9YCxcbiAgICB7XG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBlbmdpbmVfa2V5OiBlbmdpbmVLZXksXG4gICAgICAgIC4uLnBhcmFtc1xuICAgICAgfSksXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCJcbiAgICB9XG4gICk7XG5cbiAgbGV0IGpzb247XG4gIHRyeSB7XG4gICAganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBOb3RoaW5nIHRvIGRvIGhlcmUsIGNlcnRhaW4gcmVzcG9uc2VzIHdvbid0IGhhdmUganNvblxuICB9XG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGpzb24gJiYganNvbi5lcnJvciA/IGpzb24uZXJyb3IgOiByZXNwb25zZS5zdGF0dXM7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=