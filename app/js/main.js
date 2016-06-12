import Master         from 'component/master.js';
import Slave          from 'component/slave.js';
import Slave2         from 'component/slave2.js';
import ChannelManager from 'core/channelManager.js';
import globalChannel  from 'core/globalChannel.js';

var masterIstance,
    slaveInstance,
    slave2Instance,
    enemyInstance;

/*
    
    story: 
    Master start initialisation and fetch some data and will send the data to bootstrap the other component

    Master => {  }
    
    How to communicate with a stateless component?
    
    it use a channel
    first he has unique id
    it has a serial of interfact events

    Slave
    id:Slave
    channel: alpha
    events: init, slave
    

 */

// app bootstrap
masterIstance = new Master({
    channel: 'alpha'
});

masterIstance.sendInitData();

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

// user actions
masterIstance.handleAction();

slaveInstance.handleAction();
