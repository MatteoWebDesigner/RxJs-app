(function() {
    // application bootstrap
    var master = new App.master({
        channel: 'alpha'
    });

    var slave = new App.slave({
        channel: 'alpha'
    });

    var slave2 = new App.slave2({
        channel: 'alpha'
    });

    var enemy = new App.slave2({
        channel: 'beta',
        name: 'Enemy'
    });

    // user handle actions
    master.sendMessage();

    slave.sendMessage();

    enemy.sendMessage();
    
    // destory component
    //master.destroy();
})();