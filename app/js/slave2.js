App.slave2 = (function() {
    // factory
    function constructor(opts) {
        var self = this,
            subscription;

        this.name = 'Slave2';
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
    constructor.prototype = App.master.prototype;

    // extend
    _.assign(constructor.prototype,{

    });

    return constructor;
})();