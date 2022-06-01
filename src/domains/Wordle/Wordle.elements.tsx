import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
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
  color: theme.colors.textPrimary,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

export const InputWrapper = styled.div(() => ({
  // for some reason, this gap doesn't show up?
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));
export const LabelWrapper = styled.div(() => ({
  // paddingBottom: 8,
}));

export const InputRow = styled.div(() => ({
  display: "flex",
  gap: 8,
}));

export const StyledTextField = styled(TextField)<{}>({
  // input: {
  //   color: theme.colors.textPrimary,
  //   "&::placeholder": {
  //     color: "white",
  //   },
  // },
  // "& label.Mui-focused": {
  //   color: theme.colors.primary,
  // },
  // "& label": {
  //   color: theme.colors.primary,
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: theme.colors.primary,
  //   },
  //   "&:hover fieldset": {
  //     borderColor: theme.colors.primary,
  //   },
  //   "&.Mui-focused fieldset": {
  //     borderColor: theme.colors.primary,
  //   },
  // },
});

export const SubmitButton = styled(Button)<{}>({});

export const DialogContent = styled.div(() => ({
  display: "flex",
  flexWrap: "wrap",
  paddingLeft: 16,
  paddingBottom: 16,
}));

export const DialogWord = styled.div(() => ({
  // 21% is just enough that it could never make 5 columns; so always 4 columns
  flex: "1 0 21%",

  //textAlign:"center",
}));

export const DialogHeader = styled.h2(() => ({
  // Header gets its own row
  flex: "1 1 100%",
}));

export const ShowDialogButton = styled(Button)<{}>({});

export const Recommendations = styled.div(() => ({
  display: "flex",
  alignContent: "center",
  paddingBottom: 12,
  gap: 12,
}));

export const WordGeneratorContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));
