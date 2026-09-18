import React, { ReactNode } from 'react';
import styled, {
  FlattenSimpleInterpolation,
  css,
} from 'styled-components/macro';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  fragment?: FlattenSimpleInterpolation;
  children: string | ReactNode;
}

const StyledButton = styled.button<{
  fragment?: FlattenSimpleInterpolation;
}>`
  font-family: 'SF Pro Display', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px 16px;
  min-height: 50px;
  background: #3c6;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  outline: none;
  border: none;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 29.1px 0 rgba(51, 204, 102, 0.35);
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      background: none;
      border: 2px solid #67c971;
    `};

  ${({ fragment }) => fragment && fragment}
`;
const Button = (props: ButtonProps) => {
  const { onClick, disabled, fragment, children } = props;
  return (
    <StyledButton onClick={onClick} disabled={disabled} fragment={fragment}>
      {children}
    </StyledButton>
  );
};

export default Button;
