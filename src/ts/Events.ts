/* eslint-disable @typescript-eslint/ban-types */
type eventDataType = string | boolean | number;

class EventHandler {
  events: eventContainerType;

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
  emit(eventName: string, data: eventDataType) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: Function) => {
        fn.call(null, data);
      });
    }
  }
}
const emitter = new EventHandler();
export { emitter };
