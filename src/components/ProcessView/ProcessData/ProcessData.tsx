import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectIsProcessRunning } from '../../../store/selectors/processRunningSelectors'

const ProcessData = () => {

  const processRunning = useSelector(selectIsProcessRunning)

  return (
    <ProcessDataWrapper>
      <ProcessRunning isRunning={processRunning}>
        {processRunning ? 'RUNNING' : 'STOPPED'}
      </ProcessRunning>
    </ProcessDataWrapper>
  )
}

const ProcessDataWrapper = styled.div`
    border: 1px solid black;
    padding: 10px;
`

type ProcessRunningProps = {
  isRunning: boolean
}

const ProcessRunning = styled.div<ProcessRunningProps>`

`

export default ProcessData