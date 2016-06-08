(function() {
    // init master
    var master = new App.master();

    master.sendMessage();

    // init slaves
    var slave = new App.slave();
    var slave2 = new App.slave2();

    //setTimeout(function(){  }, 2000);
})();