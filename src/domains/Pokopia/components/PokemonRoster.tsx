import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { Pokemon, Section } from "../types";
import { pokopiaData } from "../data/pokopia_data";
import { PokemonTile } from "./PokemonTile";

const RosterSidebar = styled.div`
  width: 360px;
  background: rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
`;

const RosterHeader = styled.div`
  padding: 16px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 16px;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

type Props = {
  sections: Section[];
};

export const PokemonRoster: React.FC<Props> = ({ sections }) => {
  // Memoize used pokemon to gray them out
  const usedPokemonIds = useMemo(() => {
    const ids = new Set<number>();
    sections.forEach(section => {
      section.houses.forEach(house => {
        house.slots.forEach(slot => {
          if (slot) ids.add(slot.id);
        });
      });
    });
    return ids;
  }, [sections]);

  const pokemonList = pokopiaData;

  return (
    <RosterSidebar>
      <RosterHeader>Pokemon</RosterHeader>
      <PokemonGrid>
        {pokemonList.map((pokemon) => {
          const isUsed = usedPokemonIds.has(pokemon.id);
          return (
            <div key={pokemon.id}>
              <PokemonTile pokemon={pokemon} disabled={isUsed} />
            </div>
          );
        })}
      </PokemonGrid>
    </RosterSidebar>
  );
};
