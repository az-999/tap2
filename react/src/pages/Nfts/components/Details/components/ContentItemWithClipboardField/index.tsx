import React from 'react';

import Text from '@/components/UI/Text';

import CheckIcon from '@/pages/Nfts/assets/CheckIcon';
import CopyIcon from '@/pages/Nfts/assets/CopyIcon';
import { ContentItemWithClipboard } from '@/pages/Nfts/components/Details/styled';

interface ContentItemWithClipboardFieldProps {
  title: string;
  value: string;
  onClick: () => void;
  isCopied: boolean;
  isDisabled: boolean;
}

const ContentItemWithClipboardField = ({
  title,
  value,
  onClick,
  isCopied,
  isDisabled,
}: ContentItemWithClipboardFieldProps) => {
  return (
    <ContentItemWithClipboard>
      <div>
        <Text fontSize={14} fontWeight={400}>
          {title}
        </Text>
        <Text fontSize={14} fontWeight={500}>
          {value}
        </Text>
      </div>
      <div>
        <button onClick={onClick} disabled={isDisabled}>
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </ContentItemWithClipboard>
  );
};

export default ContentItemWithClipboardField;
