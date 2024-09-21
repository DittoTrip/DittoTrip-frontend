import { styled } from 'styled-components';

interface Props {
  message: string;
  handleConfirm?: () => void;
  setIsOpen: (isOpen: boolean) => void;
  width: number;
}

const Modal = ({ message, handleConfirm, setIsOpen, width }: Props) => {
  return (
    <ModalStyle width={width}>
      <div
        className="modal-overlay"
        onClick={() => {
          setIsOpen(false);
        }}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="message">{message}</div>
          <hr />
          <div className="confirm" onClick={handleConfirm ? handleConfirm : () => setIsOpen(false)}>
            확인
          </div>
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

    background-color: rgba(0, 0, 0, 0.3); /* 배경 투명도 50% */

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

    .message {
      padding: 20px 0;
    }
    hr {
      margin: 0;
    }
    .confirm {
      padding: 11px 0;
      color: ${({ theme }) => theme.color.keyColor};
    }
  }
`;

export default Modal;
