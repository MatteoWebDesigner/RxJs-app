App.slave = (function(){
  function constructor () {
    this.name = 'Slave';

    this.init();
  }

  constructor.prototype = App.master.prototype;

  return constructor;
})();