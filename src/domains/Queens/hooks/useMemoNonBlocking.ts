import * as React from "react";

export const useMemoNonBlocking = ({ callback }: { callback: () => any }) => {
  const [data, setData] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await callback();
        setData(result);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [callback]);

  return { data, loading, error };
};
