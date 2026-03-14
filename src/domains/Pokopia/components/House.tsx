import React from "react";
import styled from "@emotion/styled";
import { House, DragItem, Pokemon, CARD_HEIGHT } from "../types";
import { PokemonTile } from "./PokemonTile";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

const HouseContainer = styled.div`
  background: rgba(20, 20, 30, 0.6);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  width: 300px;
`;

const HouseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  color: white;
  font-weight: 500;
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
`;

const SlotContainer = styled.div<{ isOver: boolean }>`
  background: ${(props) =>
        props.isOver ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.3)"};
  border-radius: 8px;
  border: 2px dashed
    ${(props) =>
        props.isOver ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: relative;
  height: ${CARD_HEIGHT}px;
`;

const EmptySlotContent = styled.div`
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  text-align: center;
`;

const RemovePokemonButton = styled(IconButton)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
  padding: 2px !important;
  z-index: 10;
  
  &:hover {
    background: rgba(200, 50, 50, 0.9) !important;
  }
`;

type Props = {
    sectionId: string;
    house: House;
    index: number;
    onPlacePokemon: (
        pokemon: Pokemon,
        targetSectionId: string,
        targetHouseId: string,
        targetSlotIndex: number,
        source?: { sectionId: string; houseId: string; slotIndex: number }
    ) => void;
    onRemovePokemon: (sectionId: string, houseId: string, slotIndex: number) => void;
    onRemoveHouse: (sectionId: string, houseId: string) => void;
};

export const HouseComponent: React.FC<Props> = ({
    sectionId,
    house,
    index,
    onPlacePokemon,
    onRemovePokemon,
    onRemoveHouse,
}) => {
    const [dragOverSlot, setDragOverSlot] = React.useState<number | null>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
        e.preventDefault();
        setDragOverSlot(slotIndex);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOverSlot(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
        e.preventDefault();
        setDragOverSlot(null);
        try {
            const data = e.dataTransfer.getData("application/json");
            if (!data) return;
            const item: DragItem = JSON.parse(data);
            if (item.type === "POKEMON") {
                onPlacePokemon(item.pokemon, sectionId, house.id, slotIndex, item.source);
            }
        } catch (err) {
            console.error("Drop failed", err);
        }
    };

    return (
        <HouseContainer>
            <HouseHeader>
                <span>House {index + 1}</span>
                <IconButton size="small" onClick={() => onRemoveHouse(sectionId, house.id)} color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </HouseHeader>
            <SlotsGrid>
                {house.slots.map((slot, i) => (
                    <SlotContainer
                        key={i}
                        isOver={dragOverSlot === i}
                        onDragOver={(e) => handleDragOver(e, i)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, i)}
                    >
                        {slot ? (
                            <>
                                <RemovePokemonButton onClick={() => onRemovePokemon(sectionId, house.id, i)}>
                                    <ClearIcon fontSize="inherit" />
                                </RemovePokemonButton>
                                <PokemonTile
                                    pokemon={slot}
                                    source={{ sectionId, houseId: house.id, slotIndex: i }}
                                />
                            </>
                        ) : (
                            <EmptySlotContent>Empty Slot</EmptySlotContent>
                        )}
                    </SlotContainer>
                ))}
            </SlotsGrid>
        </HouseContainer>
    );
};
