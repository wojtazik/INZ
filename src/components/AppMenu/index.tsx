import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as ProcessIcon } from './assets/engineering.svg'
import { ReactComponent as PaletteIcon } from './assets/pantone.svg'
import { ReactComponent as WarningIcon } from './assets/warning.svg'

import colors from '../../styles/colors'
import { useSelector } from 'react-redux'
import { IError, IState } from '../../model/state'

const AppMenu = () => {

  const errors: IError[] = useSelector((state: IState) => state.errors)

  return (
    <MenuWrapper>
      <MenuList>
        <MenuListItem>
          <MenuLink to='/'>
            <ProcessIconStyled/>
          </MenuLink>  
        </MenuListItem>
        <MenuListItem>
          <MenuLink to='/color'>
            <PaletteIconStyled />  
          </MenuLink>  
        </MenuListItem>
        <MenuListItem>
          <MenuLink to='/errors'>
            <WarningIconStyled errorOccurred={errors.length > 0 ? true : false}/>
          </MenuLink>  
        </MenuListItem>
      </MenuList>
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  position: fixed;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
  width: 75px;
  min-height: 255px;
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
  background: ${colors.GRAY_BASIC_LIGHT};
  opacity: 0.5;
  padding: 30px 0;
  box-sizing: border-box;
`

const MenuListItem = styled.li`
  width: 75px;
  height: 60px;
  padding: 10px;
  transition: all .3s ease-in-out;

  &:hover {
    background: ${colors.GRAY_BASIC}
  }
`

const MenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProcessIconStyled = styled(ProcessIcon)`
  width: 40px;
  height: 40px;
  fill: ${colors.BLACK};
`

const PaletteIconStyled = styled(PaletteIcon)`
  width: 40px;
  height: 40px;
  fill: ${colors.BLACK};
`

const errorAnimation = keyframes`
  0% {
    transform: scale(1);
    fill: ${colors.BLACK};
  }

  0% {
    transform: scale(1.1);
    fill: ${colors.ERROR_RED}
  }

  100% {
    transform: rotate(1);
    fill: ${colors.BLACK};
  }
`;

const WarningIconStyled = styled(WarningIcon)<{errorOccurred: boolean}>`
  width: 40px;
  height: 40px;
  fill: ${colors.BLACK};
  animation: ${({ errorOccurred }) => errorOccurred ? css`${errorAnimation} .5s infinite` : "none"} ;
`




export default AppMenu