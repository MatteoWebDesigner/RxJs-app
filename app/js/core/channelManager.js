function ChannelManager(){
    this.channels = {},
    this.setChannel = (channelName) => {
        var channel;

        if (!this.channels[channelName]) {
            channel = this.channels[channelName] = new EventManager();
        } else {
            channel = this.channels[channelName];
        }

        return channel;
    }
};

function EventManager() {
    this.events = {};
    
    /**
     * on - listen fresh event
     *  
     * @param  {string}    eventName     -
     * @param  {function}  eventAction   callback function
     * @return {object}                  Rx subject
     */
    this.on = (eventName,eventAction) => {
        var subject,
            eventDispatcherInstance = this._setEventDispacter(eventName);

        subject = eventDispatcherInstance.getSubject();

        return subject.subscribe(eventAction);
    };
    
    /**
     * onReplay - listen retain event
     *  
     * @param  {string}    eventName     -
     * @param  {function}  eventAction   callback function
     * @return {object}                  Rx subject
     */
    this.onReplay = (eventName,eventAction) => {
        var subject,
            eventDispatcherInstance = this._setEventDispacter(eventName);

        subject = eventDispatcherInstance.getReplaySubject();

        return subject.subscribe(eventAction);
    };
    
    /**
     * emit - send a signal to every listeners
     *  
     * @param  {string}    eventName     -
     * @param  {object}    eventData     data sent to every listeners
     * @return {object}                  Rx subject
     */
    this.emit = (eventName,eventData) => {
        var eventDispatcherInstance = this._setEventDispacter(eventName);

        return eventDispatcherInstance.dispatch(eventData);
    };
    
    /**
     * _setEventDispacter - private method to set and return a EventDispatcher instance
     *  
     * @param  {string}    eventName     -
     * @return {object}                  EventDispatcher instance
     */
    this._setEventDispacter = (eventName) => {
        var eventDispatcherInstance;

        if (!this.events[eventName]) {
            eventDispatcherInstance = this.events[eventName] = new EventDispatcher();
        } else {
            eventDispatcherInstance = this.events[eventName];
        }
    
        return eventDispatcherInstance;
    };
}

function EventDispatcher () {
    var replay = new Rx.Subject(),
        replaySubject = new Rx.ReplaySubject(1);
    
    this.getSubject = () => {
        return replay;
    };

    this.getReplaySubject = () => {
        return replaySubject;
    };
    
    this.dispatch = (eventData) => {
        replay.onNext(eventData);
        replaySubject.onNext(eventData);
    };

    this.destroy = () => { //@TODO need to work on this
        replay.dispose();
        replaySubject.dispose();
    }
}

export default new ChannelManager();