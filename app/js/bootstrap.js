(function(){
  // init master
  var master = new App.master();

  master.action();

  // init slaves
  var slave = new App.slave();
  var slave2 = new App.slave2();

  subject.onNext({
    id: 'global',
    data: 'ciao gianni'
  });

  //setTimeout(function(){  }, 2000);
})();