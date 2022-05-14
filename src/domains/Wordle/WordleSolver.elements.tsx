import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { theme } from "../../theme";

export const MainContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  borderBottom: "2",
  borderColor: "divider",
  color: theme.colors.textPrimary,
  paddingTop: 12,
}));
export const MainCard = styled.div(() => ({
  backgroundColor: theme.colors.primary,
  color: theme.colors.background,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const InputWrapper = styled.div(() => ({
  // for some reason, this gap doesn't show up?
  gap: 8,
}));
export const LabelWrapper = styled.div(() => ({
  paddingBottom: 8,
}));

export const InputRow = styled.div(() => ({
  display: "flex",
  gap: 8,
}));

export const SubmitButton = styled(Button)<{}>({
  backgroundColor: theme.colors.secondary,
});
