import styled from "@emotion/styled";
import { theme } from "../../../../theme";

export const MainContainer = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: "2",
  borderColor: "divider",
  backgroundColor: theme.colors.background,
  padding: 20,
}));

export const MainCalculatorContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderBottom: "2",
  borderColor: "divider",
  padding: 20,
}));

export const FieldsWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 12,
}));

export const TabsWrapper = styled.div(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderBottom: "2",
  borderColor: "divider",
}));
