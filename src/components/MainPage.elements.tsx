import styled from "@emotion/styled";
import { theme } from "./theme/theme";

export const MainContainer = styled.div<{ gap?: any; paddingBottom?: any }>(
  ({ gap, paddingBottom = 40 }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    color: theme.colors.textPrimary,
    paddingTop: 12,
    gap,
    paddingBottom,
  })
);
