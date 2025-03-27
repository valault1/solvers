import { MainContainer } from "components/MainPage.elements";
import { BASE_URL } from "domains/MTG/constants";
import { useQuery } from "hooks/useQuery";

import * as React from "react";

const NUM_OPERATIONS = 1000000000;
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
      {data?.result}
      <br />
      Queried in {queryTime}s
    </MainContainer>
  );
};
