import styled from "@emotion/styled";
import { Card, Collapse, lighten, TableRow } from "@mui/material";
import { Title } from "domains/Reviews/api";
import { ReviewCard } from "domains/Reviews/ReviewCard";
import * as React from "react";
import { theme } from "theme";

export const ROW_WIDTH = 300;

const ReviewCardMain = styled.div(() => ({
  display: "flex",
  gap: 4,
}));

type ReviewDrawerProps = {
  titleInfo: Title;
};

const ReviewCardContent = styled.div(() => ({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));

const RowWrapper = styled.div(() => ({
  display: "flex",
  justifyContent: "space-around",
  padding: 20,
  gap: 8,
  width: ROW_WIDTH,
  ":hover, :focus": {
    cursor: "pointer",
    backgroundColor: lighten(theme.colors.background, 0.2),
  },
}));

export const ReviewDrawer: React.VFC<ReviewDrawerProps> = ({ titleInfo }) => {
  return (
    <Card>
      <RowWrapper>{titleInfo.title}</RowWrapper>
    </Card>
  );
};
