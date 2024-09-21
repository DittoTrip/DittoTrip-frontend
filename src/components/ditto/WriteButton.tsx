import { styled } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

interface Props {
  handleClick: () => void;
}

const WriteButton = ({ handleClick }: Props) => {
  return (
    <div>
      <WriteButtonStyled>
        <div className="write-button" onClick={() => handleClick()}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </WriteButtonStyled>
    </div>
  );
};

const WriteButtonStyled = styled.div`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  margin-top: 9px;
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.subColor1};

  .write-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    path {
      color: white;
    }
  }
`;

export default WriteButton;
