/* eslint-disable react/require-default-props */
import { Card, CardContent, Collapse, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { theme } from "components/theme/theme";

// eslint-disable-next-line import/prefer-default-export
export function CollapsibleCard({
  title,
  content,
}: {
  title?: React.ReactNode;
  content?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => setOpen((prev) => !prev);

  return (
    <div>
      <Card sx={{ marginTop: 2, backgroundColor: theme.colors.primary }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          onClick={toggleCollapse}
          sx={{ cursor: "pointer", padding: 2 }}
        >
          <div>{open ? <ArrowDropDown /> : <ArrowRight />}</div>
          <div>{title}</div>
        </Stack>

        <Collapse in={open}>
          <CardContent>{content}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
