"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFacets = getFacets;
exports.getResults = getResults;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var addEachKeyValueToObject = function addEachKeyValueToObject(acc, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2.default)({}, key, value));
};

function getFacets(docInfo) {
  if (!docInfo.facets) return {};
  return Object.entries(docInfo.facets).map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
        facetName = _ref4[0],
        facetValue = _ref4[1];

    return [facetName, [{
      field: facetName,
      data: Object.entries(facetValue).map(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
            value = _ref6[0],
            count = _ref6[1];

        return {
          value: value,
          count: count
        };
      }),
      // Site Search does not support any other type of facet
      type: "value"
    }]];
  }).reduce(addEachKeyValueToObject, {});
}

function getResults(records, documentType) {
  var isMetaField = function isMetaField(key) {
    return key.startsWith("_");
  };

  var toObjectWithRaw = function toObjectWithRaw(value) {
    return {
      raw: value
    };
  };

  return records[documentType].map(function (record) {
    var highlight = record.highlight,
        sort = record.sort,
        rest = (0, _objectWithoutProperties2.default)(record, ["highlight", "sort"]); //eslint-disable-line

    var result = Object.entries(rest).filter(function (_ref7) {
      var _ref8 = (0, _slicedToArray2.default)(_ref7, 1),
          fieldName = _ref8[0];

      return !isMetaField(fieldName);
    }).map(function (_ref9) {
      var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
          fieldName = _ref10[0],
          fieldValue = _ref10[1];

      return [fieldName, toObjectWithRaw(fieldValue)];
    }).reduce(addEachKeyValueToObject, {});
    Object.entries(highlight).forEach(function (_ref11) {
      var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
          key = _ref12[0],
          value = _ref12[1];

      result[key].snippet = value;
    });
    return result;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZUFkYXB0ZXJzLmpzIl0sIm5hbWVzIjpbImFkZEVhY2hLZXlWYWx1ZVRvT2JqZWN0IiwiYWNjIiwia2V5IiwidmFsdWUiLCJnZXRGYWNldHMiLCJkb2NJbmZvIiwiZmFjZXRzIiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsImZhY2V0TmFtZSIsImZhY2V0VmFsdWUiLCJmaWVsZCIsImRhdGEiLCJjb3VudCIsInR5cGUiLCJyZWR1Y2UiLCJnZXRSZXN1bHRzIiwicmVjb3JkcyIsImRvY3VtZW50VHlwZSIsImlzTWV0YUZpZWxkIiwic3RhcnRzV2l0aCIsInRvT2JqZWN0V2l0aFJhdyIsInJhdyIsInJlY29yZCIsImhpZ2hsaWdodCIsInNvcnQiLCJyZXN0IiwicmVzdWx0IiwiZmlsdGVyIiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImZvckVhY2giLCJzbmlwcGV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ0MsR0FBRDtBQUFBO0FBQUEsTUFBT0MsR0FBUDtBQUFBLE1BQVlDLEtBQVo7O0FBQUEseUNBQzNCRixHQUQyQix5Q0FFN0JDLEdBRjZCLEVBRXZCQyxLQUZ1QjtBQUFBLENBQWhDOztBQUtPLFNBQVNDLFNBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQ2pDLE1BQUksQ0FBQ0EsT0FBTyxDQUFDQyxNQUFiLEVBQXFCLE9BQU8sRUFBUDtBQUVyQixTQUFPQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsT0FBTyxDQUFDQyxNQUF2QixFQUNKRyxHQURJLENBQ0EsaUJBQTZCO0FBQUE7QUFBQSxRQUEzQkMsU0FBMkI7QUFBQSxRQUFoQkMsVUFBZ0I7O0FBQ2hDLFdBQU8sQ0FDTEQsU0FESyxFQUVMLENBQ0U7QUFDRUUsTUFBQUEsS0FBSyxFQUFFRixTQURUO0FBRUVHLE1BQUFBLElBQUksRUFBRU4sTUFBTSxDQUFDQyxPQUFQLENBQWVHLFVBQWYsRUFBMkJGLEdBQTNCLENBQStCO0FBQUE7QUFBQSxZQUFFTixLQUFGO0FBQUEsWUFBU1csS0FBVDs7QUFBQSxlQUFxQjtBQUN4RFgsVUFBQUEsS0FBSyxFQUFMQSxLQUR3RDtBQUV4RFcsVUFBQUEsS0FBSyxFQUFMQTtBQUZ3RCxTQUFyQjtBQUFBLE9BQS9CLENBRlI7QUFNRTtBQUNBQyxNQUFBQSxJQUFJLEVBQUU7QUFQUixLQURGLENBRkssQ0FBUDtBQWNELEdBaEJJLEVBaUJKQyxNQWpCSSxDQWlCR2hCLHVCQWpCSCxFQWlCNEIsRUFqQjVCLENBQVA7QUFrQkQ7O0FBRU0sU0FBU2lCLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNoRCxNQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBbEIsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ21CLFVBQUosQ0FBZSxHQUFmLENBQUo7QUFBQSxHQUF2Qjs7QUFDQSxNQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFuQixLQUFLO0FBQUEsV0FBSztBQUFFb0IsTUFBQUEsR0FBRyxFQUFFcEI7QUFBUCxLQUFMO0FBQUEsR0FBN0I7O0FBRUEsU0FBT2UsT0FBTyxDQUFDQyxZQUFELENBQVAsQ0FBc0JWLEdBQXRCLENBQTBCLFVBQUFlLE1BQU0sRUFBSTtBQUFBLFFBQ2pDQyxTQURpQyxHQUNKRCxNQURJLENBQ2pDQyxTQURpQztBQUFBLFFBQ3RCQyxJQURzQixHQUNKRixNQURJLENBQ3RCRSxJQURzQjtBQUFBLFFBQ2JDLElBRGEsMENBQ0pILE1BREksMEJBQ0k7O0FBRTdDLFFBQU1JLE1BQU0sR0FBR3JCLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlbUIsSUFBZixFQUNaRSxNQURZLENBQ0w7QUFBQTtBQUFBLFVBQUVDLFNBQUY7O0FBQUEsYUFBaUIsQ0FBQ1YsV0FBVyxDQUFDVSxTQUFELENBQTdCO0FBQUEsS0FESyxFQUVackIsR0FGWSxDQUVSO0FBQUE7QUFBQSxVQUFFcUIsU0FBRjtBQUFBLFVBQWFDLFVBQWI7O0FBQUEsYUFBNkIsQ0FDaENELFNBRGdDLEVBRWhDUixlQUFlLENBQUNTLFVBQUQsQ0FGaUIsQ0FBN0I7QUFBQSxLQUZRLEVBTVpmLE1BTlksQ0FNTGhCLHVCQU5LLEVBTW9CLEVBTnBCLENBQWY7QUFRQU8sSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVpQixTQUFmLEVBQTBCTyxPQUExQixDQUFrQyxrQkFBa0I7QUFBQTtBQUFBLFVBQWhCOUIsR0FBZ0I7QUFBQSxVQUFYQyxLQUFXOztBQUNsRHlCLE1BQUFBLE1BQU0sQ0FBQzFCLEdBQUQsQ0FBTixDQUFZK0IsT0FBWixHQUFzQjlCLEtBQXRCO0FBQ0QsS0FGRDtBQUlBLFdBQU95QixNQUFQO0FBQ0QsR0FoQk0sQ0FBUDtBQWlCRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFkZEVhY2hLZXlWYWx1ZVRvT2JqZWN0ID0gKGFjYywgW2tleSwgdmFsdWVdKSA9PiAoe1xuICAuLi5hY2MsXG4gIFtrZXldOiB2YWx1ZVxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGYWNldHMoZG9jSW5mbykge1xuICBpZiAoIWRvY0luZm8uZmFjZXRzKSByZXR1cm4ge307XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGRvY0luZm8uZmFjZXRzKVxuICAgIC5tYXAoKFtmYWNldE5hbWUsIGZhY2V0VmFsdWVdKSA9PiB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBmYWNldE5hbWUsXG4gICAgICAgIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBmaWVsZDogZmFjZXROYW1lLFxuICAgICAgICAgICAgZGF0YTogT2JqZWN0LmVudHJpZXMoZmFjZXRWYWx1ZSkubWFwKChbdmFsdWUsIGNvdW50XSkgPT4gKHtcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIGNvdW50XG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICAvLyBTaXRlIFNlYXJjaCBkb2VzIG5vdCBzdXBwb3J0IGFueSBvdGhlciB0eXBlIG9mIGZhY2V0XG4gICAgICAgICAgICB0eXBlOiBcInZhbHVlXCJcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIF07XG4gICAgfSlcbiAgICAucmVkdWNlKGFkZEVhY2hLZXlWYWx1ZVRvT2JqZWN0LCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXN1bHRzKHJlY29yZHMsIGRvY3VtZW50VHlwZSkge1xuICBjb25zdCBpc01ldGFGaWVsZCA9IGtleSA9PiBrZXkuc3RhcnRzV2l0aChcIl9cIik7XG4gIGNvbnN0IHRvT2JqZWN0V2l0aFJhdyA9IHZhbHVlID0+ICh7IHJhdzogdmFsdWUgfSk7XG5cbiAgcmV0dXJuIHJlY29yZHNbZG9jdW1lbnRUeXBlXS5tYXAocmVjb3JkID0+IHtcbiAgICBjb25zdCB7IGhpZ2hsaWdodCwgc29ydCwgLi4ucmVzdCB9ID0gcmVjb3JkOyAvL2VzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5lbnRyaWVzKHJlc3QpXG4gICAgICAuZmlsdGVyKChbZmllbGROYW1lXSkgPT4gIWlzTWV0YUZpZWxkKGZpZWxkTmFtZSkpXG4gICAgICAubWFwKChbZmllbGROYW1lLCBmaWVsZFZhbHVlXSkgPT4gW1xuICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgIHRvT2JqZWN0V2l0aFJhdyhmaWVsZFZhbHVlKVxuICAgICAgXSlcbiAgICAgIC5yZWR1Y2UoYWRkRWFjaEtleVZhbHVlVG9PYmplY3QsIHt9KTtcblxuICAgIE9iamVjdC5lbnRyaWVzKGhpZ2hsaWdodCkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICByZXN1bHRba2V5XS5zbmlwcGV0ID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn1cbiJdfQ==