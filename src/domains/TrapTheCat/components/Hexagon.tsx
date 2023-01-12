import { lighten } from "@mui/material";
import { useHover } from "domains/TrapTheCat/hooks/useHover";
import * as React from "react";
export const Hexagon = ({
  color,
  allowHover,
  onClickHex,
}: {
  color: string;
  allowHover?: boolean;
  onClickHex: () => void;
}) => {
  const hoverColor = lighten(color, 0.5);
  const normalStyle = { color, fill: color };
  const hoverStyle = allowHover
    ? {
        color: hoverColor,
        fill: hoverColor,
        cursor: "pointer",
      }
    : normalStyle;

  const hover = useHover(hoverStyle, normalStyle, !!allowHover);
  const onClick = () => {
    onClickHex();
    hover.onMouseLeave();
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0.5 0.5 102 102"
      style={{
        display: "flex",
      }}
    >
      <polygon
        points="50 3,100 28,100 75, 50 100,3 75,3 25,50,3"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="8"
        onClick={onClickHex}
        {...hover}
        style={{
          ...hover.style,
          ...{
            position: "relative",
            zIndex: 1,
          },
        }}
      />
    </svg>
  );
};
