"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptFacetConfig = adaptFacetConfig;
exports.adaptFilterConfig = adaptFilterConfig;
exports.adaptResultFieldsConfig = adaptResultFieldsConfig;
exports.adaptSearchFieldsConfig = adaptSearchFieldsConfig;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function adaptFilterType(type) {
  if (type === "any") return {};
  if (type === "all") return {
    type: "and"
  };
  return {
    type: "and"
  };
}

function adaptFacetConfig(facets) {
  if (!facets) return;

  var convertInvalidFacetsToUndefined = function convertInvalidFacetsToUndefined(_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        fieldName = _ref2[0],
        config = _ref2[1];

    if (config.type != "value") {
      console.warn("search-ui-site-search-connector: Dropping ".concat(fieldName, " facet, only value facets are supported in Site Search"));
      return;
    }

    if (config.sort) {
      console.warn("search-ui-site-search-connector: Site Search does not support 'sort' on facets");
    }

    if (config.size) {
      console.warn("search-ui-site-search-connector: Site Search does not support 'size' on facets");
    }

    return [fieldName, config];
  };

  var getKey = function getKey(_ref3) {
    var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
        key = _ref4[0];

    return key;
  };

  var config = Object.entries(facets).map(convertInvalidFacetsToUndefined).filter(function (v) {
    return v;
  }).map(getKey);
  if (!config.length) return;
  return config;
}

function adaptFilterConfig(filters) {
  if (!filters || Object.keys(filters).length === 0) return;
  return filters.reduce(function (acc, filter) {
    var fieldName = filter.field;
    var fieldValue = filter.values;

    if (acc[fieldName]) {
      console.warn("search-ui-site-search-connector: More than one filter found for a single field");
      return acc;
    }

    if (filter.type && filter.type !== "all" && filter.type !== "any") {
      console.warn("search-ui-site-search-connector: Unsupported filter type \"".concat(filter.type, "\" found, only \"all\" and \"any\" are currently supported"));
      return acc;
    }

    if (fieldValue.find(function (v) {
      return (0, _typeof2.default)(v) === "object";
    }) !== undefined) {
      if (fieldValue.length > 1) {
        console.warn("search-ui-site-search-connector: Cannot apply more than 1 none-value filters to a single field");
        return acc;
      }

      var firstValue = fieldValue[0];

      if (firstValue.from || firstValue.from === 0 || firstValue.to || firstValue.to === 0) {
        // eslint-disable-next-line
        var name = firstValue.name,
            rest = (0, _objectWithoutProperties2.default)(firstValue, ["name"]);
        acc[fieldName] = _objectSpread({
          type: "range"
        }, rest);
        return acc;
      } else {
        return acc;
      }
    }

    acc[fieldName] = _objectSpread(_objectSpread({}, adaptFilterType(filter.type)), {}, {
      values: fieldValue
    });
    return acc;
  }, {});
}

function adaptResultFieldsConfig(resultFieldsConfig) {
  if (!resultFieldsConfig) return [];
  var fetchFields = Object.keys(resultFieldsConfig);
  var highlightFields = Object.entries(resultFieldsConfig).reduce(function (acc, _ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        fieldName = _ref6[0],
        fieldConfig = _ref6[1];

    if (!fieldConfig.snippet) return acc;
    return _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2.default)({}, fieldName, fieldConfig.snippet));
  }, {});
  return [fetchFields, highlightFields];
}

function adaptSearchFieldsConfig(searchFieldsConfig) {
  if (!searchFieldsConfig) return [];
  return Object.keys(searchFieldsConfig);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0QWRhcHRlcnMuanMiXSwibmFtZXMiOlsiYWRhcHRGaWx0ZXJUeXBlIiwidHlwZSIsImFkYXB0RmFjZXRDb25maWciLCJmYWNldHMiLCJjb252ZXJ0SW52YWxpZEZhY2V0c1RvVW5kZWZpbmVkIiwiZmllbGROYW1lIiwiY29uZmlnIiwiY29uc29sZSIsIndhcm4iLCJzb3J0Iiwic2l6ZSIsImdldEtleSIsImtleSIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJmaWx0ZXIiLCJ2IiwibGVuZ3RoIiwiYWRhcHRGaWx0ZXJDb25maWciLCJmaWx0ZXJzIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImZpZWxkIiwiZmllbGRWYWx1ZSIsInZhbHVlcyIsImZpbmQiLCJ1bmRlZmluZWQiLCJmaXJzdFZhbHVlIiwiZnJvbSIsInRvIiwibmFtZSIsInJlc3QiLCJhZGFwdFJlc3VsdEZpZWxkc0NvbmZpZyIsInJlc3VsdEZpZWxkc0NvbmZpZyIsImZldGNoRmllbGRzIiwiaGlnaGxpZ2h0RmllbGRzIiwiZmllbGRDb25maWciLCJzbmlwcGV0IiwiYWRhcHRTZWFyY2hGaWVsZHNDb25maWciLCJzZWFyY2hGaWVsZHNDb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCO0FBQzdCLE1BQUlBLElBQUksS0FBSyxLQUFiLEVBQW9CLE9BQU8sRUFBUDtBQUNwQixNQUFJQSxJQUFJLEtBQUssS0FBYixFQUFvQixPQUFPO0FBQUVBLElBQUFBLElBQUksRUFBRTtBQUFSLEdBQVA7QUFDcEIsU0FBTztBQUFFQSxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQUFQO0FBQ0Q7O0FBRU0sU0FBU0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQ3ZDLE1BQUksQ0FBQ0EsTUFBTCxFQUFhOztBQUViLE1BQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBa0MsT0FBeUI7QUFBQTtB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bUNBQ0tMLGVBQWUsQ0FBQ2dCLE1BQU0sQ0FBQ2YsSUFBUixDQURwQjtBQUVFeUIsTUFBQUEsTUFBTSxFQUFFRDtBQUZWO0FBS0EsV0FBT0YsR0FBUDtBQUNELEdBbkRNLEVBbURKLEVBbkRJLENBQVA7QUFvREQ7O0FBRU0sU0FBU1csdUJBQVQsQ0FBaUNDLGtCQUFqQyxFQUFxRDtBQUMxRCxNQUFJLENBQUNBLGtCQUFMLEVBQXlCLE9BQU8sRUFBUDtBQUV6QixNQUFNQyxXQUFXLEdBQUd2QixNQUFNLENBQUNRLElBQVAsQ0FBWWMsa0JBQVosQ0FBcEI7QUFFQSxNQUFNRSxlQUFlLEdBQUd4QixNQUFNLENBQUNDLE9BQVAsQ0FBZXFCLGtCQUFmLEVBQW1DYixNQUFuQyxDQUN0QixVQUFDQyxHQUFELFNBQW1DO0FBQUE7QUFBQSxRQUE1QmxCLFNBQTRCO0FBQUEsUUFBakJpQyxXQUFpQjs7QUFDakMsUUFBSSxDQUFDQSxXQUFXLENBQUNDLE9BQWpCLEVBQTBCLE9BQU9oQixHQUFQO0FBQzFCLDJDQUNLQSxHQURMLHlDQUVHbEIsU0FGSCxFQUVlaUMsV0FBVyxDQUFDQyxPQUYzQjtBQUlELEdBUHFCLEVBUXRCLEVBUnNCLENBQXhCO0FBV0EsU0FBTyxDQUFDSCxXQUFELEVBQWNDLGVBQWQsQ0FBUDtBQUNEOztBQUVNLFNBQVNHLHVCQUFULENBQWlDQyxrQkFBakMsRUFBcUQ7QUFDMUQsTUFBSSxDQUFDQSxrQkFBTCxFQUF5QixPQUFPLEVBQVA7QUFFekIsU0FBTzVCLE1BQU0sQ0FBQ1EsSUFBUCxDQUFZb0Isa0JBQVosQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWRhcHRGaWx0ZXJUeXBlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09IFwiYW55XCIpIHJldHVybiB7fTtcbiAgaWYgKHR5cGUgPT09IFwiYWxsXCIpIHJldHVybiB7IHR5cGU6IFwiYW5kXCIgfTtcbiAgcmV0dXJuIHsgdHlwZTogXCJhbmRcIiB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRhcHRGYWNldENvbmZpZyhmYWNldHMpIHtcbiAgaWYgKCFmYWNldHMpIHJldHVybjtcblxuICBjb25zdCBjb252ZXJ0SW52YWxpZEZhY2V0c1RvVW5kZWZpbmVkID0gKFtmaWVsZE5hbWUsIGNvbmZpZ10pID0+IHtcbiAgICBpZiAoY29uZmlnLnR5cGUgIT0gXCJ2YWx1ZVwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBEcm9wcGluZyAke2ZpZWxkTmFtZX0gZmFjZXQsIG9ubHkgdmFsdWUgZmFjZXRzIGFyZSBzdXBwb3J0ZWQgaW4gU2l0ZSBTZWFyY2hgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnNvcnQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBTaXRlIFNlYXJjaCBkb2VzIG5vdCBzdXBwb3J0ICdzb3J0JyBvbiBmYWNldHNcIlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5zaXplKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwic2VhcmNoLXVpLXNpdGUtc2VhcmNoLWNvbm5lY3RvcjogU2l0ZSBTZWFyY2ggZG9lcyBub3Qgc3VwcG9ydCAnc2l6ZScgb24gZmFjZXRzXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBbZmllbGROYW1lLCBjb25maWddO1xuICB9O1xuXG4gIGNvbnN0IGdldEtleSA9IChba2V5XSkgPT4ga2V5O1xuXG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5lbnRyaWVzKGZhY2V0cylcbiAgICAubWFwKGNvbnZlcnRJbnZhbGlkRmFjZXRzVG9VbmRlZmluZWQpXG4gICAgLmZpbHRlcih2ID0+IHYpXG4gICAgLm1hcChnZXRLZXkpO1xuXG4gIGlmICghY29uZmlnLmxlbmd0aCkgcmV0dXJuO1xuICByZXR1cm4gY29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRhcHRGaWx0ZXJDb25maWcoZmlsdGVycykge1xuICBpZiAoIWZpbHRlcnMgfHwgT2JqZWN0LmtleXMoZmlsdGVycykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgcmV0dXJuIGZpbHRlcnMucmVkdWNlKChhY2MsIGZpbHRlcikgPT4ge1xuICAgIGNvbnN0IGZpZWxkTmFtZSA9IGZpbHRlci5maWVsZDtcbiAgICBsZXQgZmllbGRWYWx1ZSA9IGZpbHRlci52YWx1ZXM7XG5cbiAgICBpZiAoYWNjW2ZpZWxkTmFtZV0pIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBNb3JlIHRoYW4gb25lIGZpbHRlciBmb3VuZCBmb3IgYSBzaW5nbGUgZmllbGRcIlxuICAgICAgKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgaWYgKGZpbHRlci50eXBlICYmIChmaWx0ZXIudHlwZSAhPT0gXCJhbGxcIiAmJiBmaWx0ZXIudHlwZSAhPT0gXCJhbnlcIikpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYHNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IFVuc3VwcG9ydGVkIGZpbHRlciB0eXBlIFwiJHtmaWx0ZXIudHlwZX1cIiBmb3VuZCwgb25seSBcImFsbFwiIGFuZCBcImFueVwiIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkVmFsdWUuZmluZCh2ID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZmllbGRWYWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IENhbm5vdCBhcHBseSBtb3JlIHRoYW4gMSBub25lLXZhbHVlIGZpbHRlcnMgdG8gYSBzaW5nbGUgZmllbGRcIlxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaXJzdFZhbHVlID0gZmllbGRWYWx1ZVswXTtcbiAgICAgIGlmIChcbiAgICAgICAgZmlyc3RWYWx1ZS5mcm9tIHx8XG4gICAgICAgIGZpcnN0VmFsdWUuZnJvbSA9PT0gMCB8fFxuICAgICAgICBmaXJzdFZhbHVlLnRvIHx8XG4gICAgICAgIGZpcnN0VmFsdWUudG8gPT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc3QgeyBuYW1lLCAuLi5yZXN0IH0gPSBmaXJzdFZhbHVlO1xuICAgICAgICBhY2NbZmllbGROYW1lXSA9IHtcbiAgICAgICAgICB0eXBlOiBcInJhbmdlXCIsXG4gICAgICAgICAgLi4ucmVzdFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhY2NbZmllbGROYW1lXSA9IHtcbiAgICAgIC4uLmFkYXB0RmlsdGVyVHlwZShmaWx0ZXIudHlwZSksXG4gICAgICB2YWx1ZXM6IGZpZWxkVmFsdWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRhcHRSZXN1bHRGaWVsZHNDb25maWcocmVzdWx0RmllbGRzQ29uZmlnKSB7XG4gIGlmICghcmVzdWx0RmllbGRzQ29uZmlnKSByZXR1cm4gW107XG5cbiAgY29uc3QgZmV0Y2hGaWVsZHMgPSBPYmplY3Qua2V5cyhyZXN1bHRGaWVsZHNDb25maWcpO1xuXG4gIGNvbnN0IGhpZ2hsaWdodEZpZWxkcyA9IE9iamVjdC5lbnRyaWVzKHJlc3VsdEZpZWxkc0NvbmZpZykucmVkdWNlKFxuICAgIChhY2MsIFtmaWVsZE5hbWUsIGZpZWxkQ29uZmlnXSkgPT4ge1xuICAgICAgaWYgKCFmaWVsZENvbmZpZy5zbmlwcGV0KSByZXR1cm4gYWNjO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYWNjLFxuICAgICAgICBbZmllbGROYW1lXTogZmllbGRDb25maWcuc25pcHBldFxuICAgICAgfTtcbiAgICB9LFxuICAgIHt9XG4gICk7XG5cbiAgcmV0dXJuIFtmZXRjaEZpZWxkcywgaGlnaGxpZ2h0RmllbGRzXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkYXB0U2VhcmNoRmllbGRzQ29uZmlnKHNlYXJjaEZpZWxkc0NvbmZpZykge1xuICBpZiAoIXNlYXJjaEZpZWxkc0NvbmZpZykgcmV0dXJuIFtdO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhzZWFyY2hGaWVsZHNDb25maWcpO1xufVxuIl19