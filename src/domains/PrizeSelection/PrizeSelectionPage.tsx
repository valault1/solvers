import React, { useState } from "react";
import styled from "@emotion/styled";
import { PRIZES } from "./PrizeData";
import { PrizeCard } from "./PrizeCard";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";

const CelebratoryContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #0a0f1c; /* Deep dark blue */
  background-image: radial-gradient(circle at top center, rgba(30, 60, 110, 0.4) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 100px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 8px 0;
  color: #ffffff;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 30px;
  max-width: 800px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch; /* Cards will stretch to match the tallest sibling's height */
  gap: 30px;
  max-width: 1400px; /* Increased from 1200px to allow wider cards */
  width: 100%;
  padding: 20px 10px; /* Enough to prevent scale(1.05) clipping, but minimized to prevent extra gaps */
  overflow-x: auto;
  
  /* Hide scrollbar for a cleaner look while maintaining scrollability */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const FloatingBar = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: ${(props) => (props.visible ? "0" : "-100px")};
  left: 0;
  width: 100%;
  background: rgba(10, 15, 28, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.5);
  transition: bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  z-index: 1000;
`;

const SelectionCount = styled.div`
  font-size: 1.25rem;
  color: #ffffff;
  font-weight: 600;
`;

const ConfirmButton = styled(Button)`
  && {
    background: linear-gradient(45deg, #ff0844 0%, #ffb199 100%);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    padding: 10px 24px;
    border-radius: 20px;
    text-transform: none;
    box-shadow: 0px 4px 15px rgba(255, 8, 68, 0.4);
    transition: all 0.2s ease;
    
    &:disabled {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.3);
      box-shadow: none;
    }

    &:hover:not(:disabled) {
      background: linear-gradient(45deg, #ff3366 0%, #ffccaa 100%);
      transform: translateY(-2px);
      box-shadow: 0px 6px 20px rgba(255, 8, 68, 0.6);
  }
`;

const DialogSubmitButton = styled(Button)`
  && {
    background: linear-gradient(45deg, #ff0844 0%, #ffb199 100%);
    color: white;
    font-weight: 600;
    text-transform: none;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(255, 8, 68, 0.4);
    
    &:hover {
      background: linear-gradient(45deg, #ff3366 0%, #ffccaa 100%);
      box-shadow: 0 6px 20px rgba(255, 8, 68, 0.6);
    }
  }
`;

const dialogPaperProps = {
  style: {
    background: "rgba(20, 25, 40, 0.95)",
    backdropFilter: "blur(20px)",
    color: "#ffffff",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },
};

export const PrizeSelectionPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFirstDialog, setShowFirstDialog] = useState(false);
  const [showSecondDialog, setShowSecondDialog] = useState(false);
  const MAX_SELECTIONS = 2;

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selId) => selId !== id));
    } else {
      if (selectedIds.length < MAX_SELECTIONS) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleInitialConfirm = () => {
    setShowFirstDialog(true);
  };

  const handleFirstDialogYes = () => {
    setShowFirstDialog(false);
    setTimeout(() => setShowSecondDialog(true), 300); // Small delay for comedic timing
  };

  const handleFirstDialogNo = () => {
    setShowFirstDialog(false);
  };

  const handleFinalClose = () => {
    setShowSecondDialog(false);
    setSelectedIds([]); // Optional: reset selection, or just let them stay on the page
  };

  return (
    <CelebratoryContainer>
      <Header>Brex IPO Celebration Bundles</Header>
      <Subtitle>
        As a thanks for referring me to Brex 4 years ago, you should get some part in my IPO payout!
      </Subtitle>

      <Grid>
        {PRIZES.map((prize) => {
          const isSelected = selectedIds.includes(prize.id);
          const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTIONS;

          return (
            <PrizeCard
              key={prize.id}
              prize={prize}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onToggle={() => handleToggle(prize.id)}
            />
          );
        })}
      </Grid>

      <FloatingBar visible={true}>
        <SelectionCount>
          {selectedIds.length} / {MAX_SELECTIONS} Packages Selected
        </SelectionCount>
        <ConfirmButton
          variant="contained"
          disabled={selectedIds.length !== MAX_SELECTIONS}
          onClick={handleInitialConfirm}
        >
          {selectedIds.length === 0
            ? "Pick Two Prizes!"
            : selectedIds.length === 1
              ? "Pick One More!"
              : "Confirm Selection!"}
        </ConfirmButton>
      </FloatingBar>

      {/* First Confirmation Dialog */}
      <Dialog
        open={showFirstDialog}
        onClose={handleFirstDialogNo}
        PaperProps={dialogPaperProps}
      >
        <DialogTitle sx={{ fontWeight: "600", fontSize: "1.25rem", color: "#ffb199" }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <Typography fontSize="1rem" color="rgba(255,255,255,0.7)">
            This is your final choice! Once you submit, these are the prizes you will receive. Are you absolutely certain you want these two packages?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleFirstDialogNo} sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none", fontWeight: 500 }}>
            Wait, let me think...
          </Button>
          <DialogSubmitButton onClick={handleFirstDialogYes} variant="contained">
            Yes, I'm sure!
          </DialogSubmitButton>
        </DialogActions>
      </Dialog>

      {/* Second Joke Dialog */}
      <Dialog
        open={showSecondDialog}
        onClose={handleFinalClose}
        PaperProps={dialogPaperProps}
      >
        <DialogTitle sx={{ fontWeight: "600", fontSize: "1.25rem", color: "#ffb199" }}>
          Plot Twist!
        </DialogTitle>
        <DialogContent>
          <Typography fontSize="1rem" color="rgba(255,255,255,0.7)">
            Cool, Val didn't actually create a way to submit this through the website yet. So just go ahead and just tell him which ones you picked!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <DialogSubmitButton onClick={handleFinalClose} variant="contained">
            Got it, will do!
          </DialogSubmitButton>
        </DialogActions>
      </Dialog>
    </CelebratoryContainer>
  );
};
