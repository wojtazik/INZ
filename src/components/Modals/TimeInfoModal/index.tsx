import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setTimeInfoModalOpen } from '../../../store/actions/setModalsOpen'
import fonts from '../../../styles/fonts'

export type TimeInfoModalProps = {
    info: string
    timeout: number
}

const TimeInfoModal: React.FC<TimeInfoModalProps> = ({ info, timeout }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setTimeInfoModalOpen(false))
        }, timeout)
    }, [])

    return (
        <Wrapper>{info}</Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    max-width: 150px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 80px;
    font-size: ${fonts.FONT_SMALL_SIZE};
    box-shadow: 0px 0px 15px 5px #666666;
`

export default TimeInfoModal