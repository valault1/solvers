export class Timer {
  private startTime: number;
  private endTime: number | undefined;
  private timeTaken: number | undefined;
  constructor() {
    this.startTime = Date.now();
    this.endTime = undefined;
    this.timeTaken = 0;
  }

  start = () => {
    this.startTime = Date.now();
    this.endTime = undefined;
  };

  reset = () => {
    this.startTime = Date.now();
    this.endTime = undefined;
  };
  getTime = () => {
    if (this.isRunning()) {
      return Date.now() - this.startTime + this.timeTaken;
    } else {
      return this.timeTaken;
    }
  };
  getSeconds = () => {
    return this.getTime() / 1000;
  };

  stopTimer = () => {
    this.endTime = Date.now();
    this.timeTaken = this.endTime - this.startTime + this.timeTaken;
  };

  isRunning = () => {
    return this.endTime === undefined;
  };

  stop = () => {
    this.stopTimer();
  };
}
