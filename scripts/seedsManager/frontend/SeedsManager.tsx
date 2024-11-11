import React from "react";
import { LEVEL_PACKS } from "./sharedTypes";
import { Button } from "@mui/material";

export const SeedsManager = () => {
  const [seeds, setSeeds] = React.useState("");
  const onClickProcessNewSeeds = () => {
    console.log("sending call to process new seeds");
    fetch("api/processNewSeeds")
      .then((res) => res.json())
      .then((data) => {
        console.log("got result!");
        console.log({ seeds: data.seeds });
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
  return (
    <div>
      <h1>Seeds Manager</h1>
      <Button onClick={onClickProcessNewSeeds}>Process new seeds</Button>
      {LEVEL_PACKS.map((pack) => (
        <div>{pack.displayName}</div>
      ))}
    </div>
  );
};
