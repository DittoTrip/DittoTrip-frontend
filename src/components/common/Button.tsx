import { styled } from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../styles/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
}
const Button = ({ children, size, scheme, disabled, onClick }: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} disabled={disabled} onClick={onClick}>
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

  border: ${({ theme, scheme }) => theme.buttonScheme[scheme].border ?? 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};

  ${({ theme, size }) => theme.button[size].font};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`;

export default Button;
