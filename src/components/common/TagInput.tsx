import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { ISpotForm } from '../../pages/SpotApply';
import { UseFormSetValue } from 'react-hook-form';

interface Props {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setValue: UseFormSetValue<ISpotForm>;
}

const TagInput = ({ tags, setTags, setValue }: Props) => {
  const [inputValue, setInputValue] = useState('');

  // 태그 추가
  const handleAddTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim();
      //  중복 방지, 10개 이하
      if (!tags.includes(newTag) && tags.length < 10) {
        setTags([...tags, newTag]);
        setValue('hashtagNames', [...tags, newTag]);
      } else if (tags.length >= 10) {
        alert('10개까지만 등록이 가능합니다.');
      }
      setInputValue('');
    }
  };
  // 태그 삭제
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    setValue(
      'hashtagNames',
      tags.filter(t => t !== tag)
    );
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
          onKeyDown={handleAddTag}
          placeholder="태그를 입력하세요"
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
