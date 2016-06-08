App.slave = (function() {
    // factory
    function constructor() {
        var self = this,
            subscription; 

        this.name = 'Slave';

        this.sendMessage = function () {
            self.emitEvent(
                'Master',
                { message: 'ciao I am ' + self.name }
            );
        }

        // init
        this.init(function(){
            subscription = subject
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