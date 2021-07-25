import styled, { css } from "styled-components"
import colors from "../../../styles/colors"

type IButtonProps = {
  isDisabled?: boolean
}

const Button = styled.button<IButtonProps>`
  margin-bottom: 10px;
  padding: 8px 3px;
  background: transparent;
  border-radius: 5px;
  color: ${colors.GRAY_BASIC_DARK};
  border: 1px solid ${colors.GRAY_BASIC_DARK};
  cursor: pointer;
  transition: all .3s;
  min-width: 80px;

  &:hover,
  &:active,
  &:visited,
  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(80, 80, 80, .1);

    ${({ isDisabled }) => isDisabled && css`
      background: transparent;
    `}
  }


`

type ITooltippedButtonProps = {
  position?: string
}

const TooltippedButton = styled.div<ITooltippedButtonProps>`
  position: absolute;
  ${({ position }) => {
    switch (position) {
      case 'right': {
        return css`
          bottom: 15px;
          right: 10px;
        `
      }

      default: {
        return css`
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        `
      }
    }
  }}

  
`

export default Button
export {TooltippedButton}