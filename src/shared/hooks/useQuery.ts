import React from "react";

export type HttpMethod = "POST" | "GET";

export type QueryInput = {
  url: string;
  method: HttpMethod;
  body?: any;
  queryParams?: string;
  headers?: any;
  shouldLog?: boolean;
  shouldQueryOnInputChange?: boolean;
};

export const useQuery = ({
  url,
  method,
  body,
  headers,
  queryParams,
  shouldLog,
  shouldQueryOnInputChange = true,
}: QueryInput) => {
  const [data, setData] = React.useState<any>(undefined);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const queryTime = React.useMemo(() => {
    return (endTime.getTime() - startTime.getTime()) / 1000;
  }, [startTime, endTime]);

  const runQuery = React.useCallback(() => {
    setStartTime(new Date());
    setLoading(true);
    fetch(`${url}${queryParams ? `?${queryParams}` : ""}`, {
      method,
      body: JSON.stringify(body),
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        if (shouldLog) console.log({ data });
        setData(data);
      })
      .catch((err) => {
        if (shouldLog) console.log({ err });
        setError(err.message);
        setData(undefined);
      })
      .finally(() => {
        setLoading(false);
        setEndTime(new Date());
      });
  }, [url, method, body, headers, queryParams, shouldLog]);
  React.useEffect(() => {
    if (!shouldQueryOnInputChange) return;
    runQuery();
  }, [runQuery, shouldQueryOnInputChange]);

  return { data, error, loading, queryTime, runQuery };
};
