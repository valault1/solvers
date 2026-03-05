/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

// Styling for individual hexagons
const Hex = styled.div`
  width: 100px;
  color: black;
  aspect-ratio: 1 / 1;
  background-color: white;
  clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Container for all hexagons
const FlowerContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
`;

// Positioning helper
const getHexOffset = (index: number, radius: number) => {
  const angleDeg = 60 * index - 30; // Hex grid offset angle
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = radius * Math.cos(angleRad);
  const y = radius * Math.sin(angleRad);
  return { x, y };
};

export const HexagonFlower = ({ letters }: { letters: string }) => {
  const radius = 110; // distance from center
  const firstLetter = letters.charAt(0) || "";
  return (
    <FlowerContainer>
      {/* Center hexagon */}
      <Hex
        style={{
          backgroundColor: "#e9ab17",
          transform: "translate(-50%, -50%) rotate(90deg)",
        }}
      >
        <div style={{ transform: "rotate(-90deg)" }}>{firstLetter} </div>
      </Hex>

      {/* Surrounding 6 hexagons */}
      {letters
        .slice(1)
        .split("")
        .map((letter, i) => {
          const { x, y } = getHexOffset(i, radius);
          return (
            <Hex
              key={i}
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(90deg)`,
              }}
            >
              <div style={{ transform: "rotate(-90deg)" }}>{letter}</div>
            </Hex>
          );
        })}
    </FlowerContainer>
  );
};
