import React from 'react';
import styled from 'styled-components/macro';

const BumpCard = (): JSX.Element => {
  return (
    <StyledBox>
      <div className="group">
        <div className="overlap">
          <p className="text-wrapper">
            We’ll reward you immediately with points after each task completion
          </p>
          <div className="lightbulb-flash-line-wrapper">
            <div className="lightbulb-flash-line" />
          </div>
          <p className="once-all-tickets">
            Once all tickets have been purchased, <br />
            the BUMP countdown is activated <br />
            After 1.000,000,000 taps, <br />
            ticket holders will receive a link to Bump
          </p>
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="div">Buy a Bump ticket</div>
            </div>
          </div>
          <div className="group-2" />
          <img
            className="ticket-add"
            alt=""
            src="https://c.animaapp.com/eTvUjwjZ/img/ticket-add--streamline-ultimate@2x.png"
          />
        </div>
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  height: 138px;
  width: 320px;

  & .group {
    // position: fixed;
    top: 0;
    left: 0;
    width: 324px;
    height: 138px;
  }

  & .overlap {
    position: relative;
    border-radius: 10px;
    width: 320px;
    height: 138px;
  }

  & .text-wrapper {
    position: absolute;
    top: 57px;
    left: 40px;
    opacity: 0.8;
    width: 240px;
    height: 30px;
    color: #ffffff;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    font-family: 'SF Pro Display-Regular', Helvetica;
    letter-spacing: 0;
    text-align: center;
  }

  & .lightbulb-flash-line-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backdrop-filter: blur(10px) brightness(100%);
    backdrop-filter: blur(10px) brightness(100%);
    border-radius: 10px;
    background-color: #222325;
    width: 320px;
    height: 138px;
  }

  & .lightbulb-flash-line {
    position: relative;
    top: 12px;
    left: 12px;
    width: 36px;
    height: 36px;
  }

  & .once-all-tickets {
    position: absolute;
    top: 14px;
    left: 101px;
    width: 208px;
    height: 60px;
    color: #ffffff;
    font-weight: 300;
    font-size: 12px;
    line-height: 14.6px;
    font-family: 'SF Pro Display-Light', Helvetica;
    letter-spacing: 0;
  }

  & .overlap-group-wrapper {
    position: absolute;
    top: 100px;
    left: 12px;
    width: 131px;
    height: 27px;
  }

  & .overlap-group {
    position: relative;
    box-shadow: 0px -1.24px 14.76px #33cc664c;
    border-radius: 6.2px;
    background-color: #33cc66;
    width: 129px;
    height: 27px;
  }

  & .div {
    position: absolute;
    top: 5px;
    left: 6px;
    width: 116px;
    height: 17px;
    color: #ffffff;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    font-family: 'SF Pro Display-Regular', Helvetica;
    letter-spacing: 0;
    text-align: center;
  }

  & .group-2 {
    position: absolute;
    top: 100px;
    left: 159px;
    box-shadow: 0px -1.24px 14.76px #33cc664c;
    border: 1.24px solid;
    border-color: #33cc66;
    border-radius: 6.2px;
    width: 149px;
    height: 27px;
  }

  & .ticket-add {
    position: absolute;
    top: 20px;
    left: 14px;
    width: 48px;
    height: 48px;
  }
`;

export default BumpCard;
