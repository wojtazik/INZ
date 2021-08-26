import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import colors from '../../styles/colors'
import colorsSettings from '../../config/colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectPaints } from '../../store/selectors/paintsSelectors'
import { selectChoosenColorCode } from '../../store/selectors/choosenColorCodeSelectors'
import { IPaint } from '../../model/state'
import fonts from '../../styles/fonts'
//@ts-ignore
import Color from 'color-converter'
import { selectVolumeToGain } from '../../store/selectors/mixingTankSelectors'
import calculateGainedColor from '../../util/calculateGainedColor'
import { selectIsProcessRunning } from '../../store/selectors/processRunningSelectors'
import { setPaints } from '../../store/actions/setPaints'
import { setChoosenColorCode } from '../../store/actions/setChoosenColorCode'
import { useIO } from '../../context/SocketContext'
import { setColorsListModalOpen } from '../../store/actions/setModalsOpen'

export type ColorKeyValue = {
  [key: string]: IPaint
}

const ColorPalette = () => {
  const colors = useSelector(selectPaints)
  const choosenColor = useSelector(selectChoosenColorCode)
  const volumeToGain = useSelector(selectVolumeToGain)
  const processRunning = useSelector(selectIsProcessRunning)

  const [gainedColor, setGainedColor] = useState<string>(choosenColor)
  const [localColors, setLocalColors] = useState<ColorKeyValue>(colors.reduce((acc: ColorKeyValue, color: IPaint) => (
    acc[color.name]=color, acc
  ), {}))

  const dispatch = useDispatch()
  const socket = useIO()

  const isBright = () => {
    if (!gainedColor) {

      return true
    }
    const colorInRgb = Color.fromHex('#' + gainedColor).toRGB()
    return colorInRgb.r > 200 && colorInRgb.g > 200 && colorInRgb.b > 200
  }

  const isDark = () => {
    if (!gainedColor) {
      return false
    }
    const colorInRgb = Color.fromHex('#' + gainedColor).toRGB()
    return colorInRgb.r < 100 && colorInRgb.g < 100 && colorInRgb.b < 100
  }

  const calculateColorsRatio = (colors: IPaint[]) => {
    const colorsSummaryCount = colors.reduce((a, b) => a + (b['count'] || 0), 0)

    return colors.map((color: IPaint) => ({
      ...color,
      ratio: colorsSummaryCount === 0 ? 0 : color.count / colorsSummaryCount,
      count_liters: colorsSummaryCount === 0 ? 0 : (color.count / colorsSummaryCount) * volumeToGain
    }))
  }

  const calculateLocalColors = (updatedLocalColors: ColorKeyValue) => {
    const colorsWithUpdatedRatio = calculateColorsRatio(Object.values(updatedLocalColors))

    setLocalColors(colorsWithUpdatedRatio.reduce((acc: ColorKeyValue, color: IPaint) => (
      acc[color.name]=color, acc
    ), {}))
  }

  const onAddColor = (key: string) => {

    const newColorCount = localColors[key].count + 1

    const updatedLocalColors = {
      ...localColors,
      [key]: {
        ...localColors[key],
        count: newColorCount,
      }
    }

    calculateLocalColors(updatedLocalColors)
    setGainedColor(calculateGainedColor(updatedLocalColors))
  }

  const onRemoveColor = (key: string) => {
    const newColorCount = localColors[key].count > 0 ? localColors[key].count - 1 : 0

    const updatedLocalColors = {
      ...localColors,
      [key]: {
        ...localColors[key],
        count: newColorCount,
      }
    }

    calculateLocalColors(updatedLocalColors)
    setGainedColor(calculateGainedColor(updatedLocalColors))
  }

  const onSaveConfiguration = () => {
    if (!processRunning.info) {
      dispatch(setPaints(Object.values(localColors), socket))
      dispatch(setChoosenColorCode(gainedColor, socket))
    }
  }

  const onOpenColorsListModal = () => {
    dispatch(setColorsListModalOpen(true))
  }

  useEffect(() => {
    setLocalColors(colors.reduce((acc: ColorKeyValue, color: IPaint) => (
      acc[color.name]= {
        ...localColors[color.name],
        current_volume_liters: color.current_volume_liters,
        current_volume: color.current_volume
      }, acc
    ), {}))
  }, [colors])

  useEffect(() => {
    setGainedColor(choosenColor)
  }, [choosenColor])
  
  const renderColorsManagement = () => {
    return Object.keys(localColors).map((colorName: string) => {
      const colorObject = localColors[colorName]
      console.log(processRunning)
      return (
        <ColorWrapper>
          <ColorName>{colorObject.name}</ColorName>
          <ColorCountWrapper>
            <CountButton onClick={() => !processRunning.info && onAddColor(colorObject.name)} isDisabled={processRunning.info}>+1</CountButton>
            <PaintCount>{colorObject.count} j</PaintCount>
            <CountButton onClick={() => !processRunning.info && onRemoveColor(colorObject.name)} isDisabled={processRunning.info}>-1</CountButton>
          </ColorCountWrapper>
          <UseLiters>Użyjesz: {colorObject.count_liters.toFixed(2)} L</UseLiters>
          <OtherData>W zapasie: {colorObject.current_volume_liters.toFixed(2)} L</OtherData>
          <OtherData>Udział: {(colorObject.ratio * 100).toFixed(2)} %</OtherData>
          <OtherData>W zbiorniku: {(colorObject.current_volume * 100).toFixed(2)} %</OtherData>
        </ColorWrapper>
      )
    })
  }

  return (
    <ComponentWrapper>
      <ComponentWrapperHint>
        Aby dostosować wymagany kolor, naciśnij dodaj lub usuń przy poszczególnych kolorach bazowych.
        Każde dodanie zwiększa udział koloru bazowego o jedną jednostkę, która jest abstrakcyjną wartością,
        opisującą procentowy udział koloru w barwie wynikowej. Aby ustawić wymagany litraż, przejdź do pierwszej zakładki.
      </ComponentWrapperHint>
      <ColorPaletteWrapper>
        <SaveButton isDisabled={processRunning.info} onClick={onSaveConfiguration}>Zapisz</SaveButton>
        <GainedColor colorCode={gainedColor} isBright={isBright()} onClick={onOpenColorsListModal}>
          <GainedColorCode isDark={isDark()}>
            {gainedColor || 'Nie wybrano'}
          </GainedColorCode>
        </GainedColor>
        <ColorsManagement>
          {renderColorsManagement()}
        </ColorsManagement>
      </ColorPaletteWrapper>
    </ComponentWrapper>

  )
}

type WithDisabledProp = {
  isDisabled: boolean
}

const ColorPaletteWrapper = styled.div`
  margin: 50px 0;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
`

const ComponentWrapper = styled.div`
  margin: 0 50px;
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`

const ComponentWrapperHint = styled.p`
  text-align: center;
  color: ${colors.GRAY_BASIC_DARK};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

type GainedColorProps = {
  colorCode: string
  isBright: boolean
}

const GainedColor = styled.div<GainedColorProps>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;
  background: ${({ colorCode }) => colorCode};
  ${({ isBright }) => isBright && css`
    border: 1px solid ${colors.GRAY_BASIC_DARK}
  `}
`

type GainedColorCodeProps = {
  isDark: boolean
}

const GainedColorCode = styled.span<GainedColorCodeProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-size: ${fonts.FONT_LARGEST_SIZE};
  color: ${colors.GRAY_BASIC_DARK};


  ${({ isDark }) => isDark && css`
    color: ${colors.WHITE};
  `}
`

const ColorsManagement = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`

const ColorWrapper = styled.div`
  flex: 1;
  &:not(:last-of-type) {
    margin-right: 20px;
  }
`

const ColorCountWrapper = styled.div`
  height: 60px;
  max-width: 80px;
  width: 80%;
  margin-right: auto;
  border-radius: 15px;
  overflow: hidden;
`

const CountButton = styled.button<WithDisabledProp>`
  background: ${colors.GRAY_BASIC_LIGHT};
  width: 100%;
  height: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: ${colors.GRAY_BASIC_SEMI_LIGHT};
  }

  ${({ isDisabled }) => isDisabled && css`
    cursor: default;

    &:hover {
      background: ${colors.GRAY_BASIC_LIGHT};
    }
  `}
`

const PaintCount = styled.div`
  border-right: 1px solid ${colors.GRAY_BASIC_LIGHT};
  border-left: 1px solid ${colors.GRAY_BASIC_LIGHT};
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ColorName = styled.span`
  display: block;
  text-transform: capitalize;
  margin-bottom: 5px;
`

const UseLiters = styled.div`
  margin-top: 15px;
`

const OtherData = styled.div`
  margin-top: 5px;
`

const SaveButton = styled.button<WithDisabledProp>`
  position: absolute;
  right: 20%;
  top: 43%;
  transform: translateY(-50%);
  padding: 15px 20px;
  background: ${colors.GREEN_BASIC};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: ${fonts.FONT_MEDIUM_SIZE};
  text-transform: uppercase;

  &:hover {
    background: ${colors.GREEN_DARKEN}
  }

  ${({ isDisabled }) => isDisabled && css`
    background: ${colors.RED_BASIC};
    cursor: default;

    &:hover {
      background: ${colors.RED_BASIC};
    }
  `}
`

export default ColorPalette