import styled, { css } from "styled-components";

const EmotionBox = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: #b6e2a1;
          color: white;
        `
      : css`
          background-color: #f1f7e7;
        `}
  border: 1px solid #bfd8b8;
`;

const EmotionImage = styled.img`
  width: 2vw;
  margin-bottom: 0.5rem;
`;

interface EmotionItems {
  emotionId: number;
  emotionImage: string;
  emotionDescription: string;
  onClick: (emotionId: number) => void;
  isSelected: boolean;
}

const EmotionItem = ({
  emotionId,
  emotionImage,
  emotionDescription,
  onClick,
  isSelected,
}: EmotionItems) => {
  const emotionHandler = () => {
    onClick(emotionId);
  };

  return (
    <EmotionBox isSelected={isSelected} onClick={emotionHandler}>
      <EmotionImage src={emotionImage} alt="Emotion icon" />
      <span>{emotionDescription}</span>
    </EmotionBox>
  );
};

export default EmotionItem;
