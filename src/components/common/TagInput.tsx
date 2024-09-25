import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

interface Props {
  tags: string[];
  handleAddTag: (newTag: string) => void;
  handleDeleteTag: (tag: string) => void;
}

const TagInput = ({ tags, handleAddTag, handleDeleteTag }: Props) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');

  // 태그 추가
  const handleAddNewTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim();
      //  중복 방지, 10개 이하
      if (!tags.includes(newTag) && tags.length < 10) {
        handleAddTag(newTag);
      } else if (tags.length >= 10) {
        alert(t('tag.tagLimitMessage'));
      }
      setInputValue('');
    }
  };
  // 태그 삭제
  const handleRemoveTag = (tag: string) => {
    handleDeleteTag(tag);
  };
  // inputValue 관리
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TagInputContainer>
      <div className="input-container">
        <span className="tag-prefix">#</span>
        <input
          className="tag-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleAddNewTag}
          placeholder={t('tag.placeholder')}
        />
      </div>
      <div className="tag-list">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            # {tag}
            <button onClick={() => handleRemoveTag(tag)} className="tag-remove-button">
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
