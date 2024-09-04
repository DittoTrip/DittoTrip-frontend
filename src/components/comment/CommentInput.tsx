import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const CommentInput = () => {
  const [commentText, setCommentText] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    // 전송
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(); // 엔터 키가 눌리면 검색 실행
    }
  };

  return (
    <CommentInputStyled>
      <div className="comment-input-wrapper">
        <input
          className="comment-input"
          type="text"
          placeholder={t('comment.placeholder')}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러
        />
        <button className="comment-submit">{t('comment.submit')}</button>
      </div>
    </CommentInputStyled>
  );
};

const CommentInputStyled = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  bottom: 87px;
  left: 0;

  height: 60px;
  width: 100%;

  background-color: white;

  .comment-input-wrapper {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 5px 20px;
    margin: 10px 28px;

    border: 1px solid ${({ theme }) => theme.color.keyColor};
    border-radius: 20px;

    .comment-input {
      flex: 1;
      background-color: transparent;
      border: none;
      outline: none;
    }

    .comment-submit {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.color.keyColor};
      ${({ theme }) => theme.font.body3};
    }
  }
`;

export default CommentInput;
