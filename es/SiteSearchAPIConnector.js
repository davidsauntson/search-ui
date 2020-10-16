import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import adaptRequest from "./requestAdapter";
import adaptResponse from "./responseAdapter";
import request from "./request";
import { version } from "../package.json";

function _get(engineKey, path, params) {
  var headers = new Headers({
    "x-swiftype-integration": "search-ui",
    "x-swiftype-integration-version": version
  });
  var query = Object.entries(_objectSpread({
    engine_key: engineKey
  }, params)).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        paramName = _ref2[0],
        paramValue = _ref2[1];

    return "".concat(paramName, "=").concat(encodeURIComponent(paramValue));
  }).join("&");
  return fetch("https://search-api.swiftype.com/api/v1/public/".concat(path, "?").concat(query), {
    method: "GET",
    credentials: "include",
    headers: headers
  });
}

var SiteSearchAPIConnector = /*#__PURE__*/function () {
  /**
   * @callback next
   * @param {Object} updatedQueryOptions The options to send to the API
   */

  /**
   * @callback hook
   * @param {Object} queryOptions The options that are about to be sent to the API
   * @param {next} next The options that are about to be sent to the API
   */

  /**
   * @typedef Options
   * @param  {string} documentType Document Type found in your Site Search Dashboard
   * @param  {string} engineKey Credential found in your Site Search Dashboard
   * @param  {hook} beforeSearchCall=(queryOptions,next)=>next(queryOptions) A hook to amend query options before the request is sent to the
   *   API in a query on an "onSearch" event.
   * @param  {hook} beforeAutocompleteResultsCall=(queryOptions,next)=>next(queryOptions) A hook to amend query options before the request is sent to the
   *   API in a "results" query on an "onAutocomplete" event.
   */

  /**
   * @param {Options} options
   */
  function SiteSearchAPIConnector(_ref3) {
    var documentType = _ref3.documentType,
        engineKey = _ref3.engineKey,
        _ref3$beforeSearchCal = _ref3.beforeSearchCall,
        beforeSearchCall = _ref3$beforeSearchCal === void 0 ? function (queryOptions, next) {
      return next(queryOptions);
    } : _ref3$beforeSearchCal,
        _ref3$beforeAutocompl = _ref3.beforeAutocompleteResultsCall,
        beforeAutocompleteResultsCall = _ref3$beforeAutocompl === void 0 ? function (queryOptions, next) {
      return next(queryOptions);
    } : _ref3$beforeAutocompl;

    _classCallCheck(this, SiteSearchAPIConnector);

    this.documentType = documentType;
    this.engineKey = engineKey;
    this.beforeSearchCall = beforeSearchCall;
    this.beforeAutocompleteResultsCall = beforeAutocompleteResultsCall;
    this.request = request.bind(this, engineKey);
    this._get = _get.bind(this, engineKey);
  }

  _createClass(SiteSearchAPIConnector, [{
    key: "onResultClick",
    value: function onResultClick(_ref4) {
      var query = _ref4.query,
          documentId = _ref4.documentId,
          tags = _ref4.tags;

      if (tags && tags.length > 0) {
        console.warn("search-ui-site-search-connector: Site Search does not support tags on click");
      }

      this._get("analytics/pc", {
        t: new Date().getTime(),
        q: query,
        doc_id: documentId
      });
    }
  }, {
    key: "onAutocompleteResultClick",
    value: function onAutocompleteResultClick(_ref5) {
      var query = _ref5.query,
          documentId = _ref5.documentId,
          tags = _ref5.tags;

      if (tags) {
        console.warn("search-ui-site-search-connector: Site Search does not support tags on autocompleteClick");
      }

      this._get("analytics/pas", {
        t: new Date().getTime(),
        q: query,
        doc_id: documentId
      });
    }
  }, {
    key: "onSearch",
    value: function onSearch(state, queryConfig) {
      var _this = this;

      var options = adaptRequest(state, queryConfig, this.documentType);
      return this.beforeSearchCall(options, function (newOptions) {
        return _this.request("POST", "engines/search.json", newOptions).then(function (json) {
          return adaptResponse(json, _this.documentType);
        });
      });
    }
  }, {
    key: "onAutocomplete",
    value: function () {
      var _onAutocomplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref6, queryConfig) {
        var _this2 = this;

        var searchTerm, options;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searchTerm = _ref6.searchTerm;

                if (!queryConfig.results) {
                  _context.next = 4;
                  break;
                }

                options = adaptRequest({
                  searchTerm: searchTerm
                }, queryConfig.results, this.documentType);
                return _context.abrupt("return", this.beforeAutocompleteResultsCall(options, function (newOptions) {
                  return _this2.request("POST", "engines/suggest.json", newOptions).then(function (json) {
                    return {
                      autocompletedResults: adaptResponse(json, _this2.documentType).results
                    };
                  });
                }));

              case 4:
                if (queryConfig.suggestions) {
                  console.warn("search-ui-site-search-connector: Site Search does support query suggestions on autocomplete");
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onAutocomplete(_x, _x2) {
        return _onAutocomplete.apply(this, arguments);
      }

      return onAutocomplete;
    }()
  }]);

  return SiteSearchAPIConnector;
}();

export default SiteSearchAPIConnector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TaXRlU2VhcmNoQVBJQ29ubmVjdG9yLmpzIl0sIm5hbWVzIjpbImFkYXB0UmVxdWVzdCIsImFkYXB0UmVzcG9uc2UiLCJyZXF1ZXN0IiwidmVyc2lvbiIsIl9nZXQiLCJlbmdpbmVLZXkiLCJwYXRoIiwicGFyYW1zIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJxdWVyeSIsIk9iamVjdCIsImVudHJpZXMiLCJlbmdpbmVfa2V5IiwibWFwIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiU2l0ZVNlYXJjaEFQSUNvbm5lY3RvciIsImRvY3VtZW50VHlwZSIsImJlZm9yZVNlYXJjaENhbGwiLCJxdWVyeU9wdGlvbnMiLCJuZXh0IiwiYmVmb3JlQXV0b2NvbXBsZXRlUmVzdWx0c0NhbGwiLCJiaW5kIiwiZG9jdW1lbnRJZCIsInRhZ3MiLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsInQiLCJEYXRlIiwiZ2V0VGltZSIsInEiLCJkb2NfaWQiLCJzdGF0ZSIsInF1ZXJ5Q29uZmlnIiwib3B0aW9ucyIsIm5ld09wdGlvbnMiLCJ0aGVuIiwianNvbiIsInNlYXJjaFRlcm0iLCJyZXN1bHRzIiwiYXV0b2NvbXBsZXRlZFJlc3VsdHMiLCJzdWdnZXN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxZQUFQLE1BQXlCLGtCQUF6QjtBQUNBLE9BQU9DLGFBQVAsTUFBMEIsbUJBQTFCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixXQUFwQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsaUJBQXhCOztBQUVBLFNBQVNDLElBQVQsQ0FBY0MsU0FBZCxFQUF5QkMsSUFBekIsRUFBK0JDLE1BQS9CLEVBQXVDO0FBQ3JDLE1BQU1DLE9BQU8sR0FBRyxJQUFJQyxPQUFKLENBQVk7QUFDMUIsOEJBQTBCLFdBREE7QUFFMUIsc0NBQWtDTjtBQUZSLEdB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WyJpbXBvcnQgYWRhcHRSZXF1ZXN0IGZyb20gXCIuL3JlcXVlc3RBZGFwdGVyXCI7XG5pbXBvcnQgYWRhcHRSZXNwb25zZSBmcm9tIFwiLi9yZXNwb25zZUFkYXB0ZXJcIjtcbmltcG9ydCByZXF1ZXN0IGZyb20gXCIuL3JlcXVlc3RcIjtcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tIFwiLi4vcGFja2FnZS5qc29uXCI7XG5cbmZ1bmN0aW9uIF9nZXQoZW5naW5lS2V5LCBwYXRoLCBwYXJhbXMpIHtcbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcbiAgICBcIngtc3dpZnR5cGUtaW50ZWdyYXRpb25cIjogXCJzZWFyY2gtdWlcIixcbiAgICBcIngtc3dpZnR5cGUtaW50ZWdyYXRpb24tdmVyc2lvblwiOiB2ZXJzaW9uXG4gIH0pO1xuXG4gIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmVudHJpZXMoeyBlbmdpbmVfa2V5OiBlbmdpbmVLZXksIC4uLnBhcmFtcyB9KVxuICAgIC5tYXAoKFtwYXJhbU5hbWUsIHBhcmFtVmFsdWVdKSA9PiB7XG4gICAgICByZXR1cm4gYCR7cGFyYW1OYW1lfT0ke2VuY29kZVVSSUNvbXBvbmVudChwYXJhbVZhbHVlKX1gO1xuICAgIH0pXG4gICAgLmpvaW4oXCImXCIpO1xuXG4gIHJldHVybiBmZXRjaChcbiAgICBgaHR0cHM6Ly9zZWFyY2gtYXBpLnN3aWZ0eXBlLmNvbS9hcGkvdjEvcHVibGljLyR7cGF0aH0/JHtxdWVyeX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgIGhlYWRlcnNcbiAgICB9XG4gICk7XG59XG5cbmNsYXNzIFNpdGVTZWFyY2hBUElDb25uZWN0b3Ige1xuICAvKipcbiAgICogQGNhbGxiYWNrIG5leHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZWRRdWVyeU9wdGlvbnMgVGhlIG9wdGlvbnMgdG8gc2VuZCB0byB0aGUgQVBJXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgaG9va1xuICAgKiBAcGFyYW0ge09iamVjdH0gcXVlcnlPcHRpb25zIFRoZSBvcHRpb25zIHRoYXQgYXJlIGFib3V0IHRvIGJlIHNlbnQgdG8gdGhlIEFQSVxuICAgKiBAcGFyYW0ge25leHR9IG5leHQgVGhlIG9wdGlvbnMgdGhhdCBhcmUgYWJvdXQgdG8gYmUgc2VudCB0byB0aGUgQVBJXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiBPcHRpb25zXG4gICAqIEBwYXJhbSAge3N0cmluZ30gZG9jdW1lbnRUeXBlIERvY3VtZW50IFR5cGUgZm91bmQgaW4geW91ciBTaXRlIFNlYXJjaCBEYXNoYm9hcmRcbiAgICogQHBhcmFtICB7c3RyaW5nfSBlbmdpbmVLZXkgQ3JlZGVudGlhbCBmb3VuZCBpbiB5b3VyIFNpdGUgU2VhcmNoIERhc2hib2FyZFxuICAgKiBAcGFyYW0gIHtob29rfSBiZWZvcmVTZWFyY2hDYWxsPShxdWVyeU9wdGlvbnMsbmV4dCk9Pm5leHQocXVlcnlPcHRpb25zKSBBIGhvb2sgdG8gYW1lbmQgcXVlcnkgb3B0aW9ucyBiZWZvcmUgdGhlIHJlcXVlc3QgaXMgc2VudCB0byB0aGVcbiAgICogICBBUEkgaW4gYSBxdWVyeSBvbiBhbiBcIm9uU2VhcmNoXCIgZXZlbnQuXG4gICAqIEBwYXJhbSAge2hvb2t9IGJlZm9yZUF1dG9jb21wbGV0ZVJlc3VsdHNDYWxsPShxdWVyeU9wdGlvbnMsbmV4dCk9Pm5leHQocXVlcnlPcHRpb25zKSBBIGhvb2sgdG8gYW1lbmQgcXVlcnkgb3B0aW9ucyBiZWZvcmUgdGhlIHJlcXVlc3QgaXMgc2VudCB0byB0aGVcbiAgICogICBBUEkgaW4gYSBcInJlc3VsdHNcIiBxdWVyeSBvbiBhbiBcIm9uQXV0b2NvbXBsZXRlXCIgZXZlbnQuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBkb2N1bWVudFR5cGUsXG4gICAgZW5naW5lS2V5LFxuICAgIGJlZm9yZVNlYXJjaENhbGwgPSAocXVlcnlPcHRpb25zLCBuZXh0KSA9PiBuZXh0KHF1ZXJ5T3B0aW9ucyksXG4gICAgYmVmb3JlQXV0b2NvbXBsZXRlUmVzdWx0c0NhbGwgPSAocXVlcnlPcHRpb25zLCBuZXh0KSA9PiBuZXh0KHF1ZXJ5T3B0aW9ucylcbiAgfSkge1xuICAgIHRoaXMuZG9jdW1lbnRUeXBlID0gZG9jdW1lbnRUeXBlO1xuICAgIHRoaXMuZW5naW5lS2V5ID0gZW5naW5lS2V5O1xuICAgIHRoaXMuYmVmb3JlU2VhcmNoQ2FsbCA9IGJlZm9yZVNlYXJjaENhbGw7XG4gICAgdGhpcy5iZWZvcmVBdXRvY29tcGxldGVSZXN1bHRzQ2FsbCA9IGJlZm9yZUF1dG9jb21wbGV0ZVJlc3VsdHNDYWxsO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3QuYmluZCh0aGlzLCBlbmdpbmVLZXkpO1xuICAgIHRoaXMuX2dldCA9IF9nZXQuYmluZCh0aGlzLCBlbmdpbmVLZXkpO1xuICB9XG5cbiAgb25SZXN1bHRDbGljayh7IHF1ZXJ5LCBkb2N1bWVudElkLCB0YWdzIH0pIHtcbiAgICBpZiAodGFncyAmJiB0YWdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBTaXRlIFNlYXJjaCBkb2VzIG5vdCBzdXBwb3J0IHRhZ3Mgb24gY2xpY2tcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fZ2V0KFwiYW5hbHl0aWNzL3BjXCIsIHtcbiAgICAgIHQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgcTogcXVlcnksXG4gICAgICBkb2NfaWQ6IGRvY3VtZW50SWRcbiAgICB9KTtcbiAgfVxuXG4gIG9uQXV0b2NvbXBsZXRlUmVzdWx0Q2xpY2soeyBxdWVyeSwgZG9jdW1lbnRJZCwgdGFncyB9KSB7XG4gICAgaWYgKHRhZ3MpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBTaXRlIFNlYXJjaCBkb2VzIG5vdCBzdXBwb3J0IHRhZ3Mgb24gYXV0b2NvbXBsZXRlQ2xpY2tcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fZ2V0KFwiYW5hbHl0aWNzL3Bhc1wiLCB7XG4gICAgICB0OiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgIHE6IHF1ZXJ5LFxuICAgICAgZG9jX2lkOiBkb2N1bWVudElkXG4gICAgfSk7XG4gIH1cblxuICBvblNlYXJjaChzdGF0ZSwgcXVlcnlDb25maWcpIHtcbiAgICBjb25zdCBvcHRpb25zID0gYWRhcHRSZXF1ZXN0KHN0YXRlLCBxdWVyeUNvbmZpZywgdGhpcy5kb2N1bWVudFR5cGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuYmVmb3JlU2VhcmNoQ2FsbChvcHRpb25zLCBuZXdPcHRpb25zID0+XG4gICAgICB0aGlzLnJlcXVlc3QoXCJQT1NUXCIsIFwiZW5naW5lcy9zZWFyY2guanNvblwiLCBuZXdPcHRpb25zKS50aGVuKGpzb24gPT5cbiAgICAgICAgYWRhcHRSZXNwb25zZShqc29uLCB0aGlzLmRvY3VtZW50VHlwZSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgb25BdXRvY29tcGxldGUoeyBzZWFyY2hUZXJtIH0sIHF1ZXJ5Q29uZmlnKSB7XG4gICAgaWYgKHF1ZXJ5Q29uZmlnLnJlc3VsdHMpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBhZGFwdFJlcXVlc3QoXG4gICAgICAgIHsgc2VhcmNoVGVybSB9LFxuICAgICAgICBxdWVyeUNvbmZpZy5yZXN1bHRzLFxuICAgICAgICB0aGlzLmRvY3VtZW50VHlwZVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlQXV0b2NvbXBsZXRlUmVzdWx0c0NhbGwob3B0aW9ucywgbmV3T3B0aW9ucyA9PlxuICAgICAgICB0aGlzLnJlcXVlc3QoXCJQT1NUXCIsIFwiZW5naW5lcy9zdWdnZXN0Lmpzb25cIiwgbmV3T3B0aW9ucykudGhlbihqc29uID0+ICh7XG4gICAgICAgICAgYXV0b2NvbXBsZXRlZFJlc3VsdHM6IGFkYXB0UmVzcG9uc2UoanNvbiwgdGhpcy5kb2N1bWVudFR5cGUpLnJlc3VsdHNcbiAgICAgICAgfSkpXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAocXVlcnlDb25maWcuc3VnZ2VzdGlvbnMpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJzZWFyY2gtdWktc2l0ZS1zZWFyY2gtY29ubmVjdG9yOiBTaXRlIFNlYXJjaCBkb2VzIHN1cHBvcnQgcXVlcnkgc3VnZ2VzdGlvbnMgb24gYXV0b2NvbXBsZXRlXCJcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpdGVTZWFyY2hBUElDb25uZWN0b3I7XG4iXX0=