import React from "react";
import styled from "@emotion/styled";
import { Pokemon, DragItem } from "../types";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const TileContainer = styled.div<{ isDragging: boolean; disabled?: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: ${(props) => (props.isDragging ? "grabbing" : props.disabled ? "not-allowed" : "grab")};
  color: white;
  opacity: ${(props) => (props.disabled ? 0.3 : props.isDragging ? 0.5 : 1)};
  transition: transform 0.2s, background 0.2s;
  box-sizing: border-box;
  filter: ${(props) => (props.disabled ? "grayscale(100%)" : "none")};

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    background: ${(props) => (props.disabled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.15)")};
  }

  &:active {
    cursor: grabbing;
  }
`;

const PokemonImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const PokemonName = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const TypeBadge = styled.span<{ type: string }>`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${(props) => getTypeColor(props.type)};
  color: white;
  text-transform: uppercase;
`;

const SpecialtyLabel = styled.div`
  font-size: 11px;
  color: #ccc;
  margin-top: 6px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoLabel = styled.div`
  font-size: 10px;
  color: #bbb;
  margin-top: 4px;
  text-align: center;
  width: 100%;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  strong {
    color: #fff;
  }
`;

const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        Normal: "#A8A77A",
        Fire: "#EE8130",
        Water: "#6390F0",
        Electric: "#F7D02C",
        Grass: "#7AC74C",
        Ice: "#96D9D6",
        Fighting: "#C22E28",
        Poison: "#A33EA1",
        Ground: "#E2BF65",
        Flying: "#A98FF3",
        Psychic: "#F95587",
        Bug: "#A6B91A",
        Rock: "#B6A136",
        Ghost: "#735797",
        Dragon: "#6F35FC",
        Dark: "#705898",
        Steel: "#B7B7CE",
        Fairy: "#D685AD",
    };
    return colors[type] || "#777";
};

type Props = {
    pokemon: Pokemon;
    source?: { sectionId: string; houseId: string; slotIndex: number };
    disabled?: boolean;
};

export const PokemonTile: React.FC<Props> = ({ pokemon, source, disabled = false }) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        setIsDragging(true);
        const item: DragItem = {
            type: "POKEMON",
            pokemon,
            source,
        };
        e.dataTransfer.setData("application/json", JSON.stringify(item));
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <TileContainer
            draggable={!disabled}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            isDragging={isDragging}
            disabled={disabled}
        >
            <PokemonImage src={pokemon.image} alt={pokemon.name} />
            <PokemonName>{pokemon.name}</PokemonName>
            <TypesContainer>
                {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type}>
                        {type}
                    </TypeBadge>
                ))}
            </TypesContainer>
            <Tooltip
                title={(() => {
                    const specs = pokemon.specialties || [(pokemon as any).specialty].filter(Boolean);
                    const list = specs.length > 0 ? specs : ((pokemon as any).abilities || []);
                    const drop = pokemon.itemDrop || ((pokemon as any).drops && (pokemon as any).drops[0]);
                    return list.map((s: any) => {
                        const isLitter = s === "Litter" || s === "Litter Specialty";
                        return isLitter && drop ? `Litter (${drop})` : s;
                    }).join(", ");
                })()}
                placement="top"
                arrow
            >
                <SpecialtyLabel>
                    {(() => {
                        const specs = pokemon.specialties || [(pokemon as any).specialty].filter(Boolean);
                        const list = specs.length > 0 ? specs : ((pokemon as any).abilities || []);
                        const drop = pokemon.itemDrop || ((pokemon as any).drops && (pokemon as any).drops[0]);

                        return list.map((s: any, i: number) => {
                            const isLitter = s === "Litter" || s === "Litter Specialty";
                            return (
                                <React.Fragment key={i}>
                                    {i > 0 && ", "}
                                    {isLitter && drop ? (
                                        <span>
                                            Litter (<span style={{ color: "#F7D02C" }}>{drop}</span>)
                                        </span>
                                    ) : (
                                        <span>{s}</span>
                                    )}
                                </React.Fragment>
                            );
                        });
                    })()}
                </SpecialtyLabel>
            </Tooltip>
            <InfoLabel style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <strong>Habitat:</strong> {pokemon.idealHabitat || "Unknown"}
                <Tooltip title={`Loves: ${(pokemon.favorites || []).join(", ") || "Unknown"}`} placement="top" arrow>
                    <InfoOutlinedIcon sx={{ fontSize: 14, cursor: "pointer", color: "#A98FF3" }} />
                </Tooltip>
            </InfoLabel>
        </TileContainer>
    );
};
