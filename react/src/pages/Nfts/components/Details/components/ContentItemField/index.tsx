import React from 'react';

import Text from '@/components/UI/Text';

import { ContentItem } from '@/pages/Nfts/components/Details/styled';

interface ContentItemFieldProps {
  title: string;
  value: string;
}

const ContentItemField = ({ title, value }: ContentItemFieldProps) => {
  return (
    <ContentItem>
      <Text fontSize={14} fontWeight={400}>
        {title}
      </Text>
      <Text fontSize={14} fontWeight={500}>
        {value}
      </Text>
    </ContentItem>
  );
};

export default ContentItemField;
