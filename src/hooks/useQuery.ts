import React from "react";

export type HttpMethod = "POST" | "GET";

export type QueryInput = {
  url: string;
  method: HttpMethod;
  body?: any;
  queryParams?: string;
  headers?: any;
  shouldLog?: boolean;
};

export const useQuery = ({
  url,
  method,
  body,
  headers,
  queryParams,
  shouldLog,
}: QueryInput) => {
  const [data, setData] = React.useState<any>(undefined);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const queryTime = React.useMemo(() => {
    return (endTime.getTime() - startTime.getTime()) / 1000;
  }, [startTime, endTime]);
  React.useEffect(() => {
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
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setEndTime(new Date());
      });
  }, [url, method, body, headers, queryParams, shouldLog]);

  return { data, error, loading, queryTime };
};
