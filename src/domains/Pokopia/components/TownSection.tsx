import React, { useState } from "react";
import styled from "@emotion/styled";
import { Section, Pokemon } from "../types";
import { HouseComponent } from "./House";
import { Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const SectionContainer = styled.div`
  margin-bottom: 32px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 16px;
`;

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TitleText = styled.h2`
  color: white;
  margin: 0;
  cursor: pointer;
  
  &:hover {
    color: #ccc;
  }
`;

const HousesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

type Props = {
    section: Section;
    onUpdateName: (name: string) => void;
    onRemoveSection: () => void;
    onAddHouse: () => void;
    onRemoveHouse: (sectionId: string, houseId: string) => void;
    onPlacePokemon: (pokemon: Pokemon, targetSectionId: string, targetHouseId: string, targetSlotIndex: number, source?: { sectionId: string; houseId: string; slotIndex: number }) => void;
    onRemovePokemon: (sectionId: string, houseId: string, slotIndex: number) => void;
};

export const TownSectionComponent: React.FC<Props> = ({
    section,
    onUpdateName,
    onRemoveSection,
    onAddHouse,
    onRemoveHouse,
    onPlacePokemon,
    onRemovePokemon
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(section.name);

    const handleSaveName = () => {
        onUpdateName(editName);
        setIsEditing(false);
    };

    return (
        <SectionContainer>
            <SectionHeader>
                <SectionTitleRow>
                    {isEditing ? (
                        <TextField
                            size="small"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={handleSaveName}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSaveName(); }}
                            autoFocus
                            sx={{ input: { color: "white" } }}
                        />
                    ) : (
                        <TitleText onClick={() => setIsEditing(true)}>{section.name}</TitleText>
                    )}
                    <IconButton onClick={onRemoveSection} color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                </SectionTitleRow>
                <Button variant="contained" startIcon={<AddIcon />} onClick={onAddHouse}>
                    Add House
                </Button>
            </SectionHeader>
            <HousesGrid>
                {section.houses.map((house, index) => (
                    <HouseComponent
                        key={house.id}
                        sectionId={section.id}
                        house={house}
                        index={index}
                        onPlacePokemon={onPlacePokemon}
                        onRemovePokemon={onRemovePokemon}
                        onRemoveHouse={onRemoveHouse}
                    />
                ))}
            </HousesGrid>
        </SectionContainer>
    );
};
