import React from "react";
import { LEVEL_PACKS, SeedsBySize } from "./sharedTypes";
import { Button, Stack } from "@mui/material";
import { SeedNumberInput } from "./SeedNumberInput";

export const SeedsManager = () => {
  const [seeds, setSeeds] = React.useState("");
  const [mainPackSeeds, setMainPackSeeds] = React.useState<{
    [key: number]: number[];
  }>({
    7: [1, 2, 3],
    8: [1, 2, 3],
  });
  const [unusedSeeds, setUnusedSeeds] = React.useState<{
    [key: number]: number[];
  }>({
    7: [1, 2, 3],
    8: [1, 2, 3],
  });
  console.log({ unusedSeeds, mainPackSeeds });
  const onClickProcessNewSeeds = () => {
    console.log("sending call to process new seeds");
    fetch("api/processNewSeeds")
      .then((res) => res.json())
      .then((data) => {
        console.log("got result!");
        console.log({ seeds: data.seeds });
        setMainPackSeeds(data.seeds.mainPackSeeds);
        setUnusedSeeds(data.seeds.unusedSeeds);
      });
  };
  const onClickSaveSeeds = () => {
    console.log("sending call to process new seeds");
    fetch("api/saveMainPackSeeds", {
      method: "POST",
      body: JSON.stringify({ mainPackSeeds }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("got result!");
        console.log({ data });
      });
  };
  React.useEffect(() => {
    fetch("api/levelPacks")
      .then((res) => res.json())
      .then((data) => {
        console.log("queried! got result in controller:");
        console.log({ data });
        setSeeds(data || "");
      });
  }, []);

  const updateMainPackSeedsSize = React.useCallback(
    ({
      boardSize,
      newNumSeeds,
    }: {
      boardSize: number;
      newNumSeeds: number;
    }) => {
      console.log({ boardSize, newNumSeeds });
      let mainPackSeedsList = mainPackSeeds[boardSize];
      let unusedSeedsList = unusedSeeds[boardSize];
      if (mainPackSeedsList.length <= newNumSeeds) {
        // add seeds
        const numSeedsToAdd = newNumSeeds - mainPackSeedsList.length;
        const seedsToAdd = unusedSeedsList.slice(0, numSeedsToAdd);
        unusedSeedsList = unusedSeedsList.slice(numSeedsToAdd);
        mainPackSeedsList.push(...seedsToAdd);
      } else {
        // take away seeds, add them to unused
        const removedSeeds = mainPackSeedsList.slice(newNumSeeds);
        mainPackSeedsList = mainPackSeedsList.slice(0, newNumSeeds);
        unusedSeedsList.push(...removedSeeds);
      }
      console.log({ mainPackSeedsList, unusedSeedsList });

      setMainPackSeeds((prev) => ({
        ...prev,
        [boardSize]: mainPackSeedsList,
      }));
      setUnusedSeeds((prev) => ({
        ...prev,
        [boardSize]: unusedSeedsList,
      }));
    },
    [mainPackSeeds, unusedSeeds, setMainPackSeeds, setUnusedSeeds]
  );

  return (
    <div>
      <h1>Seeds Manager</h1>
      <Button onClick={onClickProcessNewSeeds}>Process new seeds</Button>
      <Button onClick={onClickSaveSeeds}>Save seeds</Button>
      <Stack>
        Currently used seeds:
        {Object.keys(mainPackSeeds).map((size) => (
          <div>
            {size}: {mainPackSeeds[size].length}{" "}
            <SeedNumberInput
              onSubmit={(newNumSeeds) =>
                updateMainPackSeedsSize({
                  boardSize: Number(size),
                  newNumSeeds,
                })
              }
            />
          </div>
        ))}
      </Stack>
      <Stack>
        Currently unused seeds:
        {Object.keys(unusedSeeds).map((size) => (
          <div>
            {size}: {unusedSeeds[size].length}
          </div>
        ))}
      </Stack>
      {/* {LEVEL_PACKS.map((pack) => (
        <div>{pack.displayName}</div>
      ))} */}
    </div>
  );
};
