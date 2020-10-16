import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/typeof";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function adaptFilterType(type) {
  if (type === "any") return {};
  if (type === "all") return {
    type: "and"
  };
  return {
    type: "and"
  };
}

export function adaptFacetConfig(facets) {
  if (!facets) return;

  var convertInvalidFacetsToUndefined = function convertInvalidFacetsToUndefined(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
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
    var _ref4 = _slicedToArray(_ref3, 1),
        key = _ref4[0];

    return key;
  };

  var config = Object.entries(facets).map(convertInvalidFacetsToUndefined).filter(function (v) {
    return v;
  }).map(getKey);
  if (!config.length) return;
  return config;
}
export function adaptFilterConfig(filters) {
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
      return _typeof(v) === "object";
    }) !== undefined) {
      if (fieldValue.length > 1) {
        console.warn("search-ui-site-search-connector: Cannot apply more than 1 none-value filters to a single field");
        return acc;
      }

      var firstValue = fieldValue[0];

      if (firstValue.from || firstValue.from === 0 || firstValue.to || firstValue.to === 0) {
        // eslint-disable-next-line
        var name = firstValue.name,
            rest = _objectWithoutProperties(firstValue, ["name"]);

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
export function adaptResultFieldsConfig(resultFieldsConfig) {
  if (!resultFieldsConfig) return [];
  var fetchFields = Object.keys(resultFieldsConfig);
  var highlightFields = Object.entries(resultFieldsConfig).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        fieldName = _ref6[0],
        fieldConfig = _ref6[1];

    if (!fieldConfig.snippet) return acc;
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, fieldName, fieldConfig.snippet));
  }, {});
  return [fetchFields, highlightFields];
}
export function adaptSearchFieldsConfig(searchFieldsConfig) {
  if (!searchFieldsConfig) return [];
  return Object.keys(searchFieldsConfig);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXF1ZXN0QWRhcHRlcnMuanMiXSwibmFtZXMiOlsiYWRhcHRGaWx0ZXJUeXBlIiwidHlwZSIsImFkYXB0RmFjZXRDb25maWciLCJmYWNldHMiLCJjb252ZXJ0SW52YWxpZEZhY2V0c1RvVW5kZWZpbmVkIiwiZmllbGROYW1lIiwiY29uZmlnIiwiY29uc29sZSIsIndhcm4iLCJzb3J0Iiwic2l6ZSIsImdldEtleSIsImtleSIsIk9iamVjdCIsImVudHJpZXMiLCJtYXAiLCJmaWx0ZXIiLCJ2IiwibGVuZ3RoIiwiYWRhcHRGaWx0ZXJDb25maWciLCJmaWx0ZXJzIiwia2V5cyIsInJlZHVjZSIsImFjYyIsImZpZWxkIiwiZmllbGRWYWx1ZSIsInZhbHVlcyIsImZpbmQiLCJ1bmRlZmluZWQiLCJmaXJzdFZhbHVlIiwiZnJvbSIsInRvIiwibmFtZSIsInJlc3QiLCJhZGFwdFJlc3VsdEZpZWxkc0NvbmZpZyIsInJlc3VsdEZpZWxkc0NvbmZpZyIsImZldGNoRmllbGRzIiwiaGlnaGxpZ2h0RmllbGRzIiwiZmllbGRDb25maWciLCJzbmlwcGV0IiwiYWRhcHRTZWFyY2hGaWVsZHNDb25maWciLCJzZWFyY2hGaWVsZHNDb25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFNBQVNBLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCO0FBQzdCLE1BQUlBLElBQUksS0FBSyxLQUFiLEVBQW9CLE9BQU8sRUFBUDtBQUNwQixNQUFJQSxJQUFJLEtBQUssS0FBYixFQUFvQixPQUFPO0FBQUVBLElBQUFBLElBQUksRUFBRTtBQUFSLEdBQVA7QUFDcEIsU0FBTztBQUFFQSxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQUFQO0FBQ0Q7O0FBRUQsT0FBTyxTQUFTQyxnQkFBVCxDQUEwQkMsTUFBMUIsRUFBa0M7QUFDdkMsTUFBSSxDQUFDQSxNQUFMLEVBQWE7O0FBRWIsTUFBTUMsK0JBQStCLEdBQUcsU0FBbENBLCtCQUFrQyxPQUF5QjtBQUFBO0FBQUEsUUFBdkJD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LGVBQWUsQ0FBQ2dCLE1BQU0sQ0FBQ2YsSUFBUixDQURwQjtBQUVFeUIsTUFBQUEsTUFBTSxFQUFFRDtBQUZWO0FBS0EsV0FBT0YsR0FBUDtBQUNELEdBbkRNLEVBbURKLEVBbkRJLENBQVA7QUFvREQ7QUFFRCxPQUFPLFNBQVNXLHVCQUFULENBQWlDQyxrQkFBakMsRUFBcUQ7QUFDMUQsTUFBSSxDQUFDQSxrQkFBTCxFQUF5QixPQUFPLEVBQVA7QUFFekIsTUFBTUMsV0FBVyxHQUFHdkIsTUFBTSxDQUFDUSxJQUFQLENBQVljLGtCQUFaLENBQXBCO0FBRUEsTUFBTUUsZUFBZSxHQUFHeEIsTUFBTSxDQUFDQyxPQUFQLENBQWVxQixrQkFBZixFQUFtQ2IsTUFBbkMsQ0FDdEIsVUFBQ0MsR0FBRCxTQUFtQztBQUFBO0FBQUEsUUFBNUJsQixTQUE0QjtBQUFBLFFBQWpCaUMsV0FBaUI7O0FBQ2pDLFFBQUksQ0FBQ0EsV0FBVyxDQUFDQyxPQUFqQixFQUEwQixPQUFPaEIsR0FBUDtBQUMxQiwyQ0FDS0EsR0FETCwyQkFFR2xCLFNBRkgsRUFFZWlDLFdBQVcsQ0FBQ0MsT0FGM0I7QUFJRCxHQVBxQixFQVF0QixFQVJzQixDQUF4QjtBQVdBLFNBQU8sQ0FBQ0gsV0FBRCxFQUFjQyxlQUFkLENBQVA7QUFDRDtBQUVELE9BQU8sU0FBU0csdUJBQVQsQ0FBaUNDLGtCQUFqQyxFQUFxRDtBQUMxRCxNQUFJLENBQUNBLGtCQUFMLEVBQXlCLE9BQU8sRUFBUDtBQUV6QixTQUFPNUIsTUFBTSxDQUFDUSxJQUFQLENBQVlvQixrQkFBWixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhZGFwdEZpbHRlclR5cGUodHlwZSkge1xuICBpZiAodHlwZSA9PT0gXCJhbnlcIikgcmV0dXJuIHt9O1xuICBpZiAodHlwZSA9PT0gXCJhbGxcIikgcmV0dXJuIHsgdHlwZTogXCJhbmRcIiB9O1xuICByZXR1cm4geyB0eXBlOiBcImFuZFwiIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGFwdEZhY2V0Q29uZmlnKGZhY2V0cykge1xuICBpZiAoIWZhY2V0cykgcmV0dXJuO1xuXG4gIGNvbnN0IGNvbnZlcnRJbnZhbGlkRmFjZXRzVG9VbmRlZmluZWQgPSAoW2ZpZWxkTmFtZSwgY29uZmlnXSkgPT4ge1xuICAgIGlmIChjb25maWcudHlwZSAhPSBcInZhbHVlXCIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYHNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IERyb3BwaW5nICR7ZmllbGROYW1lfSBmYWNldCwgb25seSB2YWx1ZSBmYWNldHMgYXJlIHN1cHBvcnRlZCBpbiBTaXRlIFNlYXJjaGBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb25maWcuc29ydCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IFNpdGUgU2VhcmNoIGRvZXMgbm90IHN1cHBvcnQgJ3NvcnQnIG9uIGZhY2V0c1wiXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnNpemUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBTaXRlIFNlYXJjaCBkb2VzIG5vdCBzdXBwb3J0ICdzaXplJyBvbiBmYWNldHNcIlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFtmaWVsZE5hbWUsIGNvbmZpZ107XG4gIH07XG5cbiAgY29uc3QgZ2V0S2V5ID0gKFtrZXldKSA9PiBrZXk7XG5cbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmVudHJpZXMoZmFjZXRzKVxuICAgIC5tYXAoY29udmVydEludmFsaWRGYWNldHNUb1VuZGVmaW5lZClcbiAgICAuZmlsdGVyKHYgPT4gdilcbiAgICAubWFwKGdldEtleSk7XG5cbiAgaWYgKCFjb25maWcubGVuZ3RoKSByZXR1cm47XG4gIHJldHVybiBjb25maWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGFwdEZpbHRlckNvbmZpZyhmaWx0ZXJzKSB7XG4gIGlmICghZmlsdGVycyB8fCBPYmplY3Qua2V5cyhmaWx0ZXJzKS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICByZXR1cm4gZmlsdGVycy5yZWR1Y2UoKGFjYywgZmlsdGVyKSA9PiB7XG4gICAgY29uc3QgZmllbGROYW1lID0gZmlsdGVyLmZpZWxkO1xuICAgIGxldCBmaWVsZFZhbHVlID0gZmlsdGVyLnZhbHVlcztcblxuICAgIGlmIChhY2NbZmllbGROYW1lXSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IE1vcmUgdGhhbiBvbmUgZmlsdGVyIGZvdW5kIGZvciBhIHNpbmdsZSBmaWVsZFwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG5cbiAgICBpZiAoZmlsdGVyLnR5cGUgJiYgKGZpbHRlci50eXBlICE9PSBcImFsbFwiICYmIGZpbHRlci50eXBlICE9PSBcImFueVwiKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgc2VhcmNoLXVpLXNpdGUtc2VhcmNoLWNvbm5lY3RvcjogVW5zdXBwb3J0ZWQgZmlsdGVyIHR5cGUgXCIke2ZpbHRlci50eXBlfVwiIGZvdW5kLCBvbmx5IFwiYWxsXCIgYW5kIFwiYW55XCIgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWRgXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9XG5cbiAgICBpZiAoZmllbGRWYWx1ZS5maW5kKHYgPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChmaWVsZFZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwic2VhcmNoLXVpLXNpdGUtc2VhcmNoLWNvbm5lY3RvcjogQ2Fubm90IGFwcGx5IG1vcmUgdGhhbiAxIG5vbmUtdmFsdWUgZmlsdGVycyB0byBhIHNpbmdsZSBmaWVsZFwiXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBmaWVsZFZhbHVlWzBdO1xuICAgICAgaWYgKFxuICAgICAgICBmaXJzdFZhbHVlLmZyb20gfHxcbiAgICAgICAgZmlyc3RWYWx1ZS5mcm9tID09PSAwIHx8XG4gICAgICAgIGZpcnN0VmFsdWUudG8gfHxcbiAgICAgICAgZmlyc3RWYWx1ZS50byA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCB7IG5hbWUsIC4uLnJlc3QgfSA9IGZpcnN0VmFsdWU7XG4gICAgICAgIGFjY1tmaWVsZE5hbWVdID0ge1xuICAgICAgICAgIHR5cGU6IFwicmFuZ2VcIixcbiAgICAgICAgICAuLi5yZXN0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFjY1tmaWVsZE5hbWVdID0ge1xuICAgICAgLi4uYWRhcHRGaWx0ZXJUeXBlKGZpbHRlci50eXBlKSxcbiAgICAgIHZhbHVlczogZmllbGRWYWx1ZVxuICAgIH07XG5cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGFwdFJlc3VsdEZpZWxkc0NvbmZpZyhyZXN1bHRGaWVsZHNDb25maWcpIHtcbiAgaWYgKCFyZXN1bHRGaWVsZHNDb25maWcpIHJldHVybiBbXTtcblxuICBjb25zdCBmZXRjaEZpZWxkcyA9IE9iamVjdC5rZXlzKHJlc3VsdEZpZWxkc0NvbmZpZyk7XG5cbiAgY29uc3QgaGlnaGxpZ2h0RmllbGRzID0gT2JqZWN0LmVudHJpZXMocmVzdWx0RmllbGRzQ29uZmlnKS5yZWR1Y2UoXG4gICAgKGFjYywgW2ZpZWxkTmFtZSwgZmllbGRDb25maWddKSA9PiB7XG4gICAgICBpZiAoIWZpZWxkQ29uZmlnLnNuaXBwZXQpIHJldHVybiBhY2M7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5hY2MsXG4gICAgICAgIFtmaWVsZE5hbWVdOiBmaWVsZENvbmZpZy5zbmlwcGV0XG4gICAgICB9O1xuICAgIH0sXG4gICAge31cbiAgKTtcblxuICByZXR1cm4gW2ZldGNoRmllbGRzLCBoaWdobGlnaHRGaWVsZHNdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRhcHRTZWFyY2hGaWVsZHNDb25maWcoc2VhcmNoRmllbGRzQ29uZmlnKSB7XG4gIGlmICghc2VhcmNoRmllbGRzQ29uZmlnKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKHNlYXJjaEZpZWxkc0NvbmZpZyk7XG59XG4iXX0=