import { MainContainer } from "components/MainPage.elements";
import { BASE_URL } from "domains/MTG/constants";
import { useQuery } from "hooks/useQuery";

import * as React from "react";

//const NUM_OPERATIONS = 1000000000; //  1,000,000,000 operations took .5 seconds on my m1, and 21 seconds on the pixel. then 11 seconds on the iphone 15, and 20 s on iphone 8
const NUM_OPERATIONS = 10000; // interestingly, 100,000,000 took .295 s on the pixel... and 1.3 seconds on the iphone 15 (on ish shell), and 2.25 s on the iphone 8
export const Tasks: React.VFC = () => {
  const url = `${BASE_URL}/test?numOperations=${NUM_OPERATIONS}`;
  console.log({ url });
  const { data, loading, error, queryTime } = useQuery({
    url,
    method: "GET",
    shouldLog: true,
  });

  console.log({ data, loading, error });
  return (
    <MainContainer>
      Welcome to tasks, Val<br></br>
      {JSON.stringify(data)}
      <br />
      Queried in {queryTime}s
    </MainContainer>
  );
};
