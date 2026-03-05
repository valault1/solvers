import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { PRIZES } from "./PrizeData";

type PrizeType = typeof PRIZES[0];

const CardContainer = styled.div<{ isSelected: boolean; isDisabled: boolean }>`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 360px; /* Increased from 280px/320px to fill more screen */
  flex: 1 1 0; /* Grow and shrink equally */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); /* Deep shadow */
  border: 1px solid ${(props) => (props.isSelected ? "#ff0844" : "rgba(255, 255, 255, 0.05)")};
  transform: ${(props) => (props.isSelected ? "scale(1.02)" : "scale(1)")};
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: #ffffff;

  &:hover {
    transform: ${(props) => (props.isDisabled ? "scale(1)" : "scale(1.01)")};
    box-shadow: ${(props) =>
    props.isDisabled
      ? "0 10px 40px rgba(0, 0, 0, 0.5)"
      : "0 15px 50px rgba(255, 8, 68, 0.2)"};
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 3rem;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  flex: 1;
  min-width: 0; /* allows flex items to shrink below their content size without overflowing */
  background: transparent;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 6px 0;
  font-weight: bold;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin: 0 0 12px 0;
  line-height: 1.3;
`;

const ValueLabel = styled.div`
  background: rgba(255, 177, 153, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  color: #ffb199;
  margin-bottom: 12px;
  align-self: flex-start;
`;

const ItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 15px 0;
  flex-grow: 1;
`;

const Item = styled.li`
  margin-bottom: 4px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "•";
    color: #ffb199;
    font-size: 1rem;
  }
`;

const ItemLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s;
  
  &:hover {
    color: #ffb199;
    border-bottom-color: #ffb199;
  }
`;

const SelectButton = styled(Button) <{ isSelected: boolean }>`
  && {
    background: ${(props) =>
    props.isSelected ? "linear-gradient(45deg, #111 0%, #222 100%)" : "linear-gradient(45deg, #ff0844 0%, #ff5e62 100%)"};
    color: #ffffff;
    font-weight: 600;
    padding: 10px 16px;
    border-radius: 20px;
    width: 100%;
    margin-top: auto;
    text-transform: none;
    box-shadow: ${(props) => props.isSelected ? "0 4px 15px rgba(0, 0, 0, 0.4)" : "0 4px 15px rgba(255, 8, 68, 0.4)"};
    border: 1px solid ${(props) => props.isSelected ? "rgba(255, 255, 255, 0.2)" : "transparent"};
    
    &:hover {
      background: ${(props) =>
    props.isSelected ? "linear-gradient(45deg, #000 0%, #111 100%)" : "linear-gradient(45deg, #ff3366 0%, #ff6a6d 100%)"};
      box-shadow: ${(props) => props.isSelected ? "0 6px 20px rgba(0, 0, 0, 0.6)" : "0 6px 20px rgba(255, 8, 68, 0.6)"};
    }
  }
`;

interface PrizeCardProps {
  prize: PrizeType;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: () => void;
}

export const PrizeCard: React.FC<PrizeCardProps> = ({
  prize,
  isSelected,
  isDisabled,
  onToggle,
}) => {
  return (
    <CardContainer isSelected={isSelected} isDisabled={isDisabled}>
      <ImagePlaceholder>
        {prize.imageUrls && prize.imageUrls.length > 0 ? (
          prize.imageUrls.map((url, idx) => (
            <Thumbnail key={idx} src={url} alt={`${prize.title} part ${idx + 1}`} />
          ))
        ) : (
          "🎁"
        )}
      </ImagePlaceholder>
      <Title>{prize.title}</Title>
      <ValueLabel>Worth ${prize.value}</ValueLabel>
      <Description>{prize.description}</Description>

      <ItemsList>
        {prize.items.map((item, index) => (
          <Item key={index}>
            <ItemLink href={item.link} target="_blank" rel="noopener noreferrer">
              {item.name}
            </ItemLink>
          </Item>
        ))}
      </ItemsList>

      <SelectButton
        isSelected={isSelected}
        disabled={isDisabled}
        onClick={onToggle}
        variant="contained"
        sx={{ padding: "8px", fontSize: "0.85rem" }}
      >
        {isSelected ? "Unselect" : "Select this Bundle"}
      </SelectButton>
    </CardContainer>
  );
};
