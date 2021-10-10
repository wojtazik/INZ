import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectErrors } from '../../store/selectors/errorsSelectors'
import styled, { css } from 'styled-components'
import fonts from '../../styles/fonts'
import { ReactComponent as OkIcon } from './assets/check-mark.svg'
import colors from '../../styles/colors'
import { IError } from '../../model/state'


const ControllerErrors = () => {
  const errors = useSelector(selectErrors)

  const listRef = useRef()
  const [fixedContentWidth, setFixedContentWidth] = useState(0)

  const renderErrors = () => errors.filter((error: IError) => {
    return error.last_active_date
  }).map((error: IError) => (
    <ErrorRow key={Math.random()}>
      <ErrorCode>{error.code}</ErrorCode>
      <ErrorTime>{error.last_active_date?.toLocaleString('en-US')}</ErrorTime>
      <ErrorMessage>{error.message}</ErrorMessage>
      <ErrorLocation>{error.is_active ? 'Aktywny' : 'Nieaktywny'}</ErrorLocation>
    </ErrorRow>  
  ))

  const renderHeader = (width: number) => (
    <ErrorRow key={0} fixed={true} fixedWidth={width}>
      <ErrorCode>Kod informacji</ErrorCode>
      <ErrorTime>Czas wyst.</ErrorTime>
      <ErrorMessage>Komunikat</ErrorMessage>
      <ErrorLocation>Status</ErrorLocation>
    </ErrorRow>  
  )

  useEffect(() => {
    if (listRef.current) {
      const setFixedWidth = () => {
        //@ts-ignore
        setFixedContentWidth(listRef.current.clientWidth)
      }
      setFixedWidth()

      window.addEventListener('resize', setFixedWidth)

      return () => {
        window.removeEventListener('resize', setFixedWidth)
      }
    }
  }, [])

  return (
    <ErrorsContainer>
      { !!errors.length ?  (
        // @ts-ignore
        <ErrorsList ref={listRef}>
          {renderHeader(fixedContentWidth)}
          {renderErrors()}
        </ErrorsList>
      ) : (
        <EmptyErrorsContent>
          <OkIconStyled />
          Obecnie nie wystąpił żaden błąd.
        </EmptyErrorsContent>
      )}
    </ErrorsContainer>
  )
}

const ErrorsContainer = styled.div`
  padding: 20px;
  border-radius: 5px;
  background: rgb(245,245,245);
  min-height: 400px;
  max-height: 400px;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  height: 50%;
  overflow: hidden;
  overflow-y: auto;
`

const ErrorsList = styled.ul`
  margin: 0;
  list-style-type: none;
  padding-left: 0;
  border: 1px solid ${colors.GRAY_BASIC_DARK};
  position: relative;
  padding-top: 75px;
`

const EmptyErrorsContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 360px;
  flex-grow: 1;
  align-items: center;
  font-size: ${fonts.FONT_LARGEST_SIZE};
  color: ${colors.GRAY_BASIC_DARK};
`

const OkIconStyled = styled(OkIcon)`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  fill: ${colors.GREEN_BASIC};
`

const ErrorRow = styled.li<{fixed?: boolean, fixedWidth?: number}>`
  height: 75px;
  border-bottom: 1px solid ${colors.GRAY_BASIC_DARK};
  border-top: 1px solid ${colors.GRAY_BASIC_DARK};
  display: flex;

  ${({ fixed, fixedWidth }) => fixed && css`
    position: fixed;
    background: rgb(240,240,240);
    top: 65px;
    width: ${fixedWidth}px;

    &:after {
      content: '';
      width: 102%;
      height: 15px;
      background: rgb(245,245,245);

      position: absolute;
      top: -16px;
      left: -1px;

    }
  `}
`

const ErrorCode = styled.div`
  width: 85px;
  border-right: 1px solid ${colors.GRAY_BASIC_DARK};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorTime = styled.div`
  width: 250px;
  border-right: 1px solid ${colors.GRAY_BASIC_DARK};
  display: flex;
  justify-content: center;
  align-items: center;
`

const ErrorMessage = styled.div`
  border-right: 1px solid ${colors.GRAY_BASIC_DARK};
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

const ErrorLocation = styled.div`
  width: 250px;
  border-right: 1px solid ${colors.GRAY_BASIC_DARK};
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ControllerErrors

