require('source-map-support').install()
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _http = __webpack_require__(2);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _fs = __webpack_require__(4);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _bodyParser = __webpack_require__(5);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _cors = __webpack_require__(6);
	
	var _cors2 = _interopRequireDefault(_cors);
	
	var _renderServer = __webpack_require__(7);
	
	var _router = __webpack_require__(66);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _renderServiceRouter = __webpack_require__(72);
	
	var _renderServiceRouter2 = _interopRequireDefault(_renderServiceRouter);
	
	var _server = __webpack_require__(73);
	
	var _morgan = __webpack_require__(74);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _express2.default)();
	
	// Express configuration and middlewares
	if (_server.NODE_ENV !== 'production') {
	  app.use((0, _cors2.default)());
	}
	app.use(_express2.default.static('dist/public'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _morgan2.default)('combined'));
	
	app.use(_renderServer.renderHtml);
	app.use('*', _renderServiceRouter2.default);
	
	// Turn it into an HTTP server
	var server = _http2.default.createServer(app);
	
	server.on('error', function (e) {
	  if (e.code == 'EADDRINUSE') {
	    _fs2.default.unlinkSync(_server.PORT);
	    server.listen(_server.PORT);
	  }
	});
	
	server.listen(_server.PORT);
	// eslint-disable-next-line no-console
	console.log('Server is listening on ' + _server.PORT);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderJson = renderJson;
	exports.renderHtml = renderHtml;
	
	var _server = __webpack_require__(8);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _createRenderer = __webpack_require__(9);
	
	var _createRenderer2 = _interopRequireDefault(_createRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var render = (0, _createRenderer2.default)(_server2.default);
	
	exports.default = render;
	function renderJson(_req, res, next) {
	  res.render = function (name, data) {
	    return res.json({ name: name, data: data });
	  };
	  next();
	}
	
	function renderHtml(_req, res, next) {
	  res.render = function (name, data) {
	    return res.send(render(name, data));
	  };
	  next();
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _objectAssign = __webpack_require__(10);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _redux = __webpack_require__(11);
	
	var _reduxThunk = __webpack_require__(12);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reactReduxUniversalRender = __webpack_require__(13);
	
	var _reactReduxUniversalRender2 = _interopRequireDefault(_reactReduxUniversalRender);
	
	var _views = __webpack_require__(14);
	
	var _reducer = __webpack_require__(58);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign = _objectAssign2.default; // BEFORE WE CONTINUE, WE NEED TO FIX A V8 BUG
	// https://github.com/facebook/react/issues/6451
	
	
	function createReduxStore(props) {
	  return (0, _redux.createStore)(_reducer2.default, props, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	}
	
	var createRenderer = (0, _reactReduxUniversalRender2.default)({ getView: _views.get, createReduxStore: createReduxStore });
	
	exports.default = createRenderer;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("object-assign");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-redux-universal-render");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	var req = __webpack_require__(15);
	
	function get(name) {
	  var _name$split = name.split('/'),
	      _name$split2 = _toArray(_name$split),
	      module = _name$split2[0],
	      rest = _name$split2.slice(1);
	
	  var path = [module, 'views', rest].join('/');
	
	  return req('./' + path + '.js').default;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./examples/views/index.js": 16,
		"./home/views/__tests__/edit.js": 35,
		"./home/views/__tests__/index.js": 39,
		"./home/views/__tests__/new.js": 42,
		"./home/views/__tests__/show.js": 44,
		"./home/views/edit.js": 36,
		"./home/views/index.js": 40,
		"./home/views/new.js": 43,
		"./home/views/show.js": 45,
		"./slack_slash_commands/views/__tests__/edit.js": 47,
		"./slack_slash_commands/views/__tests__/index.js": 51,
		"./slack_slash_commands/views/__tests__/new.js": 54,
		"./slack_slash_commands/views/__tests__/show.js": 56,
		"./slack_slash_commands/views/edit.js": 48,
		"./slack_slash_commands/views/index.js": 52,
		"./slack_slash_commands/views/new.js": 55,
		"./slack_slash_commands/views/show.js": 57
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 15;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Index;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Tabs = __webpack_require__(18);
	
	var _Tabs2 = _interopRequireDefault(_Tabs);
	
	var _KitchenSink = __webpack_require__(19);
	
	var _KitchenSink2 = _interopRequireDefault(_KitchenSink);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _StateSpy = __webpack_require__(31);
	
	var _StateSpy2 = _interopRequireDefault(_StateSpy);
	
	var _TestMount = __webpack_require__(32);
	
	var _TestMount2 = _interopRequireDefault(_TestMount);
	
	var _CounterIncrementButton = __webpack_require__(33);
	
	var _CounterIncrementButton2 = _interopRequireDefault(_CounterIncrementButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Index() {
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      'Examples'
	    ),
	    _react2.default.createElement(
	      _Tabs2.default.Stateful,
	      null,
	      _react2.default.createElement(
	        _Tabs2.default.Item,
	        { contentKey: 'mount', title: 'Mount' },
	        _react2.default.createElement(_TestMount2.default, null)
	      ),
	      _react2.default.createElement(
	        _Tabs2.default.Item,
	        { contentKey: 'redux', title: 'Redux' },
	        _react2.default.createElement(_StateSpy2.default, null),
	        _react2.default.createElement(_CounterIncrementButton2.default, null)
	      ),
	      _react2.default.createElement(
	        _Tabs2.default.Item,
	        { contentKey: 'core', title: 'Core' },
	        _react2.default.createElement(_KitchenSink2.default, null)
	      ),
	      _react2.default.createElement(
	        _Tabs2.default.Item,
	        { contentKey: 'site', title: 'Site' },
	        _react2.default.createElement(
	          'p',
	          null,
	          'Put examples of site-specific components here'
	        )
	      )
	    )
	  );
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/Tabs");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/KitchenSink");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(21);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _TopBar = __webpack_require__(22);
	
	var _TopBar2 = _interopRequireDefault(_TopBar);
	
	var _grid = __webpack_require__(29);
	
	var _reactRedux = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function MainLayout(_ref) {
	  var title = _ref.title,
	      children = _ref.children;
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_reactHelmet2.default, {
	      defaultTitle: title,
	      link: [{ href: '/css/site.css', rel: 'stylesheet' }],
	      script: [{ src: '/js/client.js', type: 'text/javascript' }]
	    }),
	    _react2.default.createElement(
	      _grid.Row,
	      null,
	      _react2.default.createElement(
	        _grid.Col,
	        { small: 12 },
	        children
	      )
	    )
	  );
	}
	
	MainLayout.propTypes = {
	  title: _react.PropTypes.string,
	  children: _react.PropTypes.node
	};
	
	exports.default = (0, _reactRedux.connect)(function (_ref2) {
	  var data = _ref2.data;
	  return { title: data.title };
	})(MainLayout);

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = SiteTopBar;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TopBar = __webpack_require__(23);
	
	var _TopBar2 = _interopRequireDefault(_TopBar);
	
	var _Menu = __webpack_require__(24);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _QuickSearch = __webpack_require__(25);
	
	var _QuickSearch2 = _interopRequireDefault(_QuickSearch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function SiteTopBar(_ref) {
	  var title = _ref.title;
	
	  return _react2.default.createElement(
	    _TopBar2.default,
	    null,
	    _react2.default.createElement(
	      _TopBar2.default.Title,
	      null,
	      _react2.default.createElement(
	        'strong',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: '/' },
	          title
	        )
	      )
	    ),
	    _react2.default.createElement(
	      _TopBar2.default.Right,
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: 'https://github.com/revelrylabs/timekeeper' },
	        'Contribute on Github'
	      )
	    )
	  );
	}
	
	SiteTopBar.propTypes = {
	  title: _react.PropTypes.string
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/TopBar");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/Menu");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = QuickSearch;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Icon = __webpack_require__(27);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _forms = __webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function QuickSearch() {
	  return _react2.default.createElement(
	    _forms.Form,
	    null,
	    _react2.default.createElement(
	      _forms.InputGroup,
	      { style: { margin: 0 } },
	      _react2.default.createElement(
	        _forms.InputGroup.Field,
	        null,
	        _react2.default.createElement(_forms.Input, { type: 'text', name: 'q', placeholder: 'Search' })
	      ),
	      _react2.default.createElement(
	        _forms.InputGroup.Button,
	        null,
	        _react2.default.createElement(
	          _Button2.default,
	          null,
	          _react2.default.createElement(_Icon2.default, { i: 'search' })
	        )
	      )
	    )
	  );
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/Button");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/Icon");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/forms");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/grid");

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.StateSpy = StateSpy;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(30);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function StateSpy(props) {
	  return _react2.default.createElement(
	    'pre',
	    null,
	    JSON.stringify(props, null, '  ')
	  );
	}
	exports.default = (0, _reactRedux.connect)(function (state) {
	  return state;
	})(StateSpy);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TestMount = function (_Component) {
	  _inherits(TestMount, _Component);
	
	  function TestMount() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, TestMount);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TestMount.__proto__ || Object.getPrototypeOf(TestMount)).call.apply(_ref, [this].concat(args))), _this), _this.state = { isMounted: false }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(TestMount, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ isMounted: true });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'p',
	        null,
	        this.state.isMounted ? 'Mounted.' : 'Not mounted.'
	      );
	    }
	  }]);
	
	  return TestMount;
	}(_react.Component);
	
	exports.default = TestMount;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CounterIncrementButton = CounterIncrementButton;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _reactRedux = __webpack_require__(30);
	
	var _counter = __webpack_require__(34);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function CounterIncrementButton(_ref) {
	  var onClick = _ref.onClick,
	      counter = _ref.counter;
	
	  return _react2.default.createElement(
	    _Button2.default,
	    { onClick: onClick },
	    counter
	  );
	}
	
	CounterIncrementButton.propTypes = {
	  onClick: _react.PropTypes.func.isRequired,
	  counter: _react.PropTypes.number.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(function (_ref2) {
	  var data = _ref2.data;
	  return { counter: data.counter };
	}, { onClick: _counter.increment })(CounterIncrementButton);

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.increment = increment;
	exports.decrement = decrement;
	
	exports.default = function () {
	  var counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var _ref = arguments[1];
	  var type = _ref.type;
	
	  switch (type) {
	    case TYPE_INCREMENT:
	      return counter + 1;
	    case TYPE_DECREMENT:
	      return counter - 1;
	    default:
	      return counter;
	  }
	};
	
	var NAME = exports.NAME = 'counter';
	var TYPE_INCREMENT = exports.TYPE_INCREMENT = 'counter:inc';
	var TYPE_DECREMENT = exports.TYPE_DECREMENT = 'counter:dec';
	
	function increment() {
	  return { type: TYPE_INCREMENT };
	}
	
	function decrement() {
	  return { type: TYPE_DECREMENT };
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _edit = __webpack_require__(36);
	
	var _edit2 = _interopRequireDefault(_edit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var home = {
	    id: 1,
	    name: 'home 1'
	  };
	
	  return _react2.default.createElement(_edit2.default, { home: home });
	}
	
	describe('homes view: edit', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Edit;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Form = __webpack_require__(37);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Edit(_ref) {
	  var home = _ref.home;
	  var id = home.id;
	
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: '/homes' },
	        'homes'
	      ),
	      ' : ',
	      _react2.default.createElement(
	        'a',
	        { href: '/homes/' + id },
	        id
	      ),
	      ' : edit'
	    ),
	    _react2.default.createElement(_Form2.default, {
	      home: home,
	      method: 'post',
	      action: '/homes/' + id
	    })
	  );
	}
	
	Edit.propTypes = {
	  home: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Form;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _forms = __webpack_require__(28);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Form(_ref) {
	  var home = _ref.home,
	      props = _objectWithoutProperties(_ref, ['home']);
	
	  return _react2.default.createElement(
	    'form',
	    props,
	    _react2.default.createElement(_forms.Input.Stack, {
	      label: 'name',
	      name: 'homes[name]',
	      defaultValue: home.name
	    }),
	    _react2.default.createElement(
	      _Button2.default,
	      null,
	      'Save'
	    )
	  );
	}
	
	Form.propTypes = {
	  home: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var Shape = {
	  id: _react.PropTypes.number,
	  name: _react.PropTypes.string
	};
	
	exports.default = Shape;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(40);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var homes = [{ id: 1, name: 'home 1' }, { id: 2, name: 'home 2' }];
	
	  return _react2.default.createElement(_index2.default, { homes: homes });
	}
	
	describe('homes view: index', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Index;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _ListItem = __webpack_require__(41);
	
	var _ListItem2 = _interopRequireDefault(_ListItem);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function renderListItem(home) {
	  var id = home.id;
	
	
	  return _react2.default.createElement(_ListItem2.default, {
	    key: id,
	    home: home
	  });
	}
	
	function Index(_ref) {
	  var homes = _ref.homes;
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      'homes'
	    ),
	    _react2.default.createElement(
	      _Button2.default,
	      { href: '/homes/new' },
	      'Create a new home'
	    ),
	    homes.map(renderListItem)
	  );
	}
	
	Index.propTypes = {
	  homes: _react.PropTypes.arrayOf(_react.PropTypes.shape(_shape2.default)).isRequired
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ListItem;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ListItem(_ref) {
	  var home = _ref.home;
	  var id = home.id,
	      name = home.name;
	
	
	  return _react2.default.createElement(
	    'li',
	    null,
	    _react2.default.createElement(
	      'a',
	      { href: '/homes/' + id },
	      name
	    )
	  );
	}
	
	ListItem.propTypes = {
	  home: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _new = __webpack_require__(43);
	
	var _new2 = _interopRequireDefault(_new);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var home = {
	    id: 1,
	    name: 'home 1'
	  };
	
	  return _react2.default.createElement(_new2.default, { home: home });
	}
	
	describe('homes view: new', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = New;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Form = __webpack_require__(37);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function New(_ref) {
	  var home = _ref.home;
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: '/homes' },
	        'homes'
	      ),
	      ' : new'
	    ),
	    _react2.default.createElement(_Form2.default, {
	      home: home,
	      method: 'post',
	      action: '/homes'
	    })
	  );
	}
	
	New.propTypes = {
	  home: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _show = __webpack_require__(45);
	
	var _show2 = _interopRequireDefault(_show);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var home = {
	    id: 1,
	    name: 'home 1'
	  };
	
	  return _react2.default.createElement(_show2.default, { home: home });
	}
	
	describe('homes view: show', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Show;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Callout = __webpack_require__(46);
	
	var _Callout2 = _interopRequireDefault(_Callout);
	
	var _shape = __webpack_require__(38);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Show() {
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      { className: 'text-center' },
	      'Welcome to timekeeper.'
	    ),
	    _react2.default.createElement(
	      'p',
	      { className: 'text-center' },
	      'This thing is a slack bot, so there\'s really no web UI yet.'
	    )
	  );
	}
	
	Show.propTypes = {};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = require("revelry-components/lib/Callout");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _edit = __webpack_require__(48);
	
	var _edit2 = _interopRequireDefault(_edit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var slackslashcommand = {
	    id: 1,
	    name: 'slackslashcommand 1'
	  };
	
	  return _react2.default.createElement(_edit2.default, { slackslashcommand: slackslashcommand });
	}
	
	describe('slackslashcommands view: edit', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Edit;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Form = __webpack_require__(49);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Edit(_ref) {
	  var slackslashcommand = _ref.slackslashcommand;
	  var id = slackslashcommand.id;
	
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: '/slackslashcommands' },
	        'slackslashcommands'
	      ),
	      ' : ',
	      _react2.default.createElement(
	        'a',
	        { href: '/slackslashcommands/' + id },
	        id
	      ),
	      ' : edit'
	    ),
	    _react2.default.createElement(_Form2.default, {
	      slackslashcommand: slackslashcommand,
	      method: 'post',
	      action: '/slackslashcommands/' + id
	    })
	  );
	}
	
	Edit.propTypes = {
	  slackslashcommand: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Form;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _forms = __webpack_require__(28);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function Form(_ref) {
	  var slackslashcommand = _ref.slackslashcommand,
	      props = _objectWithoutProperties(_ref, ['slackslashcommand']);
	
	  return _react2.default.createElement(
	    'form',
	    props,
	    _react2.default.createElement(_forms.Input.Stack, {
	      label: 'name',
	      name: 'slackslashcommands[name]',
	      defaultValue: slackslashcommand.name
	    }),
	    _react2.default.createElement(
	      _Button2.default,
	      null,
	      'Save'
	    )
	  );
	}
	
	Form.propTypes = {
	  slackslashcommand: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var Shape = {
	  id: _react.PropTypes.number,
	  name: _react.PropTypes.string
	};
	
	exports.default = Shape;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(52);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var slackslashcommands = [{ id: 1, name: 'slackslashcommand 1' }, { id: 2, name: 'slackslashcommand 2' }];
	
	  return _react2.default.createElement(_index2.default, { slackslashcommands: slackslashcommands });
	}
	
	describe('slackslashcommands view: index', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Index;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _ListItem = __webpack_require__(53);
	
	var _ListItem2 = _interopRequireDefault(_ListItem);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function renderListItem(slackslashcommand) {
	  var id = slackslashcommand.id;
	
	
	  return _react2.default.createElement(_ListItem2.default, {
	    key: id,
	    slackslashcommand: slackslashcommand
	  });
	}
	
	function Index(_ref) {
	  var slackslashcommands = _ref.slackslashcommands;
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      'slackslashcommands'
	    )
	  );
	}
	
	Index.propTypes = {
	  slackslashcommands: _react.PropTypes.arrayOf(_react.PropTypes.shape(_shape2.default)).isRequired
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ListItem;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ListItem(_ref) {
	  var slackslashcommand = _ref.slackslashcommand;
	  var id = slackslashcommand.id,
	      name = slackslashcommand.name;
	
	
	  return _react2.default.createElement(
	    'li',
	    null,
	    _react2.default.createElement(
	      'a',
	      { href: '/slackslashcommands/' + id },
	      name
	    )
	  );
	}
	
	ListItem.propTypes = {
	  slackslashcommand: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _new = __webpack_require__(55);
	
	var _new2 = _interopRequireDefault(_new);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var slackslashcommand = {
	    id: 1,
	    name: 'slackslashcommand 1'
	  };
	
	  return _react2.default.createElement(_new2.default, { slackslashcommand: slackslashcommand });
	}
	
	describe('slackslashcommands view: new', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = New;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Form = __webpack_require__(49);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function New(_ref) {
	  var slackslashcommand = _ref.slackslashcommand;
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: '/slackslashcommands' },
	        'slackslashcommands'
	      ),
	      ' : new'
	    ),
	    _react2.default.createElement(_Form2.default, {
	      slackslashcommand: slackslashcommand,
	      method: 'post',
	      action: '/slackslashcommands'
	    })
	  );
	}
	
	New.propTypes = {
	  slackslashcommand: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _show = __webpack_require__(57);
	
	var _show2 = _interopRequireDefault(_show);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createComponentWithValidProps() {
	  var slackslashcommand = {
	    id: 1,
	    name: 'slackslashcommand 1'
	  };
	
	  return _react2.default.createElement(_show2.default, { slackslashcommand: slackslashcommand });
	}
	
	describe('slackslashcommands view: show', function () {
	  it('can shallow render with valid props', function () {
	    shallow(createComponentWithValidProps());
	  });
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Show;
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(26);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Layout = __webpack_require__(20);
	
	var _Layout2 = _interopRequireDefault(_Layout);
	
	var _Callout = __webpack_require__(46);
	
	var _Callout2 = _interopRequireDefault(_Callout);
	
	var _shape = __webpack_require__(50);
	
	var _shape2 = _interopRequireDefault(_shape);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Show(_ref) {
	  var slackslashcommand = _ref.slackslashcommand;
	  var id = slackslashcommand.id;
	
	
	  return _react2.default.createElement(
	    _Layout2.default,
	    null,
	    _react2.default.createElement(
	      'h1',
	      null,
	      _react2.default.createElement(
	        'a',
	        { href: '/slackslashcommands' },
	        'slackslashcommands'
	      ),
	      ' : ',
	      _react2.default.createElement(
	        'a',
	        { href: '/slackslashcommands/' + id },
	        id
	      )
	    ),
	    _react2.default.createElement(
	      _Callout2.default,
	      { secondary: true },
	      _react2.default.createElement(
	        'pre',
	        null,
	        JSON.stringify(slackslashcommand, null, '  ')
	      )
	    ),
	    _react2.default.createElement(
	      _Button2.default,
	      { href: '/slackslashcommands/' + id + '/edit' },
	      'Edit'
	    )
	  );
	}
	
	Show.propTypes = {
	  slackslashcommand: _react.PropTypes.shape(_shape2.default).isRequired
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = reducer;
	
	var _redux = __webpack_require__(11);
	
	var _reducers = __webpack_require__(59);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reduceData = (0, _redux.combineReducers)(_reducers2.default);
	
	// This is a great place to perform custom operations on the full {name, data}
	// state object
	function reduceEverything(state, _action) {
	  return state;
	}
	
	function reducer(prevState, action) {
	  var state = prevState;
	  var data = reduceData(state.data, action);
	
	  if (data !== state.data) {
	    state = _extends({}, state, { data: data });
	  }
	
	  return reduceEverything(state, action);
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var req = __webpack_require__(60);
	var reducers = {};
	
	req.keys().forEach(function (key) {
	  var name = key.match(/^\.\/[^\/]+\/state\/([^\/]+)\.js$/)[1];
	  var reducer = req(key).default;
	
	  if (name && reducer) {
	    if (reducers[name]) {
	      throw new Error('REDUCER AUTOLOAD: Duplicate state module name \'' + name + '\'');
	    }
	    reducers[name] = reducer;
	  } else {
	    // eslint-disable-next-line no-console
	    console.warn('REDUCER AUTOLOAD: Skipping state module \'' + key + '\' because it did not define a default export');
	  }
	});
	
	exports.default = reducers;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./examples/state/counter.js": 34,
		"./home/state/home.js": 61,
		"./home/state/homes.js": 62,
		"./shared/state/title.js": 63,
		"./slack_slash_commands/state/slackslashcommand.js": 64,
		"./slack_slash_commands/state/slackslashcommands.js": 65
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 60;


/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = homeReducer;
	function homeReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _ref = arguments[1];
	  var type = _ref.type;
	
	  switch (type) {
	    default:
	      return state;
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = homesReducer;
	function homesReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var _ref = arguments[1];
	  var type = _ref.type;
	
	  switch (type) {
	    default:
	      return state;
	  }
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Timekeeper';
	
	  return state;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = slackslashcommandReducer;
	function slackslashcommandReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _ref = arguments[1];
	  var type = _ref.type;
	
	  switch (type) {
	    default:
	      return state;
	  }
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = slackslashcommandsReducer;
	function slackslashcommandsReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var _ref = arguments[1];
	  var type = _ref.type;
	
	  switch (type) {
	    default:
	      return state;
	  }
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _routes = __webpack_require__(67);
	
	var router = new _express.Router();
	
	router.use('/', (0, _routes.get)('home'));
	
	(0, _routes.names)().forEach(function (name) {
	  return router.use('/' + name, (0, _routes.get)(name));
	});
	
	exports.default = router;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.names = names;
	exports.get = get;
	var req = __webpack_require__(68);
	
	function names() {
	  return req.keys().map(function (key) {
	    return key.substring(2, key.length - 10);
	  });
	}
	
	function get(name) {
	  return req('./' + name + '/routes.js').default;
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./examples/routes.js": 69,
		"./home/routes.js": 70,
		"./slack_slash_commands/routes.js": 71
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 68;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var router = new _express.Router();
	
	router.get('/', function (req, res) {
	  res.render('examples/index');
	});
	
	exports.default = router;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ACTUAL ROUTES START HERE
	
	
	var _express = __webpack_require__(3);
	
	var router = new _express.Router();
	
	// THIS CODE SECTION IS FOR QUICK MOCKING
	// DELETE IT WHEN YOU HAVE REAL BACKING DATA
	/* eslint-disable */
	var nextFakeId = 0;
	var fakes = [];
	var fakesById = {};
	function rebuildFakesArray() {
	  return fakes = Object.keys(fakesById).sort(function (a, b) {
	    return a - b;
	  }).map(function (id) {
	    return fakesById[id];
	  });
	}
	function findFake(id) {
	  return fakesById[id];
	}
	function createFake() {
	  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var id = ++nextFakeId;
	  var name = 'home ' + id;
	  var fake = fakesById[id] = _extends({
	    name: name
	  }, attrs, {
	    id: id
	  });
	  rebuildFakesArray();
	  return fake;
	}
	function updateFake(id) {
	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var oldAttrs = fakesById[id];
	  var fake = fakesById[id] = _extends({}, oldAttrs, attrs);
	  rebuildFakesArray();
	  return fake;
	}
	function deleteFake(id) {
	  delete fakesById[id];
	  rebuildFakesArray();
	  return null;
	}
	for (var i = 0; i < 10; i++) {
	  createFake();
	}
	/* eslint-enable */
	
	// index
	router.get('/', function (req, res) {
	  res.render('homes/index', {
	    homes: fakes
	  });
	});
	
	// new
	router.get('/new', function (req, res) {
	  var home = req.body.home || {};
	
	  res.render('homes/new', {
	    home: home
	  });
	});
	
	// show
	router.get('/:id', function (req, res) {
	  res.render('homes/show', {
	    home: findFake(req.params.id)
	  });
	});
	
	// edit
	router.get('/:id/edit', function (req, res) {
	  res.render('homes/edit', {
	    home: findFake(req.params.id)
	  });
	});
	
	// create
	router.post('/', function (req, res) {
	  var attrs = req.body.homes || {};
	
	  var _createFake = createFake(attrs),
	      id = _createFake.id;
	
	  res.redirect('/homes/' + id);
	});
	
	// update
	router.post('/:id', function (req, res) {
	  var attrs = req.body.homes || {};
	
	  updateFake(req.params.id, attrs);
	  res.redirect('/homes/' + req.params.id);
	});
	
	// delete
	router.delete('/:id', function (req, res) {
	  deleteFake(req.params.id);
	  res.redirect('/homes');
	});
	
	exports.default = router;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ACTUAL ROUTES START HERE
	
	
	var _express = __webpack_require__(3);
	
	var router = new _express.Router();
	
	// THIS CODE SECTION IS FOR QUICK MOCKING
	// DELETE IT WHEN YOU HAVE REAL BACKING DATA
	/* eslint-disable */
	var nextFakeId = 0;
	var fakes = [];
	var fakesById = {};
	function rebuildFakesArray() {
	  return fakes = Object.keys(fakesById).sort(function (a, b) {
	    return a - b;
	  }).map(function (id) {
	    return fakesById[id];
	  });
	}
	function findFake(id) {
	  return fakesById[id];
	}
	function createFake() {
	  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var id = ++nextFakeId;
	  var name = 'slackslashcommand ' + id;
	  var fake = fakesById[id] = _extends({
	    name: name
	  }, attrs, {
	    id: id
	  });
	  rebuildFakesArray();
	  return fake;
	}
	function updateFake(id) {
	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var oldAttrs = fakesById[id];
	  var fake = fakesById[id] = _extends({}, oldAttrs, attrs);
	  rebuildFakesArray();
	  return fake;
	}
	function deleteFake(id) {
	  delete fakesById[id];
	  rebuildFakesArray();
	  return null;
	}
	for (var i = 0; i < 10; i++) {
	  createFake();
	}
	/* eslint-enable */
	
	// index
	router.get('/', function (req, res) {
	  res.render('slackslashcommands/index', {
	    slackslashcommands: fakes
	  });
	});
	
	// new
	router.get('/new', function (req, res) {
	  var slackslashcommand = req.body.slackslashcommand || {};
	
	  res.render('slackslashcommands/new', {
	    slackslashcommand: slackslashcommand
	  });
	});
	
	// show
	router.get('/:id', function (req, res) {
	  res.render('slackslashcommands/show', {
	    slackslashcommand: findFake(req.params.id)
	  });
	});
	
	// edit
	router.get('/:id/edit', function (req, res) {
	  res.render('slackslashcommands/edit', {
	    slackslashcommand: findFake(req.params.id)
	  });
	});
	
	// create
	router.post('/', function (req, res) {
	  var attrs = req.body.slackslashcommands || {};
	
	  var _createFake = createFake(attrs),
	      id = _createFake.id;
	
	  res.redirect('/slackslashcommands/' + id);
	});
	
	// update
	router.post('/:id', function (req, res) {
	  var attrs = req.body.slackslashcommands || {};
	
	  updateFake(req.params.id, attrs);
	  res.redirect('/slackslashcommands/' + req.params.id);
	});
	
	// delete
	router.delete('/:id', function (req, res) {
	  deleteFake(req.params.id);
	  res.redirect('/slackslashcommands');
	});
	
	exports.default = router;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _views = __webpack_require__(14);
	
	var router = new _express.Router();
	
	router.post('*', function (req, res) {
	  var _req$body = req.body,
	      name = _req$body.name,
	      data = _req$body.data;
	
	
	  res.render(name, data || {});
	});
	
	router.get('*', function (req, res) {
	  var name = req.originalUrl.slice(1);
	  var data = req.body;
	
	  try {
	    var _view = (0, _views.get)(name);
	    res.status(200).send('Ok');
	  } catch (e) {
	    if (e.toString().indexOf('Cannot find module')) {
	      res.status(404).send('Not found');
	    } else {
	      throw e;
	    }
	  }
	});
	
	exports.default = router;

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable no-process-env */
	var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';
	var PORT = exports.PORT = process.env.PORT || 8000;

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map