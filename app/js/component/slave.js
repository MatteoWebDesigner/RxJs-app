import ChannelManager from 'core/channelManager.js';
import Master         from 'component/master.js';

// factory
function constructor(opts) {
    var self = this,
        subscription;

    this.channel = ChannelManager.subscribe(opts.channel);
    this.name = 'Slave';

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