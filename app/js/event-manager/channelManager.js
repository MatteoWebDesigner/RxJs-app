export default {
    list: {},
    subscribe: function(channelName) {
        var subscription;

        if (!this.list[channelName]) {
            subscription = this.list[channelName] = new Rx.ReplaySubject(1);
        }

        subscription = this.list[channelName];

        return subscription;
    }
};