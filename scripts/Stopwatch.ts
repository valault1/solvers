export class Stopwatch {
  private startTime: number;
  private endTime: number | undefined;
  constructor() {
    this.startTime = Date.now();
    this.endTime = undefined;
  }

  start = () => {
    this.reset();
  };

  reset = () => {
    this.startTime = Date.now();
    this.endTime = undefined;
  };
  getTime = () => {
    if (this.endTime) return this.endTime - this.startTime;
    return Date.now() - this.startTime;
  };
  getSeconds = () => {
    return this.getTime() / 1000;
  };
  stopTimer = () => {
    this.endTime = Date.now();
  };

  stop = () => {
    this.stopTimer();
  };
}
