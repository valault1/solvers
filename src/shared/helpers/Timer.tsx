export class Stopwatch {
  private startTime: number;
  private endTime: number | undefined;
  constructor() {
    this.startTime = Date.now();
  }

  resetStartTime = () => {
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
}
