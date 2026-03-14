import { useState, useEffect } from "react";
import { Section, Pokemon } from "./types";

export const usePokopiaState = () => {
    const [sections, setSections] = useState<Section[]>(() => {
        const saved = localStorage.getItem("pokopia_town_layout");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse town layout", e);
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("pokopia_town_layout", JSON.stringify(sections));
    }, [sections]);

    const addSection = () => {
        const newId = Math.random().toString(36).substring(7);
        setSections([...sections, { id: newId, name: "New Section", houses: [] }]);
    };

    const removeSection = (sectionId: string) => {
        setSections(sections.filter(s => s.id !== sectionId));
    };

    const updateSectionName = (sectionId: string, name: string) => {
        setSections(sections.map(s => s.id === sectionId ? { ...s, name } : s));
    };

    const addHouse = (sectionId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    houses: [...s.houses, {
                        id: Math.random().toString(36).substring(7),
                        slots: [null, null, null, null]
                    }]
                };
            }
            return s;
        }));
    };

    const removeHouse = (sectionId: string, houseId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    houses: s.houses.filter(h => h.id !== houseId)
                };
            }
            return s;
        }));
    };

    const placePokemon = (
        pokemon: Pokemon,
        targetSectionId: string,
        targetHouseId: string,
        targetSlotIndex: number,
        source?: { sectionId: string, houseId: string, slotIndex: number }
    ) => {
        setSections(currentSections => {
            const nextSections = JSON.parse(JSON.stringify(currentSections)) as Section[];

            // If it originated from another slot, remove it from the old slot
            if (source) {
                const sourceSection = nextSections.find(s => s.id === source.sectionId);
                if (sourceSection) {
                    const sourceHouse = sourceSection.houses.find(h => h.id === source.houseId);
                    if (sourceHouse) {
                        sourceHouse.slots[source.slotIndex] = null;
                    }
                }
            }

            // Drop it into the target slot
            const targetSection = nextSections.find(s => s.id === targetSectionId);
            if (targetSection) {
                const targetHouse = targetSection.houses.find(h => h.id === targetHouseId);
                if (targetHouse) {
                    targetHouse.slots[targetSlotIndex] = pokemon;
                }
            }

            return nextSections;
        });
    };

    const removePokemon = (sectionId: string, houseId: string, slotIndex: number) => {
        setSections(currentSections => {
            const nextSections = JSON.parse(JSON.stringify(currentSections)) as Section[];
            const section = nextSections.find(s => s.id === sectionId);
            if (section) {
                const house = section.houses.find(h => h.id === houseId);
                if (house) {
                    house.slots[slotIndex] = null;
                }
            }
            return nextSections;
        });
    };

    return {
        sections,
        addSection,
        removeSection,
        updateSectionName,
        addHouse,
        removeHouse,
        placePokemon,
        removePokemon
    };
};
