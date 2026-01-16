import * as React from "react";

class ResourceType {
  name: string;
  quantityAtLastTimeStamp: number;

  constructor(name: string, count: number = 0) {
    this.name = name;
    this.quantityAtLastTimeStamp = count;
  }

  getQuantity(): number {
    return this.quantityAtLastTimeStamp;
  }

  getQuantityFormatted(): string {
    return String(Math.floor(this.getQuantity()));
  }
}

export const useResources = () => {
  const lastTimeStamp = React.useRef(Date.now());
  const numPaperClipsAtLastTimestamp = React.useRef(0);
  const numAutoClippers = React.useRef(new ResourceType("autoclippers"));

  const getMoney = () => {};

  const getNumPaperClips = () => {
    const timeDelta = (Date.now() - lastTimeStamp.current) / 1000;
    const paperclipsGenerated =
      timeDelta * numAutoClippers.current.quantityAtLastTimeStamp;
    return numPaperClipsAtLastTimestamp.current + paperclipsGenerated;
  };

  const getFormattedNumPaperclips = () => {
    return Math.floor(getNumPaperClips());
  };

  const getFormattedNumAutoclippers = () => {
    return numAutoClippers.current.getQuantity();
  };

  const makePaperClip = () => {
    lastTimeStamp.current = Date.now();
    numPaperClipsAtLastTimestamp.current = getNumPaperClips() + 1;
  };
  const makeAutoclipper = () => {
    numPaperClipsAtLastTimestamp.current = getNumPaperClips();
    lastTimeStamp.current = Date.now();
    numAutoClippers.current.quantityAtLastTimeStamp++;
  };
  return {
    getFormattedNumPaperclips,
    getFormattedNumAutoclippers,
    makePaperClip,
    makeAutoclipper,
  };
};
