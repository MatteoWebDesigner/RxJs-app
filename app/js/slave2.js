App.slave2 = (function(){
  function constructor () {
    this.name = 'Slave2';

    this.init();
  }

  constructor.prototype = App.master.prototype;

  return constructor;
})();