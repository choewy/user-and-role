import styled, { CSSProperties } from 'styled-components';

const Input = styled.input<CSSProperties>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '8px'};
  line-height: ${({ lineHeight }) => lineHeight};
  height: ${({ height }) => height || '40px'};
  width: ${({ width }) => width || '100%'};
  border: ${({ border }) => border || '1px solid var(--grey-400)'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || '8px'};
  background-color: white;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: var(--grey-300);
  }
`;

export default Input;
