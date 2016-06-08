App.master = (function(){
  var _privateMod = 'privateModule';

  function constructor () {
    var
      self = this,
      _privateIns = 'privateInstance';

    var subscription = subject.subscribe(self.actionOnEvent.bind(this));

    this.name = 'Master';

    this.init();
  }

  constructor.prototype = {
    init: function() {
      console.log(this.name + ': Init');
    },
    action: function() {
      console.log(this.name + ': Action');
    },
    actionOnEvent: function(res) {
      console.log(this.name + ': Event received: ' + res.data);
    }
  };

  return constructor;
})();