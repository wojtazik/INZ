import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Id } from "../../../model/commonTypes";
import { IState } from "../../../model/state";
import { selectTankCurrentVolumeData } from "../../../store/selectors/commonSelectors";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { cellSize } from "../../../styles/spacings";

export type ITankLevelBar = {
  id: Id,
  isCleaningSubstance?: boolean,
}

const TankLevelBar: React.FC<ITankLevelBar> = ({ id, isCleaningSubstance }: ITankLevelBar) => {

  const tankLevelData = useSelector((state: IState) => selectTankCurrentVolumeData(state, { id, isCleaningSubstance }))
  console.log(tankLevelData)
  if (isCleaningSubstance) {
    console.log(tankLevelData)
  }
  return (
    <>
      <TankLevelBarWrapper>
        <TankCurrentLevel colorCode={tankLevelData.color} currentHeight={tankLevelData.current_volume_percent} />
      </TankLevelBarWrapper>
      <TankLevelData>
        <span>{tankLevelData.capacity} L</span>
        <span>0 L</span>
      </TankLevelData>
    </>
  )
}

TankLevelBar.defaultProps = {
  isCleaningSubstance: false
}

const TankLevelBarWrapper = styled.div`
  width: 20px;
  min-height: 100%;
  border-radius: 10px;
  border: 1px solid ${colors.GRAY_BASIC_DARK};
  overflow: hidden;
  position: relative;
`

const TankCurrentLevel = styled.div<
  {
    colorCode: string | null | undefined,
    currentHeight: number | undefined
  }
>`
  width: 100%;
  background-image: linear-gradient(to right, ${colors.WHITE} 10%, ${({ colorCode }) => `#${colorCode}`});
  height: ${({ currentHeight }) => `${(currentHeight as number) * 100}%`};
  position: absolute;
  bottom: 0;
`

const TankLevelData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: ${cellSize};
  font-size: ${fonts.FONT_SMALL_SIZE};
`

export default TankLevelBar