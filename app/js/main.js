var App = {};
var ChannelManager = {
    list: {},
    subscribe: function(channelName) {
        var subscription;

        if (!this.list[channelName]) {
            subscription = this.list[channelName] = new Rx.BehaviorSubject(1);
        }

        subscription = this.list[channelName];

        return subscription;
    }
};