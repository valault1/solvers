import * as React from "react";

export const useMemoNonBlocking = ({
  callback,
  initialDataValue,
  identifier,
}: {
  callback: () => Promise<any>;
  initialDataValue: any;
  identifier?: string;
}) => {
  const [data, setData] = React.useState<any>(initialDataValue);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [runDuration, setRunDuration] = React.useState<number | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setData(initialDataValue);
      setRunDuration(undefined);
      if (identifier === "solveBoard") {
        console.log("SETTING TO TRUE");
      }
      setLoading(true);
      const startTime = new Date().getTime();
      try {
        const result = await callback();
        const duration = new Date().getTime() - startTime;
        setData(result);
        setRunDuration(duration);
        if (identifier === "solveBoard") {
          console.log("SETTING TO FALSE");
          console.log({ result });
        }

        setLoading(false);
      } catch (e) {
        setError(e.message);

        setLoading(false);
      }
    };
    fetchData();
  }, [callback, initialDataValue, identifier]);

  return { data, loading, error, runDuration };
};
