
import { Stack } from "@mui/material";
import { PrimaryButton, TextInput } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { SOURCES } from "domains/TreasureHunt/sources";
import * as React from "react";

const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

export const TreasureHunt = () => {

  const [searchText, setSearchText] = React.useState<string>("");
  return <MainContainer>
    <h1>Treasure Hunt</h1>
    <Stack spacing={2}>
      <TextInput label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}></TextInput>
    
      {SOURCES.map((source) => {
      return (
        <PrimaryButton onClick={() => handleClick(source.getUrl(searchText))}>
          {source.name}
        </PrimaryButton>
      );
    })}
    </Stack>
  </MainContainer>;

};
