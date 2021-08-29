import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { setManualWork } from '../../../store/actions/setManualWork'
import { setProcessRunning } from '../../../store/actions/setProcessRunning'
import { selectIsManualMode } from '../../../store/selectors/manualWorkSelectors'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'
import colors from '../../../styles/colors'
import fonts from '../../../styles/fonts'

const WorkType = () => {
    const isManualWorkMode = useSelector(selectIsManualMode)
    const isProcessRunning = useSelector(selectIsProcessRunning).info

    const dispatch = useDispatch()
    const socket = useIO()

    const onChangeWorkMode = () => {
        if (!isProcessRunning) {
            dispatch(setManualWork(!isManualWorkMode, socket))
        }
    }

    return (
        <ProcessDataWrapper>
            <ChangeWorkTypeButton
                disabled={isProcessRunning}
                disabledStyles={isProcessRunning}
                onClick={ !isProcessRunning ? onChangeWorkMode : undefined}
            >
                { isManualWorkMode ? 'Praca ręczna' : 'Praca automatyczna' }
            </ChangeWorkTypeButton>
        </ProcessDataWrapper>
    )
}

const ProcessDataWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const BaseButton = styled.button`
  font-size: ${fonts.FONT_LARGEST_SIZE};
  padding: 10px 15px;
  color: white;
  border: none;
  outline: none;
  min-width: 280px;
  border-radius: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all .3s;
  position: relative;
`

export type ChangeWorkTypeButton = {
    disabledStyles: boolean
}

const ChangeWorkTypeButton = styled(BaseButton)<ChangeWorkTypeButton>`
  background: ${colors.NAVY_BLUE};
  width: 100%;
  box-shadow: 1px 1px 8px ${colors.NAVY_BLUE};

  &:hover {
    background: ${colors.BLUE_LIGHTEN};
  }

  ${({ disabledStyles }) => disabledStyles && css`
    cursor: default;

    &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(100,100,100,.8);
        left: 0;
        top: 0;
    }

    &:hover {
        background: ${colors.NAVY_BLUE};
    }
  `}
`

export default WorkType