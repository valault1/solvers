import styled from "@emotion/styled";
import { theme } from "theme";

export const Rows = styled.div(() => ({
    display: "flex",
    height: "auto",
 width: "1%",
}));

export const Columns = styled.div(() => ({
 flexDirection: "column",
 justifyContent: "center",
 alignItems: "center",
 

 paddingTop: 20,
 color: theme.colors.textPrimary,
 
 display: "block",
 marginLeft: "auto",
 marginRight: "auto",
 height: "auto",
 width: "1%",

}));


export const AssetSize = styled.div(() => ({
 //maxWidth: "100%",
 height: "auto",
 width: "1%",
 //height: "1px",

}));