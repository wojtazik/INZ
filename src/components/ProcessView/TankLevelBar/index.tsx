import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Id } from "../../../model/commonTypes";
import { IState } from "../../../model/state";
import { selectChoosenColorCode } from "../../../store/selectors/choosenColorCodeSelectors";
import { selectIsPaintTank, selectTankCurrentVolumeData } from "../../../store/selectors/commonSelectors";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { cellSize } from "../../../styles/spacings";
//@ts-ignore
import Color from 'color-converter'

export type ITankLevelBar = {
  id: Id,
  isCleaningSubstance?: boolean,
  isMixingTank?: boolean
}

const TankLevelBar: React.FC<ITankLevelBar> = ({ id, isCleaningSubstance, isMixingTank }: ITankLevelBar) => {
  const tankLevelData = useSelector((state: IState) => selectTankCurrentVolumeData(state, { id, isCleaningSubstance }))
  const isPaintTank = useSelector((state: IState) => selectIsPaintTank(state, { id }))
  const colorToGain = useSelector(selectChoosenColorCode) || '000000'

  const isBright = () => {
    if (!colorToGain && !isPaintTank) {
      return true
    }
    const colorInRgb = Color.fromHex(isPaintTank ? tankLevelData.color : colorToGain).toRGB()

    return colorInRgb.r > 200 && colorInRgb.g > 200 && colorInRgb.b > 200
  }

  const getMostColor = () => {
    const colorInRgb = Color.fromHex(colorToGain).toRGB()

    if (colorInRgb.r > colorInRgb.g && colorInRgb.r > colorInRgb.b) {
      return '#FAA'
    }


    if (colorInRgb.g > colorInRgb.r && colorInRgb.g > colorInRgb.b) {
      return '#AFA'
    }


    if (colorInRgb.b > colorInRgb.g && colorInRgb.b > colorInRgb.a) {
      return '#AAF'
    }
  }

  const getDisplayColor = () => {
    if (isMixingTank) {
      if (isBright()) {
        return getMostColor()
      } else {
        return colorToGain
      }
    } else {
      if (isBright()) {
        return 'CACACA';
      }
      return tankLevelData.color
    }
  }

  return (
    <>
      <TankLevelBarWrapper>
        <TankCurrentLevel colorCode={getDisplayColor()} currentHeight={tankLevelData.current_volume_percent} />
      </TankLevelBarWrapper>
      <TankLevelData>
        <span>{tankLevelData.capacity} L</span>
        <span>0 L</span>
      </TankLevelData>
    </>
  )
}

TankLevelBar.defaultProps = {
  isCleaningSubstance: false,
  isMixingTank: false
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
  background-image: linear-gradient(to right, ${colors.WHITE} 10%, #${({ colorCode }) => `${colorCode}`});
  height: ${({ currentHeight }) => `${(currentHeight as number)}%`};
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