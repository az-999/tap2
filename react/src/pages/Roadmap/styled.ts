import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 70px 20px 60px;
  height: 100vh;
`;
export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow: hidden;
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  width: fit-content;
  margin-top: 8px;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;

    #beta-icon {
      position: absolute;
      top: -7px;
      right: 0;
      border-radius: 2px;
      background: #3c6;
      padding: 2px 3px;
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 8px;
    }
  }
`;
export const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
  overflow-y: auto;

  #colored-dash {
    color: #33cc66 !important;
  }
`;
export const Point = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  position: relative;

  div:first-child {
    display: flex;
    gap: 10px;
  }

  div:last-child:not(#pump-ticket-icon) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 30px;

    span {
      color: #d2d2d2;
    }
  }

  #pump-ticket-icon {
    position: absolute;
    left: 31px;
  }
`;
export const CheckmarkWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(p) => (p.isActive ? '#3C6' : 'rgba(255, 255, 255, .1)')};
`;
export const FooterWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px 0 0;
`;
export const CompanyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;
export const IllustrationTop = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 146px;
  width: 88%;
  object-fit: cover;
  object-position: bottom;
`;
export const IllustrationBottom = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 60px;
`;
