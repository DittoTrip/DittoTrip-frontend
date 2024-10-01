import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

interface Props {
  placeholder?: string;
  handleSubmit: (comment: string) => void;
  fixed?: boolean;
}

const CommentInput = ({ placeholder, handleSubmit, fixed = true }: Props) => {
  const [commentText, setCommentText] = useState('');
  const { t } = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    handleSubmit(commentText);
    setCommentText('');
  };

  return (
    <CommentInputStyled fixed={fixed}>
      <div className="input-container">
        <div className="comment-input-wrapper">
          <input
            className="comment-input"
            type="text"
            placeholder={placeholder ? placeholder : t('comment.placeholder')}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="comment-submit" onClick={handleClick}>
            {t('comment.submit')}
          </button>
        </div>
      </div>
    </CommentInputStyled>
  );
};

const CommentInputStyled = styled.div<{ fixed: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 60px;

  position: ${({ fixed }) => (fixed ? 'fixed' : 'static')};
  bottom: ${({ fixed }) => (fixed ? '87px' : 'auto')};
  left: ${({ fixed }) => (fixed ? '0' : 'auto')};
  right: ${({ fixed }) => (fixed ? '0' : 'auto')};

  background-color: ${({ theme }) => theme.color.gray40};

  .input-container {
    display: flex;
    align-items: center;

    width: 100%;
    height: 60px;
    max-width: 600px;

    margin: 0 auto;
    background-color: white;
    padding: 10px 20px;
  }

  .comment-input-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;

    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.keyColor};
    border-radius: 20px;

    background-color: white;

    .comment-input {
      flex: 1;
      background-color: transparent;
      border: none;
      outline: none;
      min-width: 0;
    }

    .comment-submit {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body3};
      white-space: nowrap;
    }
  }
`;

export default CommentInput;
