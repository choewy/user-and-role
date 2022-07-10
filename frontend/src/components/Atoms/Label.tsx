import styled, { CSSProperties } from 'styled-components';

const Label = styled.label<
  { isSelected?: boolean; isCorrect?: boolean } & CSSProperties
>`
  color: ${({ isSelected, isCorrect }) => {
    if (!isSelected) return 'var(--black)';
    return isCorrect ? 'var(--green-400)' : 'var(--red-400)';
  }};
`;

export default Label;
