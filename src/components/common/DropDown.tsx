import { styled } from 'styled-components';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setValue: () => void;
}

const DropDown = ({ setValue }: Props) => {
  return (
    <DropDownStyle>
      <div className="dropDown" onClick={() => setValue}>
        <span className="arrow">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
        <span className="value">최신순</span>
      </div>
    </DropDownStyle>
  );
};

export const DropDownStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 80px;
  height: 30px;

  border: 1px solid ${({ theme }) => theme.color.gray60};
  border-radius: 15px;

  .value {
    color: ${({ theme }) => theme.color.gray60};
    ${({ theme }) => theme.font.body4}
  }

  .arrow {
    font-size: 9px;
    path {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
`;

export default DropDown;
