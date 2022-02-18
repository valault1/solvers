import styled from "@emotion/styled";
import { theme } from "../../theme";

export const TheTowerContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: "2",
  borderColor: "divider",
  backgroundColor: theme.colors.background,
  padding: 20,
}));

export const MainCard = styled.div(() => ({
  backgroundColor: theme.colors.primary,
  color: theme.colors.background,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const InputWrapper = styled.div(() => ({}));
export const LabelWrapper = styled.div(() => ({}));
