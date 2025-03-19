import { Card, CardContent, Collapse, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { IoCaretDown, IoCaretForward } from "react-icons/io5";

export const CollapsibleCard = ({
  title,
  content,
}: {
  title?: React.ReactNode;
  content?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => setOpen((prev) => !prev);

  return (
    <div>
      <Card sx={{ marginTop: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          onClick={toggleCollapse}
          sx={{ cursor: "pointer", padding: 2 }}
        >
          <div>{open ? <IoCaretDown /> : <IoCaretForward />}</div>
          <div>{title}</div>
        </Stack>

        <Collapse in={open}>
          <CardContent>{content}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
