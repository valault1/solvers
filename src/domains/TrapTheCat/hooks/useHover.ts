import { CSSProperties } from "react";
import * as React from "react";
export function useHover(
  styleOnHover: CSSProperties,
  styleOnNotHover: CSSProperties = {},
  allowHover: boolean = true
) {
  const [isHovering, setIsHovering] = React.useState(false);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  return {
    style: isHovering ? styleOnHover : styleOnNotHover,
    onMouseEnter,
    onMouseLeave,
  };
}
