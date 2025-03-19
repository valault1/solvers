import React from "react";
import { QueryInput } from "./useQuery";

export const useQueries = (queries: QueryInput[]) => {
  const [datas, setDatas] = React.useState<any[]>(
    Array.from({ length: queries.length }, () => undefined)
  );
  const [errors, setErrors] = React.useState<string[]>(
    Array.from({ length: queries.length }, () => "")
  );
  const [loadings, setLoadings] = React.useState<boolean[]>(
    Array.from({ length: queries.length }, () => false)
  );
  const isLoading = React.useMemo(() => loadings.some((l) => l), [loadings]);
  React.useEffect(() => {
    setLoadings(Array.from({ length: queries.length }, () => true));
    setErrors(Array.from({ length: queries.length }, () => ""));
    setDatas(Array.from({ length: queries.length }, () => undefined));
    queries.forEach((query, index) => {
      const { url, method, body, headers, queryParams, shouldLog } = query;
      fetch(`${url}${queryParams ? `?${queryParams}` : ""}`, {
        method,
        body: JSON.stringify(body),
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          if (shouldLog) console.log({ data });
          setDatas((prev) => {
            const result = [...prev];
            result[index] = data;
            return result;
          });
        })
        .catch((err) => {
          if (shouldLog) console.log({ err });
          setErrors((prev) => {
            const result = [...prev];
            result[index] = err;
            return result;
          });
        })
        .finally(() => {
          setLoadings((prev) => {
            const result = [...prev];
            result[index] = false;
            return result;
          });
        });
    });
  }, [queries]);

  return { datas, errors, loadings, isLoading };
};
