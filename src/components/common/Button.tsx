import { styled } from 'styled-components';
import { ButtonScheme, ButtonSize, ColorKey } from '../../styles/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  backgroundColor?: ColorKey; // ColorKey 타입으로 변경
  color?: ColorKey; // ColorKey 타입으로 변경
  borderColor?: ColorKey;
}

const Button = ({ children, size, scheme, disabled, backgroundColor, color, borderColor, onClick }: Props) => {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
      borderColor={borderColor}
      onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  display: ${({ theme, size }) => theme.button[size].display};
  align-items: ${({ theme, size }) => theme.button[size].alignItems};
  gap: ${({ theme, size }) => theme.button[size].gap};

  padding: ${({ theme, size }) => theme.button[size].padding};
  ${({ theme, size }) => theme.button[size].width && `width: ${theme.button[size].width};`}
  max-width: 600px;

  border: ${({ borderColor, theme, scheme }) =>
    (borderColor ? `1px solid ${theme.color[borderColor]}` : theme.buttonScheme[scheme].border) ?? 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  color: ${({ color, theme, scheme }) => (color ? theme.color[color] : theme.buttonScheme[scheme].color)};

  background-color: ${({ backgroundColor, theme, scheme }) =>
    backgroundColor ? theme.color[backgroundColor] : theme.buttonScheme[scheme].backgroundColor};

  white-space: nowrap;
  ${({ theme, size }) => theme.button[size].font};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`;

export default Button;
