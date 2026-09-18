import styled from 'styled-components/macro';

export const TaskItemContainer = styled.div<{
  $isMultiPart: boolean;
  $paddingRight: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: ${({ $paddingRight }) => $paddingRight};

  #green {
    color: #2eff73;
    font-weight: 700;
  }

  #strong {
    font-weight: 700;
  }

  span:nth-of-type(${({ $isMultiPart }) => ($isMultiPart ? 2 : 1)}) {
    color: #a4afbb;
  }

  a {
    color: #62acef;
    font-weight: 400;
    font-size: 12px;
    text-decoration: underline;
  }
`;
