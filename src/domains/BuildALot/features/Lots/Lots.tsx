import styled from "@emotion/styled";
import { theme } from "components/theme/theme";
import { JobBarController } from "domains/BuildALot/features/Lots/JobBarController";
import { LotComponent } from "domains/BuildALot/features/Lots/LotComponent";
import { Job, Lot } from "domains/BuildALot/sharedTypes";
import React from "react";

const LotsWrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  height: "100%",
});

export const LOT_SIZE = 60;
export const LOT_SIZE_PX = `${LOT_SIZE}px`;
export const JOB_BAR_SIZE = 32;
export const LOT_AND_JOB_BAR_HEIGHT = JOB_BAR_SIZE + LOT_SIZE;

export const SECONDARY_BORDER = `1px solid ${theme.colors.secondary}`;
export const DEFAULT_BORDER = `1px solid`;
const LotWrapper = styled.div<{ isSelected?: boolean }>(({ isSelected }) => ({
  width: LOT_SIZE_PX,
  height: LOT_SIZE_PX,
  border: isSelected ? SECONDARY_BORDER : DEFAULT_BORDER,
  padding: 4,
}));

const LOT_AND_JOB_BAR_GAP = 16;
const LotAndJobBarWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: LOT_AND_JOB_BAR_GAP,
  height: `${LOT_AND_JOB_BAR_HEIGHT + LOT_AND_JOB_BAR_GAP}px`,
});

const JobBarWrapper = styled.div(() => ({}));

export const Lots = ({
  lots,
  selectedLotIndex,
  onClickLot,
  createJobOnLot,
}: {
  lots: Lot[];
  selectedLotIndex: number;
  onClickLot: (index: number) => void;
  createJobOnLot: (index: number, job?: Job) => void;
}) => {
  return (
    <LotsWrapper>
      {lots.map((lot, index) => {
        return (
          <LotAndJobBarWrapper>
            <LotWrapper
              isSelected={selectedLotIndex === index}
              onClick={(e) => {
                onClickLot(index);
                e.stopPropagation();
              }}
            >
              <LotComponent lot={lot} />
            </LotWrapper>
            {!!lot.currentJob && (
              <JobBarWrapper>
                <JobBarController
                  job={lot.currentJob}
                  clearCurrentJob={() => createJobOnLot(index)}
                />
              </JobBarWrapper>
            )}
          </LotAndJobBarWrapper>
        );
      })}
    </LotsWrapper>
  );
};
