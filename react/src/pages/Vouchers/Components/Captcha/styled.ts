import styled from 'styled-components/macro';

export const CaptchaContainer = styled.div`
  margin: 10px 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  gap: 28px;
  min-height: 258px;

  img {
    object-fit: cover;
  }

  svg {
    margin-top: 30px;
  }
`;

export const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledRange = styled.input<{ $trackPosition: string }>`
  margin: 18px 0 10px;
  -webkit-appearance: none; /* Сбрасываем стандартные стили */
  opacity: 1; /* Прозрачность */
  transition: opacity 0.2s; /* Плавное изменение прозрачности */
  outline: none; /* Убираем контур фокуса */
  border-radius: 1px; /* Скругление углов */
  width: 100%; /* Ширина ползунка */
  height: 4px; /* Высота дорожки */

  background: ${({ $trackPosition }) =>
    $trackPosition &&
    `linear-gradient(
    to right,
    #646566 0%,
    #646566 ${$trackPosition},
    #222325 ${$trackPosition},
    #222325 100%)`};

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 4px;
  }

  &::-moz-range-progress {
    border: none;
    background-color: #646566;
    height: 4px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Сбрасываем стандартные стили */
    appearance: none;
    cursor: pointer; /* Курсор при наведении */
    margin-top: -6px; /* Смещение ползунка относительно дорожки */
    border: none;
    border-radius: 4px; /* Круглый ползунок */
    background: #33cc66; /* Цвет ползунка */
    width: 28px; /* Ширина ползунка */
    height: 16px; /* Высота ползунка */
  }

  &::-moz-range-thumb {
    border: none;
    border-radius: 4px;
    background: #33cc66;
    width: 28px;
    height: 16px;
  }
`;

export const UpImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 50px;
  background-image: ${({ $backgroundImage }) => $backgroundImage};
`;

export const DownImage = styled.div<{
  $backgroundPosition: string;
  $backgroundImage: string;
}>`
  width: 100%;
  height: 50px;
  background-position: ${({ $backgroundPosition }) => $backgroundPosition};
  background-image: ${({ $backgroundImage }) => $backgroundImage};
`;

export const Button = styled.button`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  background: #3c6;
  border: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: #fff;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.7;
  }
`;

export const CaptchaImage = styled.img``;

export const CaptchaInput = styled.input`
  width: 164px;
  height: 40px;
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #222325;
  font-family: 'SF Pro Display', serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
  text-align: center;

  &::placeholder {
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;
