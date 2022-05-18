import styled from "@emotion/styled";
import { theme } from "../../../theme";

export const MainContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: "2",
  borderColor: "divider",
  backgroundColor: theme.colors.background,
  padding: 20,
}));
