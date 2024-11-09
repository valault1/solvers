import { MenuItem, Select, Stack } from "@mui/material";
import { SIDE_LENGTH_OPTIONS } from "domains/Queens/boards/seeds";
import * as React from "react";

export const BoardSizeSelect = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (num: number) => void;
}) => {
  return (
    <Stack direction="column" gap={2}>
      <Select
        value={value}
        native={false}
        onChange={(e) => {
          const val = e.target.value;
          // @ts-ignore
          onChange(val);
        }}
        fullWidth
        size="small"
      >
        {SIDE_LENGTH_OPTIONS.map((length) => (
          <MenuItem value={length} key={length}>
            {length}x{length}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
