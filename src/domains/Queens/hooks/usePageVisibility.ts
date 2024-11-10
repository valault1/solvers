import React from "react";
import { useState, useEffect } from "react";

const usePageVisibility = ({
  onVisibilityChange,
  onFocusChange,
}: {
  onVisibilityChange?: (newVisibility: boolean) => void;
  onFocusChange?: (newFocus: boolean) => void;
}) => {
  const [isFocused, setIsFocused] = useState(true);

  const onFocusFunction = () => {
    // do whatever when focus is gained
    setIsFocused(true);
    onFocusChange?.(true);
  };

  const onBlurFunction = () => {
    // do whatever when focus is lost
    setIsFocused(false);
    onFocusChange?.(false);
  };

  useEffect(() => {
    onFocusFunction();

    window.addEventListener("focus", onFocusFunction);
    window.addEventListener("blur", onBlurFunction);

    return () => {
      onBlurFunction();

      window.removeEventListener("focus", onFocusFunction);
      window.removeEventListener("blur", onBlurFunction);
    };
  }, []);
  const [isVisible, setIsVisible] = useState(!document.hidden);

  const handleVisibilityChange = React.useCallback(() => {
    const newVisibility = !document.hidden;
    onVisibilityChange && onVisibilityChange(newVisibility);
    setIsVisible(newVisibility);
  }, [onVisibilityChange, setIsVisible]);

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return { isVisible, isFocused };
};

export default usePageVisibility;
