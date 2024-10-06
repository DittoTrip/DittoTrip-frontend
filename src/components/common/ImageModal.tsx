import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'styled-components';

interface Props {
  imageUrl: string;
  handleConfirm?: () => void;
  setIsOpen: (isOpen: boolean) => void;
  width: number;
}

const ImageModal = ({ imageUrl, setIsOpen, width }: Props) => {
  return (
    <ModalStyle width={width}>
      <div
        className="modal-overlay"
        onClick={() => {
          setIsOpen(false);
        }}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <FontAwesomeIcon className="close-button" icon={faX} onClick={() => setIsOpen(false)} />
          <img src={imageUrl} />
        </div>
      </div>
    </ModalStyle>
  );
};

const ModalStyle = styled.div<{ width: number }>`
  ${({ theme }) => theme.font.body4};
  font-weight: bold;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);

    z-index: 35;
  }

  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: ${({ width }) => width}%;

    background: ${({ theme }) => theme.color.background};

    border-radius: 14px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 20;

    text-align: center;

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;

      path {
        color: ${({ theme }) => theme.color.gray80};
      }

      cursor: pointer;
      border: none;
    }

    img {
      width: 100%;
      max-width: 100%;
      height: auto;
      border-radius: 14px;
    }
  }

  @media screen and (min-width: 800px) {
    .modal-content {
      width: 700px;
    }
  }
`;

export default ImageModal;
