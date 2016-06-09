App.slave = (function() {
    var eventNames = {
        INIT: 'slaveInit',
        INJECT: 'slaveInject',
        CHANGE: 'slaveChange'
    };

    // factory
    function constructor(opts) {
        var self = this,
            subscription;

        this.channel = App.ChannelManager.subscribe(opts.channel);
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
            var store = this.channel
                .filter(function(res){
                    return res.event === self.name;
                })
                .subscribe(self.onEvent.bind(this));

            store;

        }.bind(this));
    }

    // inherit
    constructor.prototype = App.master.prototype;

    // extend
    // _.assign(constructor.prototype,{
    // 
    // });

    return constructor;
})();