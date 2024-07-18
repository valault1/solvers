import usePageVisibility from "domains/Queens/hooks/usePageVisibility";
import * as React from "react";
import { Timer } from "shared/helpers/Timer";

const TIMER_UPDATE_INTERVAL_MS = 200;
export const useBoardTimer = () => {
  const [timeTaken, setTimeTaken] = React.useState(0);
  const { current: timer } = React.useRef(new Timer());

  React.useEffect(() => {
    const interval = setInterval(
      () => setTimeTaken(timer.getTime()),
      TIMER_UPDATE_INTERVAL_MS
    );

    return () => clearInterval(interval);
  }, [setTimeTaken, timer]);
  const onFocusChange = React.useCallback(
    (newFocus: boolean) => {
      if (newFocus) {
        timer.start();
      } else {
        timer.stop();
      }
    },
    [timer]
  );
  const onVisibilityChange = React.useCallback(
    (newVisibility: boolean) => {
      if (newVisibility) {
        timer.start();
      } else {
        timer.stop();
      }
    },
    [timer]
  );

  const { isFocused, isVisible } = usePageVisibility({ onFocusChange });

  return { timeTaken, isVisible, isFocused };
};
