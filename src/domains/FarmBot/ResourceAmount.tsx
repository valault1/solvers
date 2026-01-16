import { Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import * as React from "react";

export const ResourceAmount: React.FC<{
  label: string;
  formula: () => number;
}> = ({ label, formula }) => {
  const spanRef = React.useRef();

  React.useEffect(() => {
    let running = true;

    function tick() {
      if (!running) return;

      // computeValue = () => some formula factoring in factories, upgrades, etc.
      const val = formula();

      // Update DOM directly — no React rerender
      // @ts-ignore
      spanRef.current.textContent = val.toLocaleString();

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

    return () => {
      running = false;
    };
  }, [formula]);
  return (
    <Stack direction={"row"}>
      <div>{label}</div>
      <span ref={spanRef}>{formula()}</span>
    </Stack>
  );
};
