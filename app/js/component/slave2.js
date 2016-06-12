import ChannelManager from 'core/channelManager.js';
import Master         from 'component/master.js';

// factory
function constructor(opts) {
    var self = this,
        subscription;

    this.name = opts.name || 'Slave2';
    this.channel = ChannelManager.subscribe(opts.channel);

    this.sendMessage = function () {
        self.emitEvent(
            'Master',
            { message: 'ciao I am ' + self.name }
        );
    }

    // init
    this.initLog();
}

// inherit
constructor.prototype = Master.prototype;

// extend
// _.assign(constructor.prototype,{
//
// });

export default constructor;