import { KeyboardEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

interface Props {
  tags: string[];
  handleAddTag: (newTag: string) => void;
  handleDeleteTag: (tag: string) => void;
}

const TagInput = ({ tags, handleAddTag, handleDeleteTag }: Props) => {
  const { t } = useTranslation();

  const textRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  // 태그 추가
  const handleAddNewTag = (event: KeyboardEvent<HTMLInputElement>) => {
    const newTag = textRef.current!.value.trim();

    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault();

      //  중복 방지, 10개 이하, 공백 불가
      if (!tags?.includes(newTag) && (!tags || tags?.length < 10) && newTag.length > 0) {
        handleAddTag(newTag);
        textRef.current!.value = '';
        textRef.current?.blur();
      } else if (tags.length >= 10) {
        alert(t('tag.tagLimitMessage'));
      }
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  // 태그 삭제
  const handleRemoveTag = (event: React.MouseEvent<HTMLButtonElement>, tag: string) => {
    event.preventDefault();
    handleDeleteTag(tag);
  };

  return (
    <TagInputContainer>
      <div className="input-container">
        <span className="tag-prefix">#</span>
        <input
          className="tag-input"
          type="text"
          ref={textRef}
          onKeyDown={handleAddNewTag}
          placeholder={t('tag.placeholder')}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
      </div>
      <div className="tag-list">
        {tags &&
          tags.map((tag, index) => (
            <div key={index} className="tag">
              # {tag}
              <button onClick={e => handleRemoveTag(e, tag)} className="tag-remove-button">
                &times;
              </button>
            </div>
          ))}
      </div>
    </TagInputContainer>
  );
};

const TagInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .input-container {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 15px;
    padding: 2px 8px;
    background-color: ${({ theme }) => theme.color.subColor3};

    .tag-prefix {
      ${({ theme }) => theme.font.body4};
      margin-right: 4px;
    }

    .tag-input {
      border: none;
      outline: none;
      color: black;
      ${({ theme }) => theme.font.body4};
      background-color: transparent;
    }
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .tag {
    width: fit-content;
    padding: 2px 12px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color.subColor3};
    color: black;
    ${({ theme }) => theme.font.body4};

    .tag-remove-button {
      background: none;
      border: none;

      margin-left: 4px;
      color: ${({ theme }) => theme.color.gray60};
      cursor: pointer;
    }
  }
`;

export default TagInput;
