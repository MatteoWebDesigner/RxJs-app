App.master = (function() {
    var _privateMod = 'privateModule';
    
    // factory
    function constructor() {
        var self = this,
            _privateIns = 'privateInstance',
            subscription;

        this.name = 'Master';

        this.sendMessage = function () {
            self.emitEvent(
                'Slave2',
                { message: 'ciao It\'s a message from ' + self.name }
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
    
    // prototype
    constructor.prototype = {
        init: function(cb) {
            console.log(this.name + ': Init');
            if (cb) cb();
        },
        action: function() {
            console.log(this.name + ': Action');
        },
        emitEvent: function(event, data) {
            console.log(this.name + ': Emit Action');
            subject.onNext({
                event: event,
                data: data
            });
        },
        onEvent: function(res) {
            console.log(this.name + ': Event received: ' + res.data.message);
        }
    };
    
    // extend
    _.assign(constructor.prototype,{

    });

    return constructor;
})();