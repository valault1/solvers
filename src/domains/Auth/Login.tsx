import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import * as React from "react";
import { MainContainer } from "components/MainPage.elements";
import { useAuth } from "domains/Auth/useAuth";
import { PrimaryButton } from "components/Form.elements";

export const Login = () => {
  const { session, supabaseClient, logout } = useAuth();
  console.log({ session });
  return (
    <MainContainer>
      {!session ? (
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
        />
      ) : (
        <>
          <div>Logged in!</div>
          <PrimaryButton onClick={logout}>Log out</PrimaryButton>
        </>
      )}
    </MainContainer>
  );
};
