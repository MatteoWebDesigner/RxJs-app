(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('../event-manager/channelManager.js');

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
        console.log(this.name + ': Emit Action =>');
        this.channel.onNext({
            event: event,
            data: data
        });
    },
    onEvent: function onEvent(res) {
        console.log(this.name + ': <= Event received: ' + res.data.message);
    }
};

// extend
// _.assign(constructor.prototype,{
//
// });

exports.default = constructor;

},{"../event-manager/channelManager.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('../event-manager/channelManager.js');

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

},{"../event-manager/channelManager.js":4,"./master.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _channelManager = require('../event-manager/channelManager.js');

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

},{"../event-manager/channelManager.js":4,"./master.js":1}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var _master = require('./component/master.js');

var _master2 = _interopRequireDefault(_master);

var _slave = require('./component/slave.js');

var _slave2 = _interopRequireDefault(_slave);

var _slave3 = require('./component/slave2.js');

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

},{"./component/master.js":1,"./component/slave.js":2,"./component/slave2.js":3}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvY29tcG9uZW50L21hc3Rlci5qcyIsImFwcC9qcy9jb21wb25lbnQvc2xhdmUuanMiLCJhcHAvanMvY29tcG9uZW50L3NsYXZlMi5qcyIsImFwcC9qcy9ldmVudC1tYW5hZ2VyL2NoYW5uZWxNYW5hZ2VyLmpzIiwiYXBwL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQUdBLFNBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQjtBQUN2QixRQUFJLE9BQU8sSUFBWDtRQUNJLGNBQWMsaUJBRGxCOztBQUdBLFNBQUssSUFBTCxHQUFZLFFBQVo7QUFDQSxTQUFLLE9BQUwsR0FBZSx5QkFBZSxTQUFmLENBQXlCLEtBQUssT0FBOUIsQ0FBZjs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsWUFBWTtBQUMzQixhQUFLLFNBQUwsQ0FDSSxRQURKLEVBRUksRUFBRSxTQUFTLCtCQUErQixLQUFLLElBQS9DLEVBRko7QUFJSCxLQUxEOzs7QUFRQSxTQUFLLElBQUwsQ0FBVSxZQUFVOzs7QUFHaEIsYUFBSyxPQUFMLENBQ0ssTUFETCxDQUNZLFVBQVMsR0FBVCxFQUFhO0FBQ2pCLG1CQUFPLElBQUksS0FBSixLQUFjLEtBQUssSUFBMUI7QUFDSCxTQUhMLEVBSUssU0FKTCxDQUllLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FKZjtBQU1ILEtBVFMsQ0FTUixJQVRRLENBU0gsSUFURyxDQUFWOzs7Ozs7Ozs7Ozs7QUFxQkg7OztBQUdELFlBQVksU0FBWixHQUF3QjtBQUNwQixVQUFNLGNBQVMsRUFBVCxFQUFhO0FBQ2YsZ0JBQVEsR0FBUixDQUFZLEtBQUssSUFBTCxHQUFZLFFBQXhCO0FB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LHVCQUFlLEtBQUssSUFBTCxDQUFVLFdBQVYsQ0FBZjs7QUFFQSxlQUFPLFlBQVA7QUFDSDtBQVpVLEM7Ozs7O0FDQWY7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGFBQUosRUFDSSxhQURKLEVBRUksY0FGSixFQUdJLGFBSEo7OztBQU1BLGdCQUFnQixxQkFBVztBQUN2QixhQUFTO0FBRGMsQ0FBWCxDQUFoQjs7QUFJQSxjQUFjLFdBQWQ7O0FBRUEsZ0JBQWdCLG9CQUFVO0FBQ3RCLGFBQVM7QUFEYSxDQUFWLENBQWhCOztBQUlBLGlCQUFpQixvQkFBVztBQUN4QixhQUFTO0FBRGUsQ0FBWCxDQUFqQjs7QUFJQSxnQkFBZ0Isb0JBQVc7QUFDdkIsYUFBUyxNQURjO0FBRXZCLFVBQU07QUFGaUIsQ0FBWCxDQUFoQjs7O0FBTUEsY0FBYyxXQUFkOztBQUVBLGNBQWMsV0FBZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQ2hhbm5lbE1hbmFnZXIgZnJvbSAnLi4vZXZlbnQtbWFuYWdlci9jaGFubmVsTWFuYWdlci5qcyc7XG5cbi8vIGZhY3RvcnlcbmZ1bmN0aW9uIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIF9wcml2YXRlSW5zID0gJ3ByaXZhdGVJbnN0YW5jZSc7XG5cbiAgICB0aGlzLm5hbWUgPSAnTWFzdGVyJztcbiAgICB0aGlzLmNoYW5uZWwgPSBDaGFubmVsTWFuYWdlci5zdWJzY3JpYmUob3B0cy5jaGFubmVsKTtcblxuICAgIHRoaXMuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZW1pdEV2ZW50KFxuICAgICAgICAgICAgJ1NsYXZlMicsXG4gICAgICAgICAgICB7IG1lc3NhZ2U6ICdjaWFvIEl0XFwncyBhIG1lc3NhZ2UgZnJvbSAnICsgc2VsZi5uYW1lIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBpbml0XG4gICAgdGhpcy5pbml0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgLy8gbGlzdGVuXG4gICAgICAgIHRoaXMuY2hhbm5lbFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuZXZlbnQgPT09IHNlbGYubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGYub25FdmVudC5iaW5kKHRoaXMpKTtcblxuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAvLyB0aGlzLmRlc3Ryb3koZnVuY3Rpb24oKXtcbiAgICAvL1xuICAgIC8vICAgICAvLyBsaXN0ZW5cbiAgICAvLyAgICAgdGhpcy5jaGFubmVsXG4gICAgLy8gICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHJlcyl7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIHJlcy5ldmVudCA9PT0gc2VsZi5uYW1lO1xuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIC5zdWJzY3JpYmUoc2VsZi5vbkV2ZW50LmJpbmQodGhpcykpO1xuICAgIC8vXG4gICAgLy8gfS5iaW5kKHRoaXMpKTtcbn1cblxuLy8gcHJvdG90eXBlXG5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJzogSW5pdCcpO1xuICAgICAgICBpZiAoY2IpIGNiKCk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbihjYikge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnOiBEZXN0b3J5Jyk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9LFxuICAgIGFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICc6IEFjdGlvbicpO1xuICAgIH0sXG4gICAgZW1pdEV2ZW50OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnOiBFbWl0IEFjdGlvbiA9PicpO1xuICAgICAgICB0aGlzLmNoYW5uZWwub25OZXh0KHtcbiAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkV2ZW50OiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJzogPD0gRXZlbnQgcmVjZWl2ZWQ6ICcgKyByZXMuZGF0YS5tZXNzYWdlKTtcbiAgICB9XG59O1xuXG4vLyBleHRlbmRcbi8vIF8uYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSx7XG4vL1xuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yOyIsImltcG9ydCBDaGFubmVsTWFuYWdlciBmcm9tICcuLi9ldmVudC1tYW5hZ2VyL2NoYW5uZWxNYW5hZ2VyLmpzJztcbmltcG9ydCBNYXN0ZXIgICAgICAgICBmcm9tICcuL21hc3Rlci5qcyc7XG5cbi8vIGZhY3RvcnlcbmZ1bmN0aW9uIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuY2hhbm5lbCA9IENoYW5uZWxNYW5hZ2VyLnN1YnNjcmliZShvcHRzLmNoYW5uZWwpO1xuICAgIHRoaXMubmFtZSA9ICdTbGF2ZSc7XG5cbiAgICB0aGlzLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmVtaXRFdmVudChcbiAgICAgICAgICAgICdNYXN0ZXInLFxuICAgICAgICAgICAgeyBtZXNzYWdlOiAnY2lhbyBJIGFtICcgKyBzZWxmLm5hbWUgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGluaXRcbiAgICB0aGlzLmluaXQoZnVuY3Rpb24oKXtcblxuICAgICAgICAvLyBsaXN0ZW5cbiAgICAgICAgdmFyIHN1YnNjcmlidGlvbiA9IHRoaXMuY2hhbm5lbFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuZXZlbnQgPT09IHNlbGYubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHNlbGYub25FdmVudC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvL3N1YnNjcmlidGlvbi5kaXNwb3NlKCk7XG5cbiAgICB9LmJpbmQodGhpcykpO1xufVxuXG4vLyBpbmhlcml0XG5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBNYXN0ZXIucHJvdG90eXBlO1xuXG4vLyBleHRlbmRcbi8vIF8uYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSx7XG4vL1xuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yOyIsImltcG9ydCBDaGFubmVsTWFuYWdlciBmcm9tICcuLi9ldmVudC1tYW5hZ2VyL2NoYW5uZWxNYW5hZ2VyLmpzJztcbmltcG9ydCBNYXN0ZXIgICAgICAgICBmcm9tICcuL21hc3Rlci5qcyc7XG5cbi8vIGZhY3RvcnlcbmZ1bmN0aW9uIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMubmFtZSA9IG9wdHMubmFtZSB8fCAnU2xhdmUyJztcbiAgICB0aGlzLmNoYW5uZWwgPSBDaGFubmVsTWFuYWdlci5zdWJzY3JpYmUob3B0cy5jaGFubmVsKTtcblxuICAgIHRoaXMuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZW1pdEV2ZW50KFxuICAgICAgICAgICAgJ01hc3RlcicsXG4gICAgICAgICAgICB7IG1lc3NhZ2U6ICdjaWFvIEkgYW0gJyArIHNlbGYubmFtZSB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gaW5pdFxuICAgIHRoaXMuaW5pdChmdW5jdGlvbigpe1xuXG4gICAgICAgIC8vIGxpc3RlblxuICAgICAgICB0aGlzLmNoYW5uZWxcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmV2ZW50ID09PSBzZWxmLm5hbWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN1YnNjcmliZShzZWxmLm9uRXZlbnQuYmluZCh0aGlzKSk7XG5cbiAgICB9LmJpbmQodGhpcykpO1xufVxuXG4vLyBpbmhlcml0XG5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBNYXN0ZXIucHJvdG90eXBlO1xuXG4vLyBleHRlbmRcbi8vIF8uYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSx7XG4vL1xuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0cnVjdG9yOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBsaXN0OiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGNoYW5uZWxOYW1lKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG5cbiAgICAgICAgaWYgKCF0aGlzLmxpc3RbY2hhbm5lbE5hbWVdKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLmxpc3RbY2hhbm5lbE5hbWVdID0gbmV3IFJ4LlJlcGxheVN1YmplY3QoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdWJzY3JpcHRpb24gPSB0aGlzLmxpc3RbY2hhbm5lbE5hbWVdO1xuXG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfVxufTsiLCJpbXBvcnQgTWFzdGVyIGZyb20gJy4vY29tcG9uZW50L21hc3Rlci5qcyc7XG5pbXBvcnQgU2xhdmUgIGZyb20gJy4vY29tcG9uZW50L3NsYXZlLmpzJztcbmltcG9ydCBTbGF2ZTIgZnJvbSAnLi9jb21wb25lbnQvc2xhdmUyLmpzJztcblxudmFyIG1hc3RlcklzdGFuY2UsXG4gICAgc2xhdmVJbnN0YW5jZSxcbiAgICBzbGF2ZTJJbnN0YW5jZSxcbiAgICBlbmVteUluc3RhbmNlO1xuXG4vLyBhcHBsaWNhdGlvbiBib290c3RyYXBcbm1hc3RlcklzdGFuY2UgPSBuZXcgTWFzdGVyKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxubWFzdGVySXN0YW5jZS5zZW5kTWVzc2FnZSgpO1xuXG5zbGF2ZUluc3RhbmNlID0gbmV3IFNsYXZlKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxuc2xhdmUySW5zdGFuY2UgPSBuZXcgU2xhdmUyKHtcbiAgICBjaGFubmVsOiAnYWxwaGEnXG59KTtcblxuZW5lbXlJbnN0YW5jZSA9IG5ldyBTbGF2ZTIoe1xuICAgIGNoYW5uZWw6ICdiZXRhJyxcbiAgICBuYW1lOiAnRW5lbXknXG59KTtcblxuLy8gdXNlciBoYW5kbGUgYWN0aW9uc1xuc2xhdmVJbnN0YW5jZS5zZW5kTWVzc2FnZSgpO1xuXG5lbmVteUluc3RhbmNlLnNlbmRNZXNzYWdlKCk7XG5cbi8vIGRlc3RvcnkgY29tcG9uZW50XG4vL21hc3RlcklzdGFuY2UuZGVzdHJveSgpOyJdfQ==
