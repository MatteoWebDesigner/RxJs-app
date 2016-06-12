import ChannelManager from 'core/channelManager.js';
import GlobalEvents   from 'constant/globalEvents.js';
import SlaveEvents    from 'constant/slaveEvents.js';
import Master         from 'component/master.js';

// factory
function constructor(opts) {
    var channel;

    this.name = opts.name || 'Slave';
    this.channelName = opts.channel || this.name;
    channel = ChannelManager.setChannel(this.channelName);

    this.handleAction = () => {
        console.log(`${this.name}: emit Slave ON_CHANGE`);
        channel.emit(SlaveEvents.ON_CHANGE,{
            data: 'Slave on change event data'
        });
    };
    
    // listen
    channel.on(GlobalEvents.INIT,(res) => {
        console.log(`${this.name}: received INIT event`,res);
    });

    channel.on(SlaveEvents.ON_INJECT,(res) => {
        console.log(`${this.name}: received ON_INJECT`,res);
    });

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