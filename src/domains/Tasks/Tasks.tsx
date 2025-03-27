import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
} from "@mui/material";
import { PrimaryButton, TextInput } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { BASE_URL } from "domains/MTG/constants";
import { useQuery } from "hooks/useQuery";

import * as React from "react";

//const NUM_OPERATIONS = 1000000000; //  1,000,000,000 operations took .5 seconds on my m1, and 21 seconds on the pixel. then 11 seconds on the iphone 15, and 20 s on iphone 8
const NUM_OPERATIONS = 10000; // interestingly, 100,000,000 took .295 s on the pixel... and 1.3 seconds on the iphone 15 (on ish shell), and 2.25 s on the iphone 8
export const Tasks: React.VFC = () => {
  const [numOperations, setnumOperations] = React.useState(
    NUM_OPERATIONS.toString()
  );
  const [baseUrl, setBaseUrl] = React.useState(BASE_URL);
  const url = React.useMemo(
    () => `${baseUrl}/test?numOperations=${numOperations}`,
    [numOperations, baseUrl]
  );
  const { data, loading, error, queryTime, runQuery } = useQuery({
    url,
    method: "GET",
    shouldLog: true,
    shouldQueryOnInputChange: false,
  });

  console.log({ data, loading, error });
  return (
    <MainContainer>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextInput
            label="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
          />
          <TextInput
            label="numOperations"
            value={numOperations}
            onChange={(e) => setnumOperations(e.target.value)}
          />
          <PrimaryButton onClick={() => runQuery()}>Query</PrimaryButton>
        </Stack>
        {loading ? (
          <Stack
            sx={{ width: "100%", height: "200px" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <div>
            <Card>
              <CardHeader title="Response" />
              <CardContent>
                <Stack spacing={2}>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                  {data && <div> Queried in {queryTime}s</div>}
                  {error && <div>ERROR: {error}</div>}
                </Stack>
              </CardContent>
            </Card>
          </div>
        )}
      </Stack>
    </MainContainer>
  );
};
