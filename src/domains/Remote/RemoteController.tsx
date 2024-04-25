import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { COMMANDS } from "domains/Remote/constants";
import { RemoteCommand } from "domains/Remote/sharedTypes";
import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import styled from "@emotion/styled";

type RemoteControllerProps = {};

const ButtonContainer = styled.div(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 12,
}));

const default_config = {
  config: {
    headers: {
      Accept: "application/json",
    },
    params: {},
  },
};
const sendRequest = (url: string, args?: any) => {
  console.log(url);
  axios.get(`${url}`, default_config as AxiosRequestConfig<any>);
};

export const RemoteController = ({}: RemoteControllerProps) => {
  return (
    <MainContainer>
      buttons:
      <ButtonContainer>
        {Object.keys(COMMANDS).map((command) => {
          const url = COMMANDS[command as RemoteCommand];
          return (
            <PrimaryButton onClick={() => sendRequest(url)} key={command}>
              {command}
            </PrimaryButton>
          );
        })}
      </ButtonContainer>
    </MainContainer>
  );
};
