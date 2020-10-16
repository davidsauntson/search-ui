import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var addEachKeyValueToObject = function addEachKeyValueToObject(acc, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, value));
};

export function getFacets(docInfo) {
  if (!docInfo.facets) return {};
  return Object.entries(docInfo.facets).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        facetName = _ref4[0],
        facetValue = _ref4[1];

    return [facetName, [{
      field: facetName,
      data: Object.entries(facetValue).map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
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
export function getResults(records, documentType) {
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
        rest = _objectWithoutProperties(record, ["highlight", "sort"]); //eslint-disable-line


    var result = Object.entries(rest).filter(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
          fieldName = _ref8[0];

      return !isMetaField(fieldName);
    }).map(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          fieldName = _ref10[0],
          fieldValue = _ref10[1];

      return [fieldName, toObjectWithRaw(fieldValue)];
    }).reduce(addEachKeyValueToObject, {});
    Object.entries(highlight).forEach(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          key = _ref12[0],
          value = _ref12[1];

      result[key].snippet = value;
    });
    return result;
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZUFkYXB0ZXJzLmpzIl0sIm5hbWVzIjpbImFkZEVhY2hLZXlWYWx1ZVRvT2JqZWN0IiwiYWNjIiwia2V5IiwidmFsdWUiLCJnZXRGYWNldHMiLCJkb2NJbmZvIiwiZmFjZXRzIiwiT2JqZWN0IiwiZW50cmllcyIsIm1hcCIsImZhY2V0TmFtZSIsImZhY2V0VmFsdWUiLCJmaWVsZCIsImRhdGEiLCJjb3VudCIsInR5cGUiLCJyZWR1Y2UiLCJnZXRSZXN1bHRzIiwicmVjb3JkcyIsImRvY3VtZW50VHlwZSIsImlzTWV0YUZpZWxkIiwic3RhcnRzV2l0aCIsInRvT2JqZWN0V2l0aFJhdyIsInJhdyIsInJlY29yZCIsImhpZ2hsaWdodCIsInNvcnQiLCJyZXN0IiwicmVzdWx0IiwiZmlsdGVyIiwiZmllbGROYW1lIiwiZmllbGRWYWx1ZSIsImZvckVhY2giLCJzbmlwcGV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ0MsR0FBRDtBQUFBO0FBQUEsTUFBT0MsR0FBUDtBQUFBLE1BQVlDLEtBQVo7O0FBQUEseUNBQzNCRixHQUQyQiwyQkFFN0JDLEdBRjZCLEVBRXZCQyxLQUZ1QjtBQUFBLENBQWhDOztBQUtBLE9BQU8sU0FBU0MsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDakMsTUFBSSxDQUFDQSxPQUFPLENBQUNDLE1BQWIsRUFBcUIsT0FBTyxFQUFQO0FBRXJCLFNBQU9DLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSCxPQUFPLENBQUNDLE1BQXZCLEVBQ0pHLEdBREksQ0FDQSxpQkFBNkI7QUFBQTtBQUFBLFFBQTNCQyxTQUEyQjtBQUFBLFFBQWhCQyxVQUFnQjs7QUFDaEMsV0FBTyxDQUNMRCxTQURLLEVBRUwsQ0FDRTtBQUNFRSxNQUFBQSxLQUFLLEVBQUVGLFNBRFQ7QUFFRUcsTUFBQUEsSUFBSSxFQUFFTixNQUFNLENBQUNDLE9BQVAsQ0FBZUcsVUFBZixFQUEyQkYsR0FBM0IsQ0FBK0I7QUFBQTtBQUFBLFlBQUVOLEtBQUY7QUFBQSxZQUFTVyxLQUFUOztBQUFBLGVBQXFCO0FBQ3hEWCxVQUFBQSxLQUFLLEVBQUxBLEtBRHdEO0FBRXhEVyxVQUFBQSxLQUFLLEVBQUxBO0FBRndELFNBQXJCO0FBQUEsT0FBL0IsQ0FGUjtBQU1FO0FBQ0FDLE1BQUFBLElBQUksRUFBRTtBQVBSLEtBREYsQ0FGSyxDQUFQO0FBY0QsR0FoQkksRUFpQkpDLE1BakJJLENBaUJHaEIsdUJBakJILEVBaUI0QixFQWpCNUIsQ0FBUDtBQWtCRDtBQUVELE9BQU8sU0FBU2lCLFVBQVQsQ0FBb0JDLE9BQXBCLEVBQTZCQyxZQUE3QixFQUEyQztBQUNoRCxNQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBbEIsR0FBRztBQUFBLFdBQUlBLEdBQUcsQ0FBQ21CLFVBQUosQ0FBZSxHQUFmLENBQUo7QUFBQSxHQUF2Qjs7QUFDQSxNQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFuQixLQUFLO0FBQUEsV0FBSztBQUFFb0IsTUFBQUEsR0FBRyxFQUFFcEI7QUFBUCxLQUFMO0FBQUEsR0FBN0I7O0FBRUEsU0FBT2UsT0FBTyxDQUFDQyxZQUFELENBQVAsQ0FBc0JWLEdBQXRCLENBQTBCLFVBQUFlLE1BQU0sRUFBSTtBQUFBLFFBQ2pDQyxTQURpQyxHQUNKRCxNQURJLENBQ2pDQyxTQURpQztBQUFBLFFBQ3RCQyxJQURzQixHQUNKRixNQURJLENBQ3RCRSxJQURzQjtBQUFBLFFBQ2JDLElBRGEsNEJBQ0pILE1BREksMEJBQ0k7OztBQUU3QyxRQUFNSSxNQUFNLEdBQUdyQixNQUFNLENBQUNDLE9BQVAsQ0FBZW1CLElBQWYsRUFDWkUsTUFEWSxDQUNMO0FBQUE7QUFBQSxVQUFFQyxTQUFGOztBQUFBLGFBQWlCLENBQUNWLFdBQVcsQ0FBQ1UsU0FBRCxDQUE3QjtBQUFBLEtBREssRUFFWnJCLEdBRlksQ0FFUjtBQUFBO0FBQUEsVUFBRXFCLFNBQUY7QUFBQSxVQUFhQyxVQUFiOztBQUFBLGFBQTZCLENBQ2hDRCxTQURnQyxFQUVoQ1IsZUFBZSxDQUFDUyxVQUFELENBRmlCLENBQTdCO0FBQUEsS0FGUSxFQU1aZixNQU5ZLENBTUxoQix1QkFOSyxFQU1vQixFQU5wQixDQUFmO0FBUUFPLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlaUIsU0FBZixFQUEwQk8sT0FBMUIsQ0FBa0Msa0JBQWtCO0FBQUE7QUFBQSxVQUFoQjlCLEdBQWdCO0FBQUEsVUFBWEMsS0FBVzs7QUFDbER5QixNQUFBQSxNQUFNLENBQUMxQixHQUFELENBQU4sQ0FBWStCLE9BQVosR0FBc0I5QixLQUF0QjtBQUNELEtBRkQ7QUFJQSxXQUFPeUIsTUFBUDtBQUNELEdBaEJNLENBQVA7QUFpQkQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhZGRFYWNoS2V5VmFsdWVUb09iamVjdCA9IChhY2MsIFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgLi4uYWNjLFxuICBba2V5XTogdmFsdWVcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFjZXRzKGRvY0luZm8pIHtcbiAgaWYgKCFkb2NJbmZvLmZhY2V0cykgcmV0dXJuIHt9O1xuXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhkb2NJbmZvLmZhY2V0cylcbiAgICAubWFwKChbZmFjZXROYW1lLCBmYWNldFZhbHVlXSkgPT4ge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgZmFjZXROYW1lLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmllbGQ6IGZhY2V0TmFtZSxcbiAgICAgICAgICAgIGRhdGE6IE9iamVjdC5lbnRyaWVzKGZhY2V0VmFsdWUpLm1hcCgoW3ZhbHVlLCBjb3VudF0pID0+ICh7XG4gICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICBjb3VudFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgLy8gU2l0ZSBTZWFyY2ggZG9lcyBub3Qgc3VwcG9ydCBhbnkgb3RoZXIgdHlwZSBvZiBmYWNldFxuICAgICAgICAgICAgdHlwZTogXCJ2YWx1ZVwiXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICBdO1xuICAgIH0pXG4gICAgLnJlZHVjZShhZGRFYWNoS2V5VmFsdWVUb09iamVjdCwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzdWx0cyhyZWNvcmRzLCBkb2N1bWVudFR5cGUpIHtcbiAgY29uc3QgaXNNZXRhRmllbGQgPSBrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoXCJfXCIpO1xuICBjb25zdCB0b09iamVjdFdpdGhSYXcgPSB2YWx1ZSA9PiAoeyByYXc6IHZhbHVlIH0pO1xuXG4gIHJldHVybiByZWNvcmRzW2RvY3VtZW50VHlwZV0ubWFwKHJlY29yZCA9PiB7XG4gICAgY29uc3QgeyBoaWdobGlnaHQsIHNvcnQsIC4uLnJlc3QgfSA9IHJlY29yZDsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZW50cmllcyhyZXN0KVxuICAgICAgLmZpbHRlcigoW2ZpZWxkTmFtZV0pID0+ICFpc01ldGFGaWVsZChmaWVsZE5hbWUpKVxuICAgICAgLm1hcCgoW2ZpZWxkTmFtZSwgZmllbGRWYWx1ZV0pID0+IFtcbiAgICAgICAgZmllbGROYW1lLFxuICAgICAgICB0b09iamVjdFdpdGhSYXcoZmllbGRWYWx1ZSlcbiAgICAgIF0pXG4gICAgICAucmVkdWNlKGFkZEVhY2hLZXlWYWx1ZVRvT2JqZWN0LCB7fSk7XG5cbiAgICBPYmplY3QuZW50cmllcyhoaWdobGlnaHQpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0uc25pcHBldCA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59XG4iXX0=