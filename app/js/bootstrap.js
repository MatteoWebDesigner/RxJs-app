(function() {
    // init master
    var master = new App.master({
        channel: 'alpha'
    });

    master.sendMessage();

    // init slaves
    var slave = new App.slave({
        channel: 'alpha'
    });

    var slave2 = new App.slave2({
        channel: 'alpha'
    });

    //setTimeout(function(){  }, 2000);
})();