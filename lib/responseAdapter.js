"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adaptResponse;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _responseAdapters = require("./responseAdapters");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function adaptResponse(response, documentType) {
  var results = (0, _responseAdapters.getResults)(response.records, documentType);
  var totalPages = response.info[documentType].num_pages;
  var totalResults = response.info[documentType].total_result_count;
  var requestId = "";
  var facets = (0, _responseAdapters.getFacets)(response.info[documentType]);
  return _objectSpread({
    rawResponse: response,
    results: results,
    totalPages: totalPages,
    totalResults: totalResults,
    requestId: requestId
  }, Object.keys(facets).length > 0 && {
    facets: facets
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZUFkYXB0ZXIuanMiXSwibmFtZXMiOlsiYWRhcHRSZXNwb25zZSIsInJlc3BvbnNlIiwiZG9jdW1lbnRUeXBlIiwicmVzdWx0cyIsInJlY29yZHMiLCJ0b3RhbFBhZ2VzIiwiaW5mbyIsIm51bV9wYWdlcyIsInRvdGFsUmVzdWx0cyIsInRvdGFsX3Jlc3VsdF9jb3VudCIsInJlcXVlc3RJZCIsImZhY2V0cyIsInJhd1Jlc3BvbnNlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRWUsU0FBU0EsYUFBVCxDQUF1QkMsUUFBdkIsRUFBaUNDLFlBQWpDLEVBQStDO0FBQzVELE1BQU1DLE9BQU8sR0FBRyxrQ0FBV0YsUUFBUSxDQUFDRyxPQUFwQixFQUE2QkYsWUFBN0IsQ0FBaEI7QUFDQSxNQUFNRyxVQUFVLEdBQUdKLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjSixZQUFkLEVBQTRCSyxTQUEvQztBQUNBLE1BQU1DLFlBQVksR0FBR1AsUUFBUSxDQUFDSyxJQUFULENBQWNKLFlBQWQsRUFBNEJPLGtCQUFqRDtBQUNBLE1BQU1DLFNBQVMsR0FBRyxFQUFsQjtBQUNBLE1BQU1DLE1BQU0sR0FBRyxpQ0FBVVYsUUFBUSxDQUFDSyxJQUFULENBQWNKLFlBQWQsQ0FBVixDQUFmO0FBRUE7QUFDRVUsSUFBQUEsV0FBVyxFQUFFWCxRQURmO0FBRUVFLElBQUFBLE9BQU8sRUFBUEEsT0FGRjtBQUdFRSxJQUFBQSxVQUFVLEVBQVZBLFVBSEY7QUFJRUcsSUFBQUEsWUFBWSxFQUFaQSxZQUpGO0FBS0VFLElBQUFBLFNBQVMsRUFBVEE7QUFMRixLQU1NRyxNQUFNLENBQUNDLElBQVAsQ0FBWUgsTUFBWixFQUFvQkksTUFBcEIsR0FBNkIsQ0FBN0IsSUFBa0M7QUFBRUosSUFBQUEsTUFBTSxFQUFOQTtBQUFGLEdBTnhDO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRGYWNldHMsIGdldFJlc3VsdHMgfSBmcm9tIFwiLi9yZXNwb25zZUFkYXB0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkYXB0UmVzcG9uc2UocmVzcG9uc2UsIGRvY3VtZW50VHlwZSkge1xuICBjb25zdCByZXN1bHRzID0gZ2V0UmVzdWx0cyhyZXNwb25zZS5yZWNvcmRzLCBkb2N1bWVudFR5cGUpO1xuICBjb25zdCB0b3RhbFBhZ2VzID0gcmVzcG9uc2UuaW5mb1tkb2N1bWVudFR5cGVdLm51bV9wYWdlcztcbiAgY29uc3QgdG90YWxSZXN1bHRzID0gcmVzcG9uc2UuaW5mb1tkb2N1bWVudFR5cGVdLnRvdGFsX3Jlc3VsdF9jb3VudDtcbiAgY29uc3QgcmVxdWVzdElkID0gXCJcIjtcbiAgY29uc3QgZmFjZXRzID0gZ2V0RmFjZXRzKHJlc3BvbnNlLmluZm9bZG9jdW1lbnRUeXBlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICByYXdSZXNwb25zZTogcmVzcG9uc2UsXG4gICAgcmVzdWx0cyxcbiAgICB0b3RhbFBhZ2VzLFxuICAgIHRvdGFsUmVzdWx0cyxcbiAgICByZXF1ZXN0SWQsXG4gICAgLi4uKE9iamVjdC5rZXlzKGZhY2V0cykubGVuZ3RoID4gMCAmJiB7IGZhY2V0cyB9KVxuICB9O1xufVxuIl19