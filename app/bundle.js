(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    list: {},
    subscribe: function subscribe(channelName) {
        var subscription;

        if (!this.list[channelName]) {
            subscription = this.list[channelName] = new Rx.ReplaySubject(1);
        }

        subscription = this.list[channelName];

        return subscription;
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var _master = require('./master.js');

var _master2 = _interopRequireDefault(_master);

var _slave = require('./slave.js');

var _slave2 = _interopRequireDefault(_slave);

var _slave3 = require('./slave2.js');

var _slave4 = _interopRequireDefault(_slave3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var masterIstance, slaveInstance, slave2Instance, enemyInstance;

// application bootstrap
masterIstance = new _master2.default({
    channel: 'alpha'
});

masterIstance.sendMessage();

slaveInstance = new _slave2.default({
    channel: 'alpha'
});

slave2Instance = new _slave4.default({
    channel: 'alpha'
});

enemyInstance = new _slave4.default({
    channel: 'beta',
    name: 'Enemy'
});

// user handle actions
slaveInstance.sendMessage();

enemyInstance.sendMessage();

// destory component
//masterIstance.destroy();

},{"./master.js":3,"./slave.js":4,"./slave2.js":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('./channelManager.js');

var _channelManager2 = _interopRequireDefault(_channelManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// factory
function constructor(opts) {
    var self = this,
        _privateIns = 'privateInstance';

    this.name = 'Master';
    this.channel = _channelManager2.default.subscribe(opts.channel);

    this.sendMessage = function () {
        self.emitEvent('Slave2', { message: 'ciao It\'s a message from ' + self.name });
    };

    // init
    this.init(function () {

        // listen
        this.channel.filter(function (res) {
            return res.event === self.name;
        }).subscribe(self.onEvent.bind(this));
    }.bind(this));

    // this.destroy(function(){
    //
    //     // listen
    //     this.channel
    //         .filter(function(res){
    //             return res.event === self.name;
    //         })
    //         .subscribe(self.onEvent.bind(this));
    //
    // }.bind(this));
}

// prototype
constructor.prototype = {
    init: function init(cb) {
        console.log(this.name + ': Init');
        if (cb) cb();
    },
    destroy: function destroy(cb) {
        console.log(this.name + ': Destory');
        if (cb) cb();
    },
    action: function action() {
        console.log(this.name + ': Action');
    },
    emitEvent: function emitEvent(event, data) {
        console.log(this.name + ': Emit Action');
        this.channel.onNext({
            event: event,
            data: data
        });
    },
    onEvent: function onEvent(res) {
        console.log(this.name + ': Event received: ' + res.data.message);
    }
};

// extend
// _.assign(constructor.prototype,{
//
// });

exports.default = constructor;

},{"./channelManager.js":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('./channelManager.js');

var _channelManager2 = _interopRequireDefault(_channelManager);

var _master = require('./master.js');

var _master2 = _interopRequireDefault(_master);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// factory
function constructor(opts) {
    var self = this,
        subscription;

    this.channel = _channelManager2.default.subscribe(opts.channel);
    this.name = 'Slave';

    this.sendMessage = function () {
        self.emitEvent('Master', { message: 'ciao I am ' + self.name });
    };

    // init
    this.init(function () {

        // listen
        var subscribtion = this.channel.filter(function (res) {
            return res.event === self.name;
        }).subscribe(self.onEvent.bind(this));

        //subscribtion.dispose();
    }.bind(this));
}

// inherit
constructor.prototype = _master2.default.prototype;

// extend
// _.assign(constructor.prototype,{
//
// });

exports.default = constructor;

},{"./channelManager.js":1,"./master.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('./channelManager.js');

var _channelManager2 = _interopRequireDefault(_channelManager);

var _master = require('./master.js');

var _master2 = _interopRequireDefault(_master);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// factory
function constructor(opts) {
    var self = this,
        subscription;

    this.name = opts.name || 'Slave2';
    this.channel = _channelManager2.default.subscribe(opts.channel);

    this.sendMessage = function () {
        self.emitEvent('Master', { message: 'ciao I am ' + self.name });
    };

    // init
    this.init(function () {

        // listen
        this.channel.filter(function (res) {
            return res.event === self.name;
        }).subscribe(self.onEvent.bind(this));
    }.bind(this));
}

// inherit
constructor.prototype = _master2.default.prototype;

// extend
// _.assign(constructor.prototype,{
//
// });

exports.default = constructor;

},{"./channelManager.js":1,"./master.js":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY2hhbm5lbE1hbmFnZXIuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9tYXN0ZXIuanMiLCJhcHAvanMvc2xhdmUuanMiLCJhcHAvanMvc2xhdmUyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQWU7QUFDWCxVQUFNLEVBREs7QUFFWCxlQUFXLG1CQUFTLFdBQVQsRUFBc0I7QUFDN0IsWUFBSSxZQUFKOztBQUVBLFlBQUksQ0FBQyxLQUFLLElBQUwsQ0FBVSxXQUFWLENBQUwsRUFBNkI7QUFDekIsMkJBQWUsS0FBSyxJQUFMLENBQVUsV0FBVixJQUF5QixJQUFJLEdBQUcsYUFBUCxDQUFxQixDQUFyQixDQUF4QztBQUNIOztBQUVELHVCQUFlLEtBQUssSUFBTCxDQUFVLFdBQVYsQ0FBZjs7QUFFQSxlQUFPLFlBQVA7QUFDSDtBQVpVLEM7Ozs7O0FDQWY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGFBQUosRUFDSSxhQURKLEVBRUksY0FGSixFQUdJLGFBSEo7OztBQU1BLGdCQUFnQixxQkFBVztBQUN2QixhQUFTO0FBRGMsQ0FBWCxDQUFoQjs7QUFJQSxjQUFjLFdBQWQ7O0FBRUEsZ0JBQWdCLG9CQUFVO0FBQ3RCLGFBQVM7QUFEYSxDQUFWLENBQWhCOztBQUlBLGlCQUFpQixvQkFBVztBQUN4QixhQUFTO0FBRGUsQ0FBWCxDQUFqQjs7QUFJQSxnQkFBZ0Isb0JBQVc7QUFDdkIsYUFBUyxNQURjO0FBRXZCLFVBQU07QUFGaUIsQ0FBWCxDQUFoQjs7O0FBTUEsY0FBYyxXQUFkOztBQUVBLGNBQWMsV0FBZDs7Ozs7Ozs7Ozs7O0FDaENBOzs7Ozs7O0FBR0EsU0FBUyxXQUFULENBQXFCLElBQXJCLEVBQTJCO0FBQ3ZCLFFBQUksT0FBTyxJQUFY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SSxRQURKLEVBRUksRUFBRSxTQUFTLGVBQWUsS0FBSyxJQUEvQixFQUZKO0FBSUgsS0FMRDs7O0FBUUEsU0FBSyxJQUFMLENBQVUsWUFBVTs7O0FBR2hCLGFBQUssT0FBTCxDQUNLLE1BREwsQ0FDWSxVQUFTLEdBQVQsRUFBYTtBQUNqQixtQkFBTyxJQUFJLEtBQUosS0FBYyxLQUFLLElBQTFCO0FBQ0gsU0FITCxFQUlLLFNBSkwsQ0FJZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBSmY7QUFNSCxLQVRTLENBU1IsSUFUUSxDQVNILElBVEcsQ0FBVjtBQVVIOzs7QUFHRCxZQUFZLFNBQVosR0FBd0IsaUJBQU8sU0FBL0I7Ozs7Ozs7a0JBT2UsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbGlzdDoge30sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbihjaGFubmVsTmFtZSkge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIGlmICghdGhpcy5saXN0W2NoYW5uZWxOYW1lXSkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5saXN0W2NoYW5uZWxOYW1lXSA9IG5ldyBSeC5SZXBsYXlTdWJqZWN0KDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhpcy5saXN0W2NoYW5uZWxOYW1lXTtcblxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH1cbn07IiwiaW1wb3J0IE1hc3RlciBmcm9tICcuL21hc3Rlci5qcyc7XG5pbXBvcnQgU2xhdmUgZnJvbSAnLi9zbGF2ZS5qcyc7XG5pbXBvcnQgU2xhdmUyIGZyb20gJy4vc2xhdmUyLmpzJztcblxudmFyIG1hc3RlcklzdGFuY2UsXG4gICAgc2xhdmVJbnN0YW5jZSxcbiAgICBzbGF2ZTJJbnN0YW5jZSxcbiAgICBlbmVteUluc3RhbmNlO1xuXG4vLyBhcHBsaWNhdGlvbiBib290c3RyYXBcbm1hc3RlcklzdGFuY2UgPSBuZXcgTWFzdGVyKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxubWFzdGVySXN0YW5jZS5zZW5kTWVzc2FnZSgpO1xuXG5zbGF2ZUluc3RhbmNlID0gbmV3IFNsYXZlKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxuc2xhdmUySW5zdGFuY2UgPSBuZXcgU2xhdmUyKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxuZW5lbXlJbnN0YW5jZSA9IG5ldyBTbGF2ZTIoe1xuICAgIGNoYW5uZWw6ICdiZXRhJyxcbiAgICBuYW1lOiAnRW5lbXknXG59KTtcblxuLy8gdXNlciBoYW5kbGUgYWN0aW9uc1xuc2xhdmVJbnN0YW5jZS5zZW5kTWVzc2FnZSgpO1xuXG5lbmVteUluc3RhbmNlLnNlbmRNZXNzYWdlKCk7XG5cbi8vIGRlc3RvcnkgY29tcG9uZW50XG4vL21hc3RlcklzdGFuY2UuZGVzdHJveSgpOyIsImltcG9ydCBDaGFubmVsTWFuYWdlciBmcm9tICcuL2NoYW5uZWxNYW5hZ2VyLmpzJztcblxuLy8gZmFjdG9yeVxuZnVuY3Rpb24gY29uc3RydWN0b3Iob3B0cykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgX3ByaXZhdGVJbnMgPSAncHJpdmF0ZUluc3RhbmNlJztcblxuICAgIHRoaXMubmFtZSA9ICdNYXN0ZXInO1xuICAgIHRoaXMuY2hhbm5lbCA9IENoYW5uZWxNYW5hZ2VyLnN1YnNjcmliZShvcHRzLmNoYW5uZWwpO1xuXG4gICAgdGhpcy5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5lbWl0RXZlbnQoXG4gICAgICAgICAgICAnU2xhdmUyJyxcbiAgICAgICAgICAgIHsgbWVzc2FnZTogJ2NpYW8gSXRcXCdzIGEgbWVzc2FnZSBmcm9tICcgKyBzZWxmLm5hbWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICB0aGlzLmluaXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAvLyBsaXN0ZW5cbiAgICAgICAgdGhpcy5jaGFubmVsXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ldmVudCA9PT0gc2VsZi5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc2VsZi5vbkV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHRoaXMuZGVzdHJveShmdW5jdGlvbigpe1xuICAgIC8vXG4gICAgLy8gICAgIC8vIGxpc3RlblxuICAgIC8vICAgICB0aGlzLmNoYW5uZWxcbiAgICAvLyAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24ocmVzKXtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gcmVzLmV2ZW50ID09PSBzZWxmLm5hbWU7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLnN1YnNjcmliZShzZWxmLm9uRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgLy9cbiAgICAvLyB9LmJpbmQodGhpcykpO1xufVxuXG4vLyBwcm90b3R5cGVcbmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihjYikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnOiBJbml0Jyk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICc6IERlc3RvcnknKTtcbiAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgIH0sXG4gICAgYWN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJzogQWN0aW9uJyk7XG4gICAgfSxcbiAgICBlbWl0RXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICc6IEVtaXQgQWN0aW9uJyk7XG4gICAgICAgIHRoaXMuY2hhbm5lbC5vbk5leHQoe1xuICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG9uRXZlbnQ6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnOiBFdmVudCByZWNlaXZlZDogJyArIHJlcy5kYXRhLm1lc3NhZ2UpO1xuICAgIH1cbn07XG5cbi8vIGV4dGVuZFxuLy8gXy5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLHtcbi8vXG4vLyB9KTtcblxuZXhwb3J0IGRlZmF1bHQgY29uc3RydWN0b3I7IiwiaW1wb3J0IENoYW5uZWxNYW5hZ2VyIGZyb20gJy4vY2hhbm5lbE1hbmFnZXIuanMnO1xuaW1wb3J0IE1hc3RlciBmcm9tICcuL21hc3Rlci5qcyc7XG5cbi8vIGZhY3RvcnlcbmZ1bmN0aW9uIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuY2hhbm5lbCA9IENoYW5uZWxNYW5hZ2VyLnN1YnNjcmliZShvcHRzLmNoYW5uZWwpO1xuICAgIHRoaXMubmFtZSA9ICdTbGF2ZSc7XG5cbiAgICB0aGlzLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmVtaXRFdmVudChcbiAgICAgICAgICAgICdNYXN0ZXInLFxuICAgICAgICAgICAgeyBtZXNzYWdlOiAnY2lhbyBJIGFtICcgKyBzZWxmLm5hbWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICB0aGlzLmluaXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAvLyBsaXN0ZW5cbiAgICAgICAgdmFyIHN1YnNjcmlidGlvbiA9IHRoaXMuY2hhbm5lbFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuZXZlbnQgPT09IHNlbGYubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGYub25FdmVudC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvL3N1YnNjcmlidGlvbi5kaXNwb3NlKCk7XG5cbiAgICB9LmJpbmQodGhpcykpO1xufVxuXG4vLyBpbmhlcml0XG5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBNYXN0ZXIucHJvdG90eXBlO1xuXG4vLyBleHRlbmRcbi8vIF8uYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSx7XG4vL1xuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yOyIsImltcG9ydCBDaGFubmVsTWFuYWdlciBmcm9tICcuL2NoYW5uZWxNYW5hZ2VyLmpzJztcbmltcG9ydCBNYXN0ZXIgZnJvbSAnLi9tYXN0ZXIuanMnO1xuXG4vLyBmYWN0b3J5XG5mdW5jdGlvbiBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBzdWJzY3JpcHRpb247XG5cbiAgICB0aGlzLm5hbWUgPSBvcHRzLm5hbWUgfHwgJ1NsYXZlMic7XG4gICAgdGhpcy5jaGFubmVsID0gQ2hhbm5lbE1hbmFnZXIuc3Vic2NyaWJlKG9wdHMuY2hhbm5lbCk7XG5cbiAgICB0aGlzLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmVtaXRFdmVudChcbiAgICAgICAgICAgICdNYXN0ZXInLFxuICAgICAgICAgICAgeyBtZXNzYWdlOiAnY2lhbyBJIGFtICcgKyBzZWxmLm5hbWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICB0aGlzLmluaXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAvLyBsaXN0ZW5cbiAgICAgICAgdGhpcy5jaGFubmVsXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5ldmVudCA9PT0gc2VsZi5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoc2VsZi5vbkV2ZW50LmJpbmQodGhpcykpO1xuXG4gICAgfS5iaW5kKHRoaXMpKTtcbn1cblxuLy8gaW5oZXJpdFxuY29uc3RydWN0b3IucHJvdG90eXBlID0gTWFzdGVyLnByb3RvdHlwZTtcblxuLy8gZXh0ZW5kXG4vLyBfLmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUse1xuLy9cbi8vIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25zdHJ1Y3RvcjsiXX0=
