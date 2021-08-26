import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { setColorsListModalOpen } from '../../../store/actions/setModalsOpen'
import colors from '../../../styles/colors'
import Expand from 'react-expand-animated'
import { pushChoosenColorCode, setChoosenColorCode } from '../../../store/actions/setChoosenColorCode'
import { useIO } from '../../../context/SocketContext'
import { selectPaints } from '../../../store/selectors/paintsSelectors'
import { IPaint } from '../../../model/state'
import { selectVolumeToGain } from '../../../store/selectors/mixingTankSelectors'
import { setPaints } from '../../../store/actions/setPaints'
import Button from '../../common/SimpleButton/SimpleButton'
import { selectChoosenColorCode } from '../../../store/selectors/choosenColorCodeSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'

type IExampleColor = {
  name: string,
  code: string,
  counts: {
    [key: string]: number
  }
}

const exampleColors: IExampleColor[] = [
  {
    name: 'Dirty pink',
    code: '#ff55aa',
    counts: {
      magenta: 2,
      yellow: 1
    }
  },
  {
    name: 'Middle grey',
    code: '#808080',
    counts: {
      white: 1,
      black: 1
    }
  },
  {
    name: 'Desert sand',
    code: '#ffffaa',
    counts: {
      yellow: 1,
      white: 2
    }
  },
  {
    name: 'Fresh mint',
    code: '#80ff80',
    counts: {
      cyan: 1,
      yellow: 2
    }
  },
  {
    name: 'Sweet pink',
    code: '#ff40bf',
    counts: {
      magenta: 3,
      yellow: 1
    }
  },
  {
    name: 'Light purple',
    code: '#b649ff',
    counts: {
      cyan: 2,
      magenta: 3
    }
  },
  {
    name: 'Exotic sea',
    code: '#40bfff',
    counts: {
      cyan: 3,
      magenta: 1
    }
  },
  {
    name: 'Niggas black',
    code: '#40bfff',
    counts: {
      cyan: 3,
      magenta: 1,
      yellow: 1,
      white: 1,
      black: 1
    }
  }
]

const ColorsListModal = () => {
  const dispatch = useDispatch()
  const [expandedColor, setExpandedColor] = useState('')
  const socket = useIO()
  const paints = useSelector(selectPaints)
  const volumeToGain = useSelector(selectVolumeToGain)
  const colorToGain = useSelector(selectChoosenColorCode)
  const processRunning = useSelector(selectIsProcessRunning)

  const onClickExit = (e: React.MouseEvent) => {
    dispatch(setColorsListModalOpen(false))
  }

  const switchExpandedColor = (name: string) => {
    if (expandedColor === name) {
      setExpandedColor('')
    } else {
      setExpandedColor(name)
    }
  }

  const onColorChoose = (color: IExampleColor) => {
    dispatch(setChoosenColorCode(color.code, socket))
    dispatch(pushChoosenColorCode(color.code))

    const { counts } = color
    const keys = Object.keys(counts)

    let newColors = paints.map((paint: IPaint) => ({
      ...paint,
      count: keys.includes(paint.name) ? color.counts[paint.name || 0] : paint.count
    }))

    const colorsSummaryCount = newColors.reduce((a, b) => a + (b['count'] || 0), 0)

    newColors = newColors.map((color: IPaint) => ({
      ...color,
      ratio: colorsSummaryCount === 0 ? 0 : (color.count / colorsSummaryCount),
      count_liters: colorsSummaryCount === 0 ? 0 : (color.count / colorsSummaryCount) * volumeToGain
    }))

    dispatch(setPaints(newColors, socket))
    dispatch(setColorsListModalOpen(false))
  }

  const renderExampleColorsList = () => exampleColors.map((exampleColor: IExampleColor, index) => (
    <ListItem>
      <ColorName
        onClick={() => switchExpandedColor(exampleColor.name)}
      >
        <ExampleColorNameWrapper>
          <ExampleColorHint color={exampleColor.code} />
          <ExampleColorNameText>{exampleColor.name}</ExampleColorNameText>
        </ExampleColorNameWrapper>
        <ExpandArrow isOpen={exampleColor.name === expandedColor}/>
      </ColorName>
      <Expand 
        open={expandedColor === exampleColor.name}
        duratio={150}
        transitions={['height']}
      >
        <ExpandedColorData isLast={index === exampleColors.length - 1}>
          {Object.keys(exampleColor.counts).map((key: string) => (
            <ChunkColorCount>{key}: {exampleColor.counts[key]}</ChunkColorCount>
          ))}
          <ChooseColorButton isRunning={processRunning.info} onClick={!processRunning.info ? () => onColorChoose(exampleColor) : undefined}>
            Wybierz
          </ChooseColorButton>
        </ExpandedColorData>
      </Expand>
    </ListItem>
  ))

  return (
    <>
      <ColorsListModalOverlay onClick={onClickExit}>
      </ColorsListModalOverlay>
      <ColorsListModalWrapper>
        <ExitButton onClick={onClickExit} />
        <ExampleColorsList>
          {renderExampleColorsList()}
        </ExampleColorsList>
      </ColorsListModalWrapper>
    </>

  )
}

const ColorsListModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.7);
  transition: all .3s;
  backdrop-filter: blur(2px);
  position: fixed;
  cursor: pointer;
  left: 0;
  top: 0;

  &:hover {
    background: rgba(0,0,0,.75);
  }
`

const ColorsListModalWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  min-height: 500px;
  background: ${colors.WHITE};
  border-radius: 5px;
  box-shadow: 0px 0px 15px 3px rgba(255,255,255,0.35);
  padding: 15px;
`

const ExitButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  background: ${colors.GRAY_BASIC_DARK};
  cursor: pointer;
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
`

const ExampleColorsList = styled.ul`
  margin: 0;
  list-style-type: none;
  padding-left: 15px;
  margin-top: 25px;
  overflow: auto;
`

const ListItem = styled.li`
  width: 100%;
  min-height: 20px;
`

const ColorName = styled.div`
  color: ${colors.GRAY_BASIC};
  min-height: 25px;
  border: 1px solid ${colors.GRAY_BASIC};
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
`

const ExampleColorNameText = styled.span`
  color: ${colors.GRAY_BASIC};
`

const ExampleColorNameWrapper = styled.div`
  display: flex;
  align-items: center;
`

type ExpandArrowProps = {
  isOpen: boolean
}

const ExpandArrow = styled.div<ExpandArrowProps>`
  clip-path: polygon(50% 35%, 100% 65%, 80% 65%, 50% 50%, 20% 65%, 0 65%);
  background: ${colors.GRAY_BASIC};
  width: 20px;
  height: 20px;
  transition: transform 0.3s;

  ${({ isOpen }) => isOpen && css`
    transform: rotate(180deg);
  `}
`

type ExpandedColorDataProps = {
  isLast: boolean
}

const ExpandedColorData = styled.div<ExpandedColorDataProps>`
  min-height: 40px;
  padding: 10px;
  border-left: 1px solid ${colors.GRAY_BASIC};
  border-right: 1px solid ${colors.GRAY_BASIC};
  margin-left: 5px;
  margin-right: 5px;
  position: relative;

  ${({ isLast }) => isLast && css`
    border-bottom: 1px solid ${colors.GRAY_BASIC};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  `}
`

const ChunkColorCount = styled.div`
  color: ${colors.GRAY_BASIC};
`

type ExampleColorHintProps = {
  color: string
}

const ExampleColorHint = styled.div<ExampleColorHintProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid transparent;
  background: ${({ color }) => color};
  margin-right: 10px;
`

type ChooseColorButtonProps = {
  isRunning: boolean
}

const ChooseColorButton = styled(Button)<ChooseColorButtonProps>`
  position: absolute;
  right: 15px;
  top: 15px;

  ${({ isRunning }) => isRunning && css`
    cursor: default;
    background: ${colors.ERROR_RED};

    &:hover {
      background: ${colors.ERROR_RED}
    }
  `}

`

export default ColorsListModal