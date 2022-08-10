import { Button } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import { BlackHole } from "domains/BlackHole/BlackHole";
import { MASS_KEY } from "domains/BlackHole/constants";
import { Item } from "domains/BlackHole/sharedTypes";
import { Shop } from "domains/BlackHole/shop/Shop";
import React, { useEffect } from "react";

export const BlackHoleSimulator = () => {
  const [mass, setMass] = React.useState(
    parseInt(localStorage.getItem(MASS_KEY))
  );
  const [cash, setCash] = React.useState(0);
  const [inventory, setInventory] = React.useState<Item[]>([]);
  useEffect(() => {
    localStorage.setItem(MASS_KEY, `${mass}`);
  }, [mass]);

  const incrementMass = (amount: number) => {
    setMass((prev) => prev + amount);
  };

  const addItemToInventory = (item: Item) => {
    setInventory((prev) => [...prev, item]);
  };

  const removeItemFromInventory = (index: number) => {
    setInventory((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return [...copy];
    });
  };
  const tabs = [
    {
      id: "black-hole",
      label: "Black Hole",
      component: (
        <BlackHole
          mass={mass}
          incrementMass={incrementMass}
          inventory={inventory}
          removeItemFromInventory={removeItemFromInventory}
        />
      ),
    },
    {
      id: "shop",
      label: "Shop",
      component: (
        <Shop
          cash={cash}
          addItemToInventory={addItemToInventory}
          inventory={inventory}
        />
      ),
    },
  ];

  return (
    <MainContainer>
      {false && (
        <Button variant="contained" onClick={() => setMass(0)}>
          reset mass
        </Button>
      )}
      <TabsComponent ariaLabel="black-hole-tabs" tabs={tabs} />
    </MainContainer>
  );
};
