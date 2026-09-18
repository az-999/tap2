import React, { ReactNode } from 'react';

import Text from '@/components/UI/Text';

import { InformationBlockContainer } from '@/pages/Airdrop/components/InformationBlock/styled';

interface InformationBlockProps {
  size?: 'small' | 'regular';
  title?: string;
  content: ReactNode;
}

const InformationBlock = ({
  size = 'regular',
  title,
  content,
}: InformationBlockProps) => {
  const isSmallSize = size === 'small';

  return (
    <InformationBlockContainer $isSmallSize={isSmallSize}>
      {title && (
        <Text fontSize={17} fontWeight={700}>
          {title}
        </Text>
      )}
      {content}
    </InformationBlockContainer>
  );
};

export default InformationBlock;
