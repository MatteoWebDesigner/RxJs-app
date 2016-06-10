import ChannelManager from './channelManager.js';
import Master from './master.js';

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
    this.init(function(){

        // listen
        this.channel
            .filter(function(res){
                return res.event === self.name;
            })
            .subscribe(self.onEvent.bind(this));

    }.bind(this));
}

// inherit
constructor.prototype = Master.prototype;

// extend
// _.assign(constructor.prototype,{
//
// });

export default constructor;