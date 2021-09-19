import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useIO } from '../../../context/SocketContext'
import { setChoosenColorName } from '../../../store/actions/setChoosenColorName'
import { setColorNameModalOpen } from '../../../store/actions/setModalsOpen'
import colors from '../../../styles/colors'

const ColorNameModal = () => {
    const [colorName, setColorName] = useState('')
    const dispatch = useDispatch()
    const socket = useIO()

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setColorName(e.target.value)
    }

    const onSaveColorName = () => {
        dispatch(setChoosenColorName(0, socket))
        dispatch(setColorNameModalOpen(false))
    }

    return (
        <>
        <ColorsNameModalOverlay />
        <ColorsNameModalWrapper>
          <input type="text" maxLength={30}  value={colorName} onChange={handleInput}/>
          <button onClick={onSaveColorName}>OK</button>
        </ColorsNameModalWrapper>
      </>
    )
}

const ColorsNameModalOverlay = styled.div`
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

const ColorsNameModalWrapper = styled.div`
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

export default ColorNameModal