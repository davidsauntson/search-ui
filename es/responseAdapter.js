import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getFacets, getResults } from "./responseAdapters";
export default function adaptResponse(response, documentType) {
  var results = getResults(response.records, documentType);
  var totalPages = response.info[documentType].num_pages;
  var totalResults = response.info[documentType].total_result_count;
  var requestId = "";
  var facets = getFacets(response.info[documentType]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZUFkYXB0ZXIuanMiXSwibmFtZXMiOlsiZ2V0RmFjZXRzIiwiZ2V0UmVzdWx0cyIsImFkYXB0UmVzcG9uc2UiLCJyZXNwb25zZSIsImRvY3VtZW50VHlwZSIsInJlc3VsdHMiLCJyZWNvcmRzIiwidG90YWxQYWdlcyIsImluZm8iLCJudW1fcGFnZXMiLCJ0b3RhbFJlc3VsdHMiLCJ0b3RhbF9yZXN1bHRfY291bnQiLCJyZXF1ZXN0SWQiLCJmYWNldHMiLCJyYXdSZXNwb25zZSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLFNBQVNBLFNBQVQsRUFBb0JDLFVBQXBCLFFBQXNDLG9CQUF0QztBQUVBLGVBQWUsU0FBU0MsYUFBVCxDQUF1QkMsUUFBdkIsRUFBaUNDLFlBQWpDLEVBQStDO0FBQzVELE1BQU1DLE9BQU8sR0FBR0osVUFBVSxDQUFDRSxRQUFRLENBQUNHLE9BQVYsRUFBbUJGLFlBQW5CLENBQTFCO0FBQ0EsTUFBTUcsVUFBVSxHQUFHSixRQUFRLENBQUNLLElBQVQsQ0FBY0osWUFBZCxFQUE0QkssU0FBL0M7QUFDQSxNQUFNQyxZQUFZLEdBQUdQLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjSixZQUFkLEVBQTRCTyxrQkFBakQ7QUFDQSxNQUFNQyxTQUFTLEdBQUcsRUFBbEI7QUFDQSxNQUFNQyxNQUFNLEdBQUdiLFNBQVMsQ0FBQ0csUUFBUSxDQUFDSyxJQUFULENBQWNKLFlBQWQsQ0FBRCxDQUF4QjtBQUVBO0FBQ0VVLElBQUFBLFdBQVcsRUFBRVgsUUFEZjtBQUVFRSxJQUFBQSxPQUFPLEVBQVBBLE9BRkY7QUFHRUUsSUFBQUEsVUFBVSxFQUFWQSxVQUhGO0FBSUVHLElBQUFBLFlBQVksRUFBWkEsWUFKRjtBQUtFRSxJQUFBQSxTQUFTLEVBQVRBO0FBTEYsS0FNTUcsTUFBTSxDQUFDQyxJQUFQLENBQVlILE1BQVosRUFBb0JJLE1BQXBCLEdBQTZCLENBQTdCLElBQWtDO0FBQUVKLElBQUFBLE1BQU0sRUFBTkE7QUFBRixHQU54QztBQVFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0RmFjZXRzLCBnZXRSZXN1bHRzIH0gZnJvbSBcIi4vcmVzcG9uc2VBZGFwdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGFwdFJlc3BvbnNlKHJlc3BvbnNlLCBkb2N1bWVudFR5cGUpIHtcbiAgY29uc3QgcmVzdWx0cyA9IGdldFJlc3VsdHMocmVzcG9uc2UucmVjb3JkcywgZG9jdW1lbnRUeXBlKTtcbiAgY29uc3QgdG90YWxQYWdlcyA9IHJlc3BvbnNlLmluZm9bZG9jdW1lbnRUeXBlXS5udW1fcGFnZXM7XG4gIGNvbnN0IHRvdGFsUmVzdWx0cyA9IHJlc3BvbnNlLmluZm9bZG9jdW1lbnRUeXBlXS50b3RhbF9yZXN1bHRfY291bnQ7XG4gIGNvbnN0IHJlcXVlc3RJZCA9IFwiXCI7XG4gIGNvbnN0IGZhY2V0cyA9IGdldEZhY2V0cyhyZXNwb25zZS5pbmZvW2RvY3VtZW50VHlwZV0pO1xuXG4gIHJldHVybiB7XG4gICAgcmF3UmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgIHJlc3VsdHMsXG4gICAgdG90YWxQYWdlcyxcbiAgICB0b3RhbFJlc3VsdHMsXG4gICAgcmVxdWVzdElkLFxuICAgIC4uLihPYmplY3Qua2V5cyhmYWNldHMpLmxlbmd0aCA+IDAgJiYgeyBmYWNldHMgfSlcbiAgfTtcbn1cbiJdfQ==