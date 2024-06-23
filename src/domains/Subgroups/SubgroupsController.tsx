import styled from "@emotion/styled";
import React from "react";
import { MainContainer } from "components/MainPage.elements";
import { useSubgroups } from "domains/Subgroups/useSubgroups";
import Select from "@mui/material/Select";
import { theme } from "components/theme/theme";
import { MenuItem, Stack } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";

type SubgroupsControllerProps = {};

export const ListsContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",

  gap: 12,
}));

export const SelectContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: "200px",
  color: theme.colors.textPrimary,
}));

export const NAMES = [
  "Val",
  "Max",
  "Tanner",
  "Isaac",
  "Maggie",
  "Kate",
  "Rachel",
  "Anni",
  "Kalai",
];

const nameOptions = NAMES.map((name) => ({ value: name, label: name }));

export const SubgroupsController = ({}: SubgroupsControllerProps) => {
  const [selectedNames, setSelectedNames] = React.useState<string[]>([]);

  const formattedSelectedNames =
    selectedNames.length > 0 ? selectedNames.join(", ") : "everyone";

  const { subgroups, subgroupsWithSelectedNames } = useSubgroups({
    selectedNames,
  });

  return (
    <MainContainer>
      <Stack direction="column" gap={2}>
        Select names to see all subgroups with those names
        <Select
          value={selectedNames}
          multiple
          native={false}
          //onChange={(e, newValue) => setDropdownValue(newValue)}
          onChange={(e) => {
            const val = e.target.value;
            console.log(val);
            // @ts-ignore
            setSelectedNames(val);
          }}
          fullWidth
        >
          {NAMES.map((name) => (
            <MenuItem value={name}>{name}</MenuItem>
          ))}
        </Select>
        {selectedNames.length > 0 && (
          <PrimaryButton onClick={() => setSelectedNames([])}>
            Clear
          </PrimaryButton>
        )}
      </Stack>
      <h1>Subgroups that contain {formattedSelectedNames}</h1>
      <div>
        number of subgroups with this combination:{" "}
        {subgroupsWithSelectedNames.length}
        <br />
        <br />
      </div>
      <ListsContainer>
        {subgroupsWithSelectedNames.map((group) => (
          <li>{group.join(", ")}</li>
        ))}
      </ListsContainer>
    </MainContainer>
  );
};
