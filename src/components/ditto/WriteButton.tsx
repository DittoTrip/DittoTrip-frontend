import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ColorKey } from '../../styles/theme';

interface Props {
  handleClick: () => void;
  backgroundColor?: ColorKey;
  color?: ColorKey;
  border?: boolean;
}

const WriteButton = ({ handleClick, backgroundColor, color, border }: Props) => {
  return (
    <div>
      <WriteButtonStyled backgroundColor={backgroundColor!} color={color!} border={border!}>
        <div className="write-button" onClick={() => handleClick()}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </WriteButtonStyled>
    </div>
  );
};

const WriteButtonStyled = styled.div<{ backgroundColor: ColorKey; color: ColorKey; border: boolean }>`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme.color[backgroundColor] : theme.color.subColor1};
  ${({ border }) => border && `border: 2px solid white;`}

  .write-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    path {
      color: ${({ theme, color }) => (color ? theme.color[color] : 'white')};
    }
  }
`;

export default WriteButton;
