import { writeSeedsObjectToFile } from "./saveSeeds";

export class Seeds {
  /* Period parameters */
  public seeds: number[];
  public timesTakenSeconds: number[];
  public boardsGenerated: number[];
  public filePath: string;
  public boardSize: number;
  public numSeeds: number;
  public originalNumSeeds: number;
  public lastSeedTried = 0;

  constructor({
    seeds,
    timesTakenSeconds,
    boardsGenerated,
    filePath,
    boardSize,
    lastSeedTried,
  }: {
    seeds?: number[];
    timesTakenSeconds?: number[];
    boardsGenerated?: number[];
    filePath: string;
    boardSize: number;
    lastSeedTried: number;
  }) {
    this.seeds = seeds || [];
    this.timesTakenSeconds = timesTakenSeconds || [];
    this.boardsGenerated = boardsGenerated || [];
    this.filePath = filePath;
    this.boardSize = boardSize;
    this.lastSeedTried = lastSeedTried;
    this.numSeeds = this.seeds.length;
    this.originalNumSeeds = this.seeds.length;
  }

  save() {
    writeSeedsObjectToFile(this);
  }

  newSeeds() {
    return this.seeds.length - this.originalNumSeeds;
  }

  getNextSeed() {
    this.lastSeedTried++;
    return this.lastSeedTried;
  }

  addSeedAttemp({
    seed,
    timeTakenSeconds,
    boardsGenerated,
  }: {
    seed?: number;
    timeTakenSeconds: number;
    boardsGenerated: number;
  }) {
    const hasAttemptedBefore =
      this.boardsGenerated.length > this.seeds.length &&
      this.timesTakenSeconds.length > this.seeds.length;
    let currentTimeTaken = 0,
      currentBoardsGenerated = 0;
    if (hasAttemptedBefore) {
      currentTimeTaken =
        this.timesTakenSeconds[this.timesTakenSeconds.length - 1];
      this.timesTakenSeconds.pop();
      currentBoardsGenerated =
        this.boardsGenerated[this.boardsGenerated.length - 1];
      this.boardsGenerated.pop();
    }
    if (seed) {
      this.seeds.push(seed);
    }
    this.timesTakenSeconds.push(currentTimeTaken + timeTakenSeconds);
    this.boardsGenerated.push(currentBoardsGenerated + boardsGenerated);
    this.numSeeds = this.seeds.length;
  }
}
