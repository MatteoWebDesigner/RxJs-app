import ChannelManager from 'core/channelManager.js';
import GlobalEvents   from 'constant/globalEvents.js';
import SlaveEvents    from 'constant/slaveEvents.js';
import Slave2Events   from 'constant/slave2Events.js';

/**
 * constructor - description
 *  
 * @param  {object} opts = {channel: 'channelName',name: 'componentName'}
 */
function constructor(opts) {
    var channel;

    this.name = opts.name || 'Master';
    this.channelName = opts.channel || this.name;
    channel = ChannelManager.setChannel(this.channelName);

    this.sendInitData = () => {
        console.log(`${this.name}: emit INIT event`);

        channel.emit(GlobalEvents.INIT,{
            data: 'master data to bootstrap slaves'
        });
    };

    this.handleAction = () => {
        console.log(`${this.name}: emit Slave ON_INJECT event`);

        channel.emit(SlaveEvents.ON_INJECT,{
            data: 'master handle action'
        });
    };

    // listen
    channel.on(SlaveEvents.ON_CHANGE,(res) => {
        console.log(`${this.name}: received ON_CHANGE`,res);
    });

    // init
    this.initLog();
}

// prototype
constructor.prototype = {
    initLog() {
        console.log(`${this.name}: end init`);
    }
};

// extend
// _.assign(constructor.prototype,{
//
// });

export default constructor;