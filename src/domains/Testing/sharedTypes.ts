import React from "react";

export type Test = {
  functionToTest: Function;
  functionName: string;
  defaultInputs: any[];
  resultDisplayComponent: React.FC<any>;
  isHidden?: boolean;
};
