(function () {
  window.MockEventEmitter = function (eventEmitter) {
    this.events = {};
    this.eventEmmiter = eventEmitter;
  };

  window.MockEventEmitter.prototype = {
    subscribe: function (eventName, callback) {
      if(this.events[eventName]){
        this.events[eventName]++;
      }else{
        this.events[eventName] = 1;
      }
      return this.eventEmmiter.subscribe(eventName,callback);
    },
    publish: function (eventName,args) {
      this.eventEmmiter.publish(eventName,args);

    },
    unsubscribe: function (eventName) {
     this.eventEmmiter.unsubscribe(eventName);
      if(this.events[eventName]){
        this.events[eventName]--;
      }
    }
  }
})();