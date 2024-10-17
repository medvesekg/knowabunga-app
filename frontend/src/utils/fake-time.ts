import MockDate from "mockdate";

export default class FakeTime {
  static subscribers: ((date: Date) => void)[] = [];

  static interval: null | number = null;

  static set(date: Date) {
    if (FakeTime.interval) {
      clearInterval(FakeTime.interval);
    }
    MockDate.set(date);
    FakeTime.interval = setInterval(() => {
      MockDate.set(new Date().getTime() + 1000);
    }, 1000);
    FakeTime.subscribers.forEach((subscriber) => subscriber(date));
  }

  static subscribe(callback: (date: Date) => void) {
    FakeTime.subscribers.push(callback);
  }

  static unsubscribe(callback: (date: Date) => void) {
    FakeTime.subscribers = FakeTime.subscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }
}
