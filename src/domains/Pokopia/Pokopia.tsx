import React from "react";
import styled from "@emotion/styled";
import { PokemonRoster } from "./components/PokemonRoster";
import { TownSectionComponent } from "./components/TownSection";
import { usePokopiaState } from "./usePokopiaState";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1e1e2f 0%, #12121a 100%);
  color: white;
  overflow: hidden;
`;

const MainCanvas = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px;
`;

const CanvasHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
  background: -webkit-linear-gradient(45deg, #FFD700, #F08080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Pokopia: React.FC = () => {
    const {
        sections,
        addSection,
        removeSection,
        updateSectionName,
        addHouse,
        removeHouse,
        placePokemon,
        removePokemon
    } = usePokopiaState();

    return (
        <AppContainer>
            <PokemonRoster sections={sections} />
            <MainCanvas>
                <CanvasHeader>
                    <Title>Pokopia Town Planner</Title>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={addSection}>
                        Add Section
                    </Button>
                </CanvasHeader>

                {sections.map(section => (
                    <TownSectionComponent
                        key={section.id}
                        section={section}
                        onUpdateName={(name) => updateSectionName(section.id, name)}
                        onRemoveSection={() => removeSection(section.id)}
                        onAddHouse={() => addHouse(section.id)}
                        onRemoveHouse={removeHouse}
                        onPlacePokemon={placePokemon}
                        onRemovePokemon={removePokemon}
                    />
                ))}

                {sections.length === 0 && (
                    <div style={{ textAlign: "center", color: "rgba(255, 255, 255, 0.5)", marginTop: "64px" }}>
                        <h2>Welcome to Pokopia!</h2>
                        <p>Click "Add Section" to start building your town.</p>
                    </div>
                )}
            </MainCanvas>
        </AppContainer>
    );
};
