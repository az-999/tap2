import React from 'react';

import Text from '@/components/UI/Text';

import {
  ExplanationListContainer,
  List,
  ListItem,
  Sequence,
  StyledExplanationList,
  StyledItem,
} from '@/pages/BumpTicket/components/ExplanationList/styled';

interface ExplanationListProps {
  list: {
    id: string;
    sequence: number;
    title: string;
    list: string[];
  }[];
  withDots?: boolean;
  withPadding?: boolean;
}

const ExplanationList = ({
  list,
  withDots = true,
  withPadding = true,
}: ExplanationListProps) => {
  return (
    <ExplanationListContainer
      $withPadding={withPadding}
      id="explanation-list-container"
    >
      <Text fontSize={16} fontWeight={700}>
        How does it work?
      </Text>

      <StyledExplanationList>
        {list.map(({ sequence, id, list, title }) => (
          <StyledItem key={id}>
            <Sequence>{sequence}</Sequence>
            <Text fontSize={12} fontWeight={600}>
              {title}
            </Text>
            <List $withDots={withDots}>
              {list.map((i, index) => (
                <ListItem key={`${id}-${index}`}>{i}</ListItem>
              ))}
            </List>
          </StyledItem>
        ))}
      </StyledExplanationList>
    </ExplanationListContainer>
  );
};

export default ExplanationList;
