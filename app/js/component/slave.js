import ChannelManager from 'core/channelManager.js';
import Master         from 'component/master.js';

// factory
function constructor(opts) {
    var self = this,
        subscription;

    this.channel = ChannelManager.subscribe(opts.channel);
    this.name = 'Slave';

    this.sendMessage = function () {
        self.emitEvent(
            'Master',
            { message: 'ciao I am ' + self.name }
        );
    }

    // init
    this.init(function(){

        // listen
        var subscribtion = this.channel
            .filter(function(res){
                return res.event === self.name;
            })
            .subscribe(self.onEvent.bind(this));

        //subscribtion.dispose();

    }.bind(this));
}

// inherit
constructor.prototype = Master.prototype;

// extend
// _.assign(constructor.prototype,{
//
// });

export default constructor;