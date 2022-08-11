import { Button } from "@mui/material";
import { MainContainer } from "components/MainPage.elements";
import { TabsComponent } from "components/Tabs";
import { BlackHole } from "domains/BlackHole/BlackHole";
import { CASH_KEY, MASS_KEY } from "domains/BlackHole/constants";
import { Job } from "domains/BlackHole/Job";
import { Item, ItemList } from "domains/BlackHole/sharedTypes";
import { emptyInventory } from "domains/BlackHole/shop/items";
import { Shop } from "domains/BlackHole/shop/Shop";
import * as React from "react";

export const BlackHoleSimulator = () => {
  const [mass, setMass] = React.useState(
    parseFloat(localStorage.getItem(MASS_KEY))
  );
  const [cash, setCash] = React.useState(
    parseInt(localStorage.getItem(CASH_KEY))
  );
  const [inventory, setInventory] = React.useState<ItemList[]>(emptyInventory);
  React.useEffect(() => {
    localStorage.setItem(MASS_KEY, `${mass}`);
  }, [mass]);
  React.useEffect(() => {
    localStorage.setItem(CASH_KEY, `${cash}`);
  }, [cash]);

  const incrementMass = (amount: number) => {
    setMass((prev) => prev + amount);
  };

  const addItemToInventory = (item: Item) => {
    const copy = [...inventory];
    copy.find((a) => a.item.id === item.id).quantity += 1;
    setInventory(copy);
  };

  const getPaid = (amount: number) => {
    setCash((prev) => prev + amount);
  };

  const pay = (amount: number) => {
    setCash((prev) => prev - amount);
  };

  const removeItemFromInventory = (item: Item) => {
    const copy = [...inventory];
    copy.find((a) => a.item.id === item.id).quantity -= 1;
    setInventory(copy);
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
          payForItem={pay}
        />
      ),
    },
    {
      id: "job",
      label: "Job",
      component: <Job cash={cash} getPaid={getPaid} />,
    },
  ];

  return (
    <MainContainer>
      {true && (
        <Button variant="contained" onClick={() => setMass(0)}>
          reset mass
        </Button>
      )}
      <TabsComponent ariaLabel="black-hole-tabs" tabs={tabs} />
    </MainContainer>
  );
};
