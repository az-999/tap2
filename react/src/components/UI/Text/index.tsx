import React from 'react';
import { FlattenSimpleInterpolation } from 'styled-components/macro';

import { CustomText } from './styled';

interface TextProps {
  color?: string;
  fontSize: number;
  fontWeight: number;
  children: React.ReactNode | React.ReactNode[];
  styledFragment?: FlattenSimpleInterpolation;
  onClick?: () => void;
}

const Text = (props: TextProps) => {
  const {
    color = '#fff',
    fontSize,
    fontWeight,
    children,
    styledFragment,
    onClick,
  } = props;

  return (
    <CustomText
      onClick={onClick}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      styledFragment={styledFragment}
    >
      {children}
    </CustomText>
  );
};

export default Text;
