import { MainContainer } from "components/MainPage.elements";
import { useQuery } from "hooks/useQuery";

import * as React from "react";

export const Tasks: React.VFC = () => {

  const {data, loading, error} = useQuery({url: "http://localhost:1214/getTasks", method: "GET", shouldLog: true});

  console.log({data, loading, error});
  return (
    <MainContainer>
      Welcome to tasks!<br></br>
      {data?.tasks}
    </MainContainer>
  );
};
