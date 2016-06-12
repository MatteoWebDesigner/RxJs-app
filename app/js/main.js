import Master         from 'component/master.js';
import Slave          from 'component/slave.js';
import Slave2         from 'component/slave2.js';
import ChannelManager from 'core/channelManager.js';
import globalChannel  from 'core/globalChannel.js';

var masterIstance,
    slaveInstance,
    slave2Instance,
    enemyInstance;


// working on channel manager
var channelAplha = ChannelManager.setChannel('alpha');

// channelAplha.emit('eventName', {
//     data: 'dataSent to private channel'
// });
// globalChannel.emit('eventName', {
//     data: 'dataSent to global channel'
// });

channelAplha.on('eventName', (res) => {
    console.log('fresh:',res);
});

channelAplha.onReplay('eventName', (res) => {
    console.log('replay:',res);
});

globalChannel.on('eventName', (res) => {
    console.log('fresh:',res);
});

globalChannel.onReplay('eventName', (res) => {
    console.log('replay:',res);
});

channelAplha.emit('eventName', {
    data: 'dataSent to private channel'
});
globalChannel.emit('eventName', {
    data: 'dataSent to global channel'
});


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

// application bootstrap
// masterIstance = new Master({
//     channel: 'alpha'
// });
// 
// masterIstance.sendInit();

// slaveInstance = new Slave({
//     channel: 'alpha'
// });
// 
// slave2Instance = new Slave2({
//     channel: 'alpha'
// });

// enemyInstance = new Slave2({
//     channel: 'beta',
//     name: 'Enemy'
// });

// user handle actions
// slaveInstance.sendMessage();
// 
// enemyInstance.sendMessage();

// destory component
// masterIstance.destroy();