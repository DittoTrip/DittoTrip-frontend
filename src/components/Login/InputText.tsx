import React from 'react';
import { ForwardedRef } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: 'email' | 'password';
}

const InputText = React.forwardRef(
  ({ placeholder, inputType, onChange, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyled placeholder={placeholder} ref={ref} type={inputType} onChange={onChange} {...props} />;
  }
);

const InputTextStyled = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray60};
  outline: none;

  line-height: 1;
  ${({ theme }) => theme.font.body2}
`;

export default InputText;
