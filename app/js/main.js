import Master from 'component/master.js';
import Slave  from 'component/slave.js';
import Slave2 from 'component/slave2.js';

var masterIstance,
    slaveInstance,
    slave2Instance,
    enemyInstance;

// application bootstrap
masterIstance = new Master({
    channel: 'alpha'
});

masterIstance.sendMessage();

slaveInstance = new Slave({
    channel: 'alpha'
});

slave2Instance = new Slave2({
    channel: 'alpha'
});

enemyInstance = new Slave2({
    channel: 'beta',
    name: 'Enemy'
});

// user handle actions
slaveInstance.sendMessage();

enemyInstance.sendMessage();

// destory component
// masterIstance.destroy();