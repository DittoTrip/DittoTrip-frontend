import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { OptionItem } from '../../pages/Review';

interface Props {
  value: OptionItem;
  setIsOpen: (isOpened: boolean) => void;
}

const DropDown = ({ value, setIsOpen }: Props) => {
  return (
    <DropDownStyle onClick={() => setIsOpen(true)}>
      <span className="arrow">
        <FontAwesomeIcon icon={faChevronDown} />
      </span>
      <span className="value">{value.text}</span>
    </DropDownStyle>
  );
};

export const DropDownStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  height: 30px;
  padding: 0 10px;

  border: 1px solid ${({ theme }) => theme.color.gray60};
  border-radius: 15px;

  .value {
    color: ${({ theme }) => theme.color.gray60};
    ${({ theme }) => theme.font.body4}
  }

  .arrow {
    display: flex;
    align-items: center;
    font-size: 9px;
    path {
      color: ${({ theme }) => theme.color.gray60};
    }
  }
`;

export default DropDown;
