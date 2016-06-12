import ChannelManager from 'core/channelManager.js';

/**
 * constructor - description
 *  
 * @param  {object} opts = {channel: 'channelName',name: 'componentName'}
 */
function constructor(opts) {
    var channel;

    this.name = 'Master';
    this.channelName = opts.channel || this.name;
    channel = ChannelManager.setChannel(this.channelName);

    

    // init
    this.initLog();
}

// prototype
constructor.prototype = {
    initLog() {
        console.log(`$(this.name): init`);
    }
};

// extend
// _.assign(constructor.prototype,{
//
// });

export default constructor;