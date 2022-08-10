import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { theme } from "src/theme";

export const MainCard = styled.div(() => ({
  color: theme.colors.textPrimary,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

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
