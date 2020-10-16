"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _requestAdapter = _interopRequireDefault(require("./requestAdapter"));

var _responseAdapter = _interopRequireDefault(require("./responseAdapter"));

var _request = _interopRequireDefault(require("./request"));

var _package = require("../package.json");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _get(engineKey, path, params) {
  var headers = new Headers({
    "x-swiftype-integration": "search-ui",
    "x-swiftype-integration-version": _package.version
  });
  var query = Object.entries(_objectSpread({
    engine_key: engineKey
  }, params)).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
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
    (0, _classCallCheck2.default)(this, SiteSearchAPIConnector);
    this.documentType = documentType;
    this.engineKey = engineKey;
    this.beforeSearchCall = beforeSearchCall;
    this.beforeAutocompleteResultsCall = beforeAutocompleteResultsCall;
    this.request = _request.default.bind(this, engineKey);
    this._get = _get.bind(this, engineKey);
  }

  (0, _createClass2.default)(SiteSearchAPIConnector, [{
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

      var options = (0, _requestAdapter.default)(state, queryConfig, this.documentType);
      return this.beforeSearchCall(options, function (newOptions) {
        return _this.request("POST", "engines/search.json", newOptions).then(function (json) {
          return (0, _responseAdapter.default)(json, _this.documentType);
        });
      });
    }
  }, {
    key: "onAutocomplete",
    value: function () {
      var _onAutocomplete = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref6, queryConfig) {
        var _this2 = this;

        var searchTerm, options;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searchTerm = _ref6.searchTerm;

                if (!queryConfig.results) {
                  _context.next = 4;
                  break;
                }

                options = (0, _requestAdapter.default)({
                  searchTerm: searchTerm
                }, queryConfig.results, this.documentType);
                return _context.abrupt("return", this.beforeAutocompleteResultsCall(options, function (newOptions) {
                  return _this2.request("POST", "engines/suggest.json", newOptions).then(function (json) {
                    return {
                      autocompletedResults: (0, _responseAdapter.default)(json, _this2.documentType).results
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

var _default = SiteSearchAPIConnector;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9TaXRlU2VhcmNoQVBJQ29ubmVjdG9yLmpzIl0sIm5hbWVzIjpbIl9nZXQiLCJlbmdpbmVLZXkiLCJwYXRoIiwicGFyYW1zIiwiaGVhZGVycyIsIkhlYWRlcnMiLCJ2ZXJzaW9uIiwicXVlcnkiLCJPYmplY3QiLCJlbnRyaWVzIiwiZW5naW5lX2tleSIsIm1hcCIsInBhcmFtTmFtZSIsInBhcmFtVmFsdWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsIlNpdGVTZWFyY2hBUElDb25uZWN0b3IiLCJkb2N1bWVudFR5cGUiLCJiZWZvcmVTZWFyY2hDYWxsIiwicXVlcnlPcHRpb25zIiwibmV4dCIsImJlZm9yZUF1dG9jb21wbGV0ZVJlc3VsdHNDYWxsIiwicmVxdWVzdCIsImJpbmQiLCJkb2N1bWVudElkIiwidGFncyIsImxlbmd0aCIsImNvbnNvbGUiLCJ3YXJuIiwidCIsIkRhdGUiLCJnZXRUaW1lIiwicSIsImRvY19pZCIsInN0YXRlIiwicXVlcnlDb25maWciLCJvcHRpb25zIiwibmV3T3B0aW9ucyIsInRoZW4iLCJqc29uIiwic2VhcmNoVGVybSIsInJlc3VsdHMiLCJhdXRvY29tcGxldGVkUmVzdWx0cyIsInN1Z2dlc3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxDQUFjQyxTQUFkLEVBQXlCQyxJQUF6QixFQUErQkMsTUFBL0IsRUFBdUM7QUFDckMsTUFBTUMsT0FBTyxHQUFHLElBQUlDLE9BQUosQ0FBWTtBQUMxQiw4QkFBMEIsV0FEQTtBQUUxQixzQ0FBa0NDO0FBRlIsR0FBWixDQUFoQjtBQUtBLE1BQU1DLEtBQUssR0FBR0MsTUFBTSxDQUFDQyxPQUFQO0FBQWlCQyxJQUFBQSxVQUFVLEVBQUVUO0FBQTdCLEtBQTJDRSxNQUEzQyxHQUNYUSxHQURXLENBQ1AsZ0JB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Q0FBQ2YsT0FBTCxDQUFhLE1BQWIsRUFBcUIscUJBQXJCLEVBQTRDZSxVQUE1QyxFQUF3REMsSUFBeEQsQ0FBNkQsVUFBQUMsSUFBSTtBQUFBLGlCQUMvRCw4QkFBY0EsSUFBZCxFQUFvQixLQUFJLENBQUN0QixZQUF6QixDQUQrRDtBQUFBLFNBQWpFLENBRDhDO0FBQUEsT0FBekMsQ0FBUDtBQUtEOzs7OzRIQUVvQ2tCLFc7Ozs7Ozs7O0FBQWRLLGdCQUFBQSxVLFNBQUFBLFU7O3FCQUNqQkwsV0FBVyxDQUFDTSxPOzs7OztBQUNSTCxnQkFBQUEsTyxHQUFVLDZCQUNkO0FBQUVJLGtCQUFBQSxVQUFVLEVBQVZBO0FBQUYsaUJBRGMsRUFFZEwsV0FBVyxDQUFDTSxPQUZFLEVBR2QsS0FBS3hCLFlBSFMsQztpREFNVCxLQUFLSSw2QkFBTCxDQUFtQ2UsT0FBbkMsRUFBNEMsVUFBQUMsVUFBVTtBQUFBLHlCQUMzRCxNQUFJLENBQUNmLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLHNCQUFyQixFQUE2Q2UsVUFBN0MsRUFBeURDLElBQXpELENBQThELFVBQUFDLElBQUk7QUFBQSwyQkFBSztBQUNyRUcsc0JBQUFBLG9CQUFvQixFQUFFLDhCQUFjSCxJQUFkLEVBQW9CLE1BQUksQ0FBQ3RCLFlBQXpCLEVBQXVDd0I7QUFEUSxxQkFBTDtBQUFBLG1CQUFsRSxDQUQyRDtBQUFBLGlCQUF0RCxDOzs7QUFNVCxvQkFBSU4sV0FBVyxDQUFDUSxXQUFoQixFQUE2QjtBQUMzQmhCLGtCQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FDRSw2RkFERjtBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUlVWixzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhZGFwdFJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdEFkYXB0ZXJcIjtcbmltcG9ydCBhZGFwdFJlc3BvbnNlIGZyb20gXCIuL3Jlc3BvbnNlQWRhcHRlclwiO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuZnVuY3Rpb24gX2dldChlbmdpbmVLZXksIHBhdGgsIHBhcmFtcykge1xuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICAgIFwieC1zd2lmdHlwZS1pbnRlZ3JhdGlvblwiOiBcInNlYXJjaC11aVwiLFxuICAgIFwieC1zd2lmdHlwZS1pbnRlZ3JhdGlvbi12ZXJzaW9uXCI6IHZlcnNpb25cbiAgfSk7XG5cbiAgY29uc3QgcXVlcnkgPSBPYmplY3QuZW50cmllcyh7IGVuZ2luZV9rZXk6IGVuZ2luZUtleSwgLi4ucGFyYW1zIH0pXG4gICAgLm1hcCgoW3BhcmFtTmFtZSwgcGFyYW1WYWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiBgJHtwYXJhbU5hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsdWUpfWA7XG4gICAgfSlcbiAgICAuam9pbihcIiZcIik7XG5cbiAgcmV0dXJuIGZldGNoKFxuICAgIGBodHRwczovL3NlYXJjaC1hcGkuc3dpZnR5cGUuY29tL2FwaS92MS9wdWJsaWMvJHtwYXRofT8ke3F1ZXJ5fWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgaGVhZGVyc1xuICAgIH1cbiAgKTtcbn1cblxuY2xhc3MgU2l0ZVNlYXJjaEFQSUNvbm5lY3RvciB7XG4gIC8qKlxuICAgKiBAY2FsbGJhY2sgbmV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gdXBkYXRlZFF1ZXJ5T3B0aW9ucyBUaGUgb3B0aW9ucyB0byBzZW5kIHRvIHRoZSBBUElcbiAgICovXG5cbiAgLyoqXG4gICAqIEBjYWxsYmFjayBob29rXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyeU9wdGlvbnMgVGhlIG9wdGlvbnMgdGhhdCBhcmUgYWJvdXQgdG8gYmUgc2VudCB0byB0aGUgQVBJXG4gICAqIEBwYXJhbSB7bmV4dH0gbmV4dCBUaGUgb3B0aW9ucyB0aGF0IGFyZSBhYm91dCB0byBiZSBzZW50IHRvIHRoZSBBUElcbiAgICovXG5cbiAgLyoqXG4gICAqIEB0eXBlZGVmIE9wdGlvbnNcbiAgICogQHBhcmFtICB7c3RyaW5nfSBkb2N1bWVudFR5cGUgRG9jdW1lbnQgVHlwZSBmb3VuZCBpbiB5b3VyIFNpdGUgU2VhcmNoIERhc2hib2FyZFxuICAgKiBAcGFyYW0gIHtzdHJpbmd9IGVuZ2luZUtleSBDcmVkZW50aWFsIGZvdW5kIGluIHlvdXIgU2l0ZSBTZWFyY2ggRGFzaGJvYXJkXG4gICAqIEBwYXJhbSAge2hvb2t9IGJlZm9yZVNlYXJjaENhbGw9KHF1ZXJ5T3B0aW9ucyxuZXh0KT0+bmV4dChxdWVyeU9wdGlvbnMpIEEgaG9vayB0byBhbWVuZCBxdWVyeSBvcHRpb25zIGJlZm9yZSB0aGUgcmVxdWVzdCBpcyBzZW50IHRvIHRoZVxuICAgKiAgIEFQSSBpbiBhIHF1ZXJ5IG9uIGFuIFwib25TZWFyY2hcIiBldmVudC5cbiAgICogQHBhcmFtICB7aG9va30gYmVmb3JlQXV0b2NvbXBsZXRlUmVzdWx0c0NhbGw9KHF1ZXJ5T3B0aW9ucyxuZXh0KT0+bmV4dChxdWVyeU9wdGlvbnMpIEEgaG9vayB0byBhbWVuZCBxdWVyeSBvcHRpb25zIGJlZm9yZSB0aGUgcmVxdWVzdCBpcyBzZW50IHRvIHRoZVxuICAgKiAgIEFQSSBpbiBhIFwicmVzdWx0c1wiIHF1ZXJ5IG9uIGFuIFwib25BdXRvY29tcGxldGVcIiBldmVudC5cbiAgICovXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Ioe1xuICAgIGRvY3VtZW50VHlwZSxcbiAgICBlbmdpbmVLZXksXG4gICAgYmVmb3JlU2VhcmNoQ2FsbCA9IChxdWVyeU9wdGlvbnMsIG5leHQpID0+IG5leHQocXVlcnlPcHRpb25zKSxcbiAgICBiZWZvcmVBdXRvY29tcGxldGVSZXN1bHRzQ2FsbCA9IChxdWVyeU9wdGlvbnMsIG5leHQpID0+IG5leHQocXVlcnlPcHRpb25zKVxuICB9KSB7XG4gICAgdGhpcy5kb2N1bWVudFR5cGUgPSBkb2N1bWVudFR5cGU7XG4gICAgdGhpcy5lbmdpbmVLZXkgPSBlbmdpbmVLZXk7XG4gICAgdGhpcy5iZWZvcmVTZWFyY2hDYWxsID0gYmVmb3JlU2VhcmNoQ2FsbDtcbiAgICB0aGlzLmJlZm9yZUF1dG9jb21wbGV0ZVJlc3VsdHNDYWxsID0gYmVmb3JlQXV0b2NvbXBsZXRlUmVzdWx0c0NhbGw7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdC5iaW5kKHRoaXMsIGVuZ2luZUtleSk7XG4gICAgdGhpcy5fZ2V0ID0gX2dldC5iaW5kKHRoaXMsIGVuZ2luZUtleSk7XG4gIH1cblxuICBvblJlc3VsdENsaWNrKHsgcXVlcnksIGRvY3VtZW50SWQsIHRhZ3MgfSkge1xuICAgIGlmICh0YWdzICYmIHRhZ3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IFNpdGUgU2VhcmNoIGRvZXMgbm90IHN1cHBvcnQgdGFncyBvbiBjbGlja1wiXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLl9nZXQoXCJhbmFseXRpY3MvcGNcIiwge1xuICAgICAgdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICBxOiBxdWVyeSxcbiAgICAgIGRvY19pZDogZG9jdW1lbnRJZFxuICAgIH0pO1xuICB9XG5cbiAgb25BdXRvY29tcGxldGVSZXN1bHRDbGljayh7IHF1ZXJ5LCBkb2N1bWVudElkLCB0YWdzIH0pIHtcbiAgICBpZiAodGFncykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IFNpdGUgU2VhcmNoIGRvZXMgbm90IHN1cHBvcnQgdGFncyBvbiBhdXRvY29tcGxldGVDbGlja1wiXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLl9nZXQoXCJhbmFseXRpY3MvcGFzXCIsIHtcbiAgICAgIHQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgcTogcXVlcnksXG4gICAgICBkb2NfaWQ6IGRvY3VtZW50SWRcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VhcmNoKHN0YXRlLCBxdWVyeUNvbmZpZykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhZGFwdFJlcXVlc3Qoc3RhdGUsIHF1ZXJ5Q29uZmlnLCB0aGlzLmRvY3VtZW50VHlwZSk7XG5cbiAgICByZXR1cm4gdGhpcy5iZWZvcmVTZWFyY2hDYWxsKG9wdGlvbnMsIG5ld09wdGlvbnMgPT5cbiAgICAgIHRoaXMucmVxdWVzdChcIlBPU1RcIiwgXCJlbmdpbmVzL3NlYXJjaC5qc29uXCIsIG5ld09wdGlvbnMpLnRoZW4oanNvbiA9PlxuICAgICAgICBhZGFwdFJlc3BvbnNlKGpzb24sIHRoaXMuZG9jdW1lbnRUeXBlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBhc3luYyBvbkF1dG9jb21wbGV0ZSh7IHNlYXJjaFRlcm0gfSwgcXVlcnlDb25maWcpIHtcbiAgICBpZiAocXVlcnlDb25maWcucmVzdWx0cykge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGFkYXB0UmVxdWVzdChcbiAgICAgICAgeyBzZWFyY2hUZXJtIH0sXG4gICAgICAgIHF1ZXJ5Q29uZmlnLnJlc3VsdHMsXG4gICAgICAgIHRoaXMuZG9jdW1lbnRUeXBlXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmVBdXRvY29tcGxldGVSZXN1bHRzQ2FsbChvcHRpb25zLCBuZXdPcHRpb25zID0+XG4gICAgICAgIHRoaXMucmVxdWVzdChcIlBPU1RcIiwgXCJlbmdpbmVzL3N1Z2dlc3QuanNvblwiLCBuZXdPcHRpb25zKS50aGVuKGpzb24gPT4gKHtcbiAgICAgICAgICBhdXRvY29tcGxldGVkUmVzdWx0czogYWRhcHRSZXNwb25zZShqc29uLCB0aGlzLmRvY3VtZW50VHlwZSkucmVzdWx0c1xuICAgICAgICB9KSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChxdWVyeUNvbmZpZy5zdWdnZXN0aW9ucykge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcInNlYXJjaC11aS1zaXRlLXNlYXJjaC1jb25uZWN0b3I6IFNpdGUgU2VhcmNoIGRvZXMgc3VwcG9ydCBxdWVyeSBzdWdnZXN0aW9ucyBvbiBhdXRvY29tcGxldGVcIlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2l0ZVNlYXJjaEFQSUNvbm5lY3RvcjtcbiJdfQ==