export type Specialty = "Plant" | "Burn" | "Water Gun" | "Charge" | "Litter" | "Recycle" | "Legendary" | "Smash" | "Sleep" | string;

export const CARD_HEIGHT = 190;
export type Pokemon = {
    id: number;
    name: string;
    types: string[];
    specialties: Specialty[];
    itemDrop?: string;
    idealHabitat: string;
    favorites: string[];
    image: string;
};

export type Slot = Pokemon | null;

export type House = {
    id: string;
    slots: [Slot, Slot, Slot, Slot];
};

export type Section = {
    id: string;
    name: string;
    houses: House[];
};

export type DragItem = {
    type: "POKEMON";
    pokemon: Pokemon;
    source?: {
        sectionId: string;
        houseId: string;
        slotIndex: number;
    };
};
