import styled, { FlattenSimpleInterpolation } from 'styled-components/macro';

export const CustomText = styled.span<{
  color: string;
  fontSize: number;
  fontWeight: number;
  styledFragment?: FlattenSimpleInterpolation;
}>`
  font-family: 'SF Pro Display', serif;
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeight};

  ${({ styledFragment }) => styledFragment};
`;
