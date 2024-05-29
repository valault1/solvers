import { NAMES } from "domains/Subgroups/SubgroupsController";
import React from "react";

function combinations(arr: any[], k: number) {
  const result: any[] = [];

  function generateCombination(comb: any[], start: number) {
    if (comb.length === k) {
      result.push([...comb]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      comb.push(arr[i]);
      generateCombination(comb, i + 1);
      comb.pop();
    }
  }

  generateCombination([], 0);
  return result;
}

export const useSubgroups = ({
  selectedNames,
}: {
  selectedNames: string[];
}) => {
  let minNumber = 2;
  let maxNumber = NAMES.length;

  const subgroups = React.useMemo(() => {
    let result = [];
    for (let i = minNumber; i <= maxNumber; i++) {
      result.push(...combinations(NAMES, i));
    }
    return result;
  }, [maxNumber, minNumber]);

  const subgroupsWithSelectedNames = React.useMemo(() => {
    let result = subgroups;
    for (let name of selectedNames) {
      result = result.filter((subgroup) => subgroup.includes(name));
    }
    return result;
  }, [subgroups, selectedNames]);

  return { subgroupsWithSelectedNames, subgroups };
};
