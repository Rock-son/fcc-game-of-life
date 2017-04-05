webpackJsonp([0],{

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _buttonContainer = __webpack_require__(199);

var _buttonContainer2 = _interopRequireDefault(_buttonContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.ROWS = 45, _this.COLS = 60;
        _this.NR_CELLS = _this.ROWS * _this.COLS;
        _this.GAME_INITIALIZED = false;
        _this.isGo = false;
        _this.speed = 600;
        _this.CELL_ARRAY = Array.apply(null, Array(_this.NR_CELLS)).map(Number.prototype.valueOf, 0);
        _this.state = { cellArr: _this.CELL_ARRAY.slice(0), generation: 0 };
        _this._generateCellArray = _this._generateCellArray.bind(_this);
        _this._runGameOfLife = _this._runGameOfLife.bind(_this);
        _this._handleBtnClick = _this._handleBtnClick.bind(_this);
        _this._activateCell = _this._activateCell.bind(_this);
        _this._handleChange = _this._handleChange.bind(_this);
        _this._changeSpeed = _this._changeSpeed.bind(_this);
        return _this;
    }

    _createClass(Container, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.interval);
        }
    }, {
        key: '_clearInterval',
        value: function _clearInterval() {
            clearInterval(this.interval);
        }
        // randomize starting cell array (only if no user input)

    }, {
        key: '_generateCellArray',
        value: function _generateCellArray() {
            var min = 2,
                max = 7;
            this.CELL_ARRAY.length = 0; // most efficient way to reset array to []!
            var arrSpan = Math.floor(Math.random() * (max - min) + min);
            for (var i = 0; i < this.NR_CELLS; i++) {
                if (i !== arrSpan) {
                    this.CELL_ARRAY.push(0);
                } else {
                    this.CELL_ARRAY.push(1);
                    var rand = Math.floor(Math.random() * (max - min) + min);
                    rand === 0 ? arrSpan++ : arrSpan += rand;
                }
            }
        }
        // main function: checks for sum of active neighbouring cells

    }, {
        key: '_runGameOfLife',
        value: function _runGameOfLife() {
            var _this2 = this;

            var self = this;
            var change = false;
            self.tempArr = this.CELL_ARRAY.slice(0);

            // for each cell in vicinity, make neighbours query

            var _loop = function _loop(i) {
                var neighbours = countNeighbours(i);
                var cellValue = self.tempArr[i];
                // IF MAKING A QUERY ON A LIVE ONE
                // 1.) 2.) 3.) Any live cell with fewer than two or more than 3 live neighbours dies, cells with 2 or 3 neighbours live on
                // 4.) Any dead cell with exactly three live neighbours becomes a live cell
                if (cellValue === 1 & (neighbours < 2 || neighbours > 3)) {
                    (function () {
                        self.CELL_ARRAY.splice(i, 1, 0);
                    })();
                    change = true;
                } else if (cellValue === 0 && neighbours === 3) {
                    (function () {
                        self.CELL_ARRAY.splice(i, 1, 1);
                    })();
                    change = true;
                }
                // check if it's last row and if any changes continue counting - if not, stop immediatelly
                if (i + 1 === _this2.NR_CELLS) {
                    if (self.tempArr.length === self.CELL_ARRAY.length && !change) {
                        return {
                            v: void 0
                        };
                    } else {
                        self.setState({ cellArr: self.CELL_ARRAY.slice(0), generation: self.state.generation + 1 });
                    }
                }
            };

            for (var i = 0; i < this.NR_CELLS; i++) {
                var _ret = _loop(i);

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
            function countNeighbours(index) {
                var val = 0;
                /* safeCheck every CELL
                  1. before and after 
                  2. 3 cells adjacent in the top: -81, -80, -79       -> not valid for first row!
                  3. 3 cells adjacent in the bottom: +79, +80, +81    -> not valid for last row!
                */
                // count for the left edge, seeping into the right one
                if (index % self.COLS === 0) {
                    val = safeCheck(index - 1 + self.COLS) + safeCheck(index + 1) + safeCheck(index + (self.COLS - 1) + self.COLS) + safeCheck(index + self.COLS) + safeCheck(index + self.COLS + 1) + safeCheck(index - self.COLS + 1) + safeCheck(index - self.COLS) + safeCheck(index - (self.COLS + 1) + self.COLS);
                    return val;
                }
                // count for the right edge, seeping into the left one
                else if (index % self.COLS === self.COLS - 1) {
                        val = safeCheck(index - 1) + safeCheck(index + 1 - self.COLS) + safeCheck(index + self.COLS - 1) + safeCheck(index + self.COLS) + safeCheck(index + (self.COLS + 1) - self.COLS) + safeCheck(index - (self.COLS + 1)) + safeCheck(index - self.COLS) + safeCheck(index - (self.COLS - 1) - self.COLS);
                        return val;
                    }
                // count for any cells in between
                val = safeCheck(index - 1) + safeCheck(index + 1) + safeCheck(index + self.COLS - 1) + safeCheck(index + self.COLS) + safeCheck(index + self.COLS + 1) + safeCheck(index - self.COLS + 1) + safeCheck(index - self.COLS) + safeCheck(index - self.COLS - 1);
                return val;
            }
            // check array values for concerned indexes
            function safeCheck(index) {

                if (index < 0) {
                    return self.tempArr[self.NR_CELLS + index];
                } // for every index in first row
                if (index >= self.NR_CELLS) {
                    return self.tempArr[index - self.NR_CELLS];
                } // for every index in last row
                return self.tempArr[index]; // for every other index (cell)
            }
        }
        // handle click from main buttons

    }, {
        key: '_handleBtnClick',
        value: function _handleBtnClick(event) {
            if (event.target.id === 'run') {
                if (this.interval) {
                    clearInterval(this.Interval);
                }
                var nrActiveCells = this.state.cellArr.reduce(function (prev, curr) {
                    return +curr + +prev;
                }, []);
                // handle start of the game if there is NO user input (generate random array)...
                if (!this.GAME_INITIALIZED && nrActiveCells === 0) {
                    this.GAME_INITIALIZED = true;
                    this._generateCellArray();
                    this.setState({ cellArr: this.CELL_ARRAY.slice(0), generation: 0 });
                }
                // ... otherwise work with user input array (nrActiveCells  > 0) && game is stopped (!this.isGo)
                if (!this.isGo) {
                    this.GAME_INITIALIZED = !this.GAME_INITIALIZED ? !this.GAME_INITIALIZED : this.GAME_INITIALIZED;
                    this.interval = setInterval(this._runGameOfLife, this.speed);
                    this.isGo = true;
                }
                // pause the game
            } else if (event.target.id === 'pause') {
                clearInterval(this.interval);
                this.isGo = false;
                // clear every variable start values
            } else if (event.target.id === 'clear') {
                this.CELL_ARRAY.length = 0;
                this.tempArr.length = 0;
                this.CELL_ARRAY = Array.apply(null, Array(this.NR_CELLS)).map(Number.prototype.valueOf, 0);
                this.setState({
                    cellArr: this.CELL_ARRAY.slice(0),
                    generation: 0
                });
                this.GAME_INITIALIZED = false;
                clearInterval(this.interval);
                this.isGo = false;
            }
        }
    }, {
        key: '_activateCell',
        value: function _activateCell(event) {
            var doc = document.getElementById(event.target.id);
            // insert clicked/dragged values into array
            if (doc.className.indexOf('active') === -1) {
                this.CELL_ARRAY.splice(+event.target.id, 1, 1);
            } else {
                // only remove values if clicked, not dragged
                event.type === 'click' ? this.CELL_ARRAY.splice(+event.target.id, 1, 0) : '';
            }
            this.setState({ cellArr: this.CELL_ARRAY.slice(0) });
        }
    }, {
        key: '_returnClass',
        value: function _returnClass(index, val) {
            if (this.tempArr == null) {
                this.tempArr = this.CELL_ARRAY.slice(0);
            }
            if (this.tempArr[index] === val && val === 1) {
                return 'cell active old';
            } else if (val === 1) {
                return 'cell active';
            } else {
                return 'cell';
            }
        }
        // handles state of select menu for the size

    }, {
        key: '_handleChange',
        value: function _handleChange(size) {
            clearInterval(this.interval);
            var sizeArr = size.split('x');
            if (this.ROWS === sizeArr[0]) {
                return;
            }
            this.ROWS = +sizeArr[0];
            this.COLS = +sizeArr[1];
            this.NR_CELLS = this.ROWS * this.COLS;
            this.GAME_INITIALIZED = false;
            this.isGo = false;
            this.CELL_ARRAY.length = 0;
            this.tempArr.length = 0;
            this.CELL_ARRAY = Array.apply(null, Array(this.NR_CELLS)).map(Number.prototype.valueOf, 0);
            this.setState({
                cellArr: this.CELL_ARRAY.slice(0),
                generation: 0
            });
        }
    }, {
        key: '_changeSpeed',
        value: function _changeSpeed(speed) {
            if (this.interval == null || !this.isGo) {
                this.speed = speed || this.speed;
            } else {
                clearInterval(this.interval);
                this.speed = speed || this.speed;
                this.interval = setInterval(this._runGameOfLife, this.speed);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var cellStyle = {};
            if (this.NR_CELLS === 2700) {
                cellStyle = { 'height': '15px', 'width': '15px' };
            } else {
                cellStyle = { 'height': '12px', 'width': '12px' };
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_buttonContainer2.default, { gen: this.state.generation, selectMenuChange: this._handleChange, handleBtnClick: this._handleBtnClick, size: [this.ROWS, this.COLS], changeSpeed: this._changeSpeed, speed: this.speed, clearInterval: this._clearInterval }),
                _react2.default.createElement(
                    'div',
                    { id: 'playground' },
                    this.state.cellArr.map(function (val, index) {
                        return _react2.default.createElement(_buttonContainer.Cell, { key: index, id: index, className: _this3._returnClass.call(_this3, index, val), onClick: _this3._activateCell, onDragEnter: _this3._activateCell, style: cellStyle });
                    })
                )
            );
        }
    }]);

    return Container;
}(_react2.default.Component);

exports.default = Container;

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = __webpack_require__(126);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = exports.Cell = function Cell(props) {
    return _react2.default.createElement('div', props);
};

var BtnContainer = function (_React$Component) {
    _inherits(BtnContainer, _React$Component);

    function BtnContainer(props) {
        _classCallCheck(this, BtnContainer);

        var _this = _possibleConstructorReturn(this, (BtnContainer.__proto__ || Object.getPrototypeOf(BtnContainer)).call(this, props));

        _this.speed = _this.props.speed;
        _this.slow = 600, _this.medium = 350, _this.fast = 100;
        _this.size = _this.props.size[0] + 'x' + _this.props.size[1];
        _this.state = { option: _this.size, speed: _this.props.speed };
        _this._onInputChange = _this._onInputChange.bind(_this);
        _this.onInputClick = _this.onInputClick.bind(_this);
        return _this;
    }

    _createClass(BtnContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ option: this.size, speed: this.props.speed });
        }
    }, {
        key: '_onInputChange',
        value: function _onInputChange(event) {
            if (event.target.id === 'ctrlSelect') {
                document.getElementById('clear').click();
                this.setState({ option: event.target.value });
                this.props.selectMenuChange(event.target.value);
            } else if (event.target.type === 'radio') {
                this.speed = parseInt(event.target.value);
                this.props.changeSpeed(this.speed);
                this.setState({ speed: this.speed });
            }
        }
    }, {
        key: 'onInputClick',
        value: function onInputClick(event) {
            document.getElementById('pause').click();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                size = _props.size,
                gen = _props.gen,
                handleBtnClick = _props.handleBtnClick,
                change = _props.change,
                props = _objectWithoutProperties(_props, ['size', 'gen', 'handleBtnClick', 'change']);

            return _react2.default.createElement(
                'div',
                { id: 'btnRow' },
                _react2.default.createElement(
                    'div',
                    { className: 'btnBorder' },
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'run', bsStyle: 'primary', bsSize: 'xsmall', onClick: handleBtnClick },
                        'Run'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'pause', bsStyle: 'warning', bsSize: 'xsmall', onClick: handleBtnClick },
                        'Pause'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { id: 'clear', bsStyle: 'danger', bsSize: 'xsmall', onClick: handleBtnClick },
                        'Clear'
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { controlId: 'ctrlSelect', onChange: this._onInputChange, onClick: this.onInputClick },
                    _react2.default.createElement(
                        _reactBootstrap.ControlLabel,
                        null,
                        'Select size:'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.FormControl,
                        { componentClass: 'select', placeholder: 'Select', value: this.state.option },
                        _react2.default.createElement(
                            'option',
                            { value: '45x60' },
                            '45 x 60'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: '55x75' },
                            '55 x 75'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'generation' },
                    'Generation: ' + gen
                ),
                _react2.default.createElement(
                    _reactBootstrap.FormGroup,
                    { id: 'radioGroup', onChange: this._onInputChange },
                    _react2.default.createElement(
                        _reactBootstrap.Radio,
                        { name: 'radio', value: this.slow, inline: true, checked: this.slow === this.speed },
                        'Slow'
                    ),
                    ' ',
                    _react2.default.createElement(
                        _reactBootstrap.Radio,
                        { name: 'radio', value: this.medium, inline: true, checked: this.medium === this.speed },
                        'Medium'
                    ),
                    ' ',
                    _react2.default.createElement(
                        _reactBootstrap.Radio,
                        { name: 'radio', value: this.fast, inline: true, checked: this.fast === this.speed },
                        'Fast'
                    )
                )
            );
        }
    }]);

    return BtnContainer;
}(_react2.default.Component);

exports.default = BtnContainer;

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appContainer = __webpack_require__(197);

var _appContainer2 = _interopRequireDefault(_appContainer);

__webpack_require__(198);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {
    _reactDom2.default.render(_react2.default.createElement(_appContainer2.default, null), document.getElementById('root'));
});

/***/ })

},[200]);