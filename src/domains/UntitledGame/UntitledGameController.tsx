import React from "react";
import { theme } from "theme";
import styled from "@emotion/styled";
import { Columns, Rows, AssetSize } from "domains/UntitledGame/components/MainPage";
//import { MainCard } from "domains/Wordle/Wordle.elements";


export const UntitledGameController = () => { 
    const [size, setSize] = React.useState(0);
       

   const addSize = () => {
    setSize(size + 1);
  }

return (
    
    <Rows>
        <Columns>
        <AssetSize><img src={require('domains/UntitledGame/assets/Egg_1.png')} alt="" /></AssetSize> 
        </Columns>
        
        <Columns>
            <h1>The UntitledGame Title</h1>

            <div>Welcome to the home of my game someday! </div>
            <div> TEST : Size = {size} </div>
            <button onClick={addSize}> TEST </button>
        </Columns>



    </Rows>


          
    )
          
}