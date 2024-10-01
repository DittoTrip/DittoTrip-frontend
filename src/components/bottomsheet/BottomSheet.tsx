import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { OptionItem } from '../../pages/ReviewList';

interface Props {
  title: string;

  content?: string;

  list?: Array<OptionItem>;
  selectedSortId?: number;
  setIsOpen: (isOpen: boolean) => void;
}
const BottomSheet = ({ title, content, list, selectedSortId, setIsOpen }: Props) => {
  return (
    <BottomSheetStyled>
      <div
        className="bottom-sheet-overlay"
        onClick={() => {
          setIsOpen(false);
        }}>
        <div className="bottom-sheet-content" onClick={e => e.stopPropagation()}>
          <div className="head">{title}</div>
          <div className="content-list">
            <ul>
              {list?.map((item, index) => (
                <li
                  key={index}
                  className={item.id === selectedSortId ? 'selected' : ''}
                  onClick={() => {
                    item.handleClick();
                  }}>
                  <div className="option">
                    {item.text}
                    {item.id === selectedSortId && <FontAwesomeIcon icon={faCheck} className="check-icon" />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="content">{content}</div>
        </div>
      </div>
    </BottomSheetStyled>
  );
};

const BottomSheetStyled = styled.div`
  .bottom-sheet-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 10;
    background-color: rgba(0, 0, 0, 0.4);

    @media screen and (min-width: 600px) {
      width: 600px;
      margin: 0 auto;
    }
  }

  .bottom-sheet-content {
    position: fixed;
    bottom: 87px;
    left: 0;

    background: ${({ theme }) => theme.color.background};
    width: 100%;

    padding: 12px 30px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 20;

    @media screen and (min-width: 600px) {
      width: 600px;
      left: calc(50vw - 300px);
    }
  }

  .head {
    text-align: center;
    ${({ theme }) => theme.font.body5};
    font-weight: bold;

    // color: ${({ theme }) => theme.color.gray80};
  }

  .content-list {
    margin: 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 8px 0;
      cursor: pointer;
    }

    li.selected .option {
      color: ${({ theme }) => theme.color.keyColor};
    }

    .option {
      display: flex;
      justify-content: space-between;

      ${({ theme }) => theme.font.body4};
      font-weight: bold;
      color: ${({ theme }) => theme.color.gray80};
    }

    .check-icon {
      path {
        color: ${({ theme }) => theme.color.keyColor};
      }
    }
  }

  .content {
    ${({ theme }) => theme.font.body5};
    margin-top: 12px;
  }
`;

export default BottomSheet;
