import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { searchCategoryWithoutType } from '../../api/category';
import { CategoryData } from '../../models/Category/categoryModel';
import { UseFormSetValue } from 'react-hook-form';
import { defaultImage } from '../../constants/constant';
import { FormInputs } from '../../pages/SpotApply';

interface Props {
  selectedCategory: CategoryData[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryData[]>>;
  setValue: UseFormSetValue<FormInputs>;
}
const CategorySearch = ({ selectedCategory, setSelectedCategory, setValue }: Props) => {
  const [searchWord, setSearchWord] = useState('');
  const [categories, setCategories] = useState<CategoryData[]>([]);

  // 검색어 변경 시 카테고리 검색
  useEffect(() => {
    if (searchWord) {
      const fetchCategories = async () => {
        try {
          const result = await searchCategoryWithoutType(searchWord);
          setCategories(result);
        } catch (error) {
          console.error('카테고리 검색 실패', error);
        }
      };
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [searchWord]);

  // 입력값 처리
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  // 카테고리 선택 처리
  const handleCategorySelect = (category: CategoryData) => {
    if (!selectedCategory.some(selected => selected.categoryId === category.categoryId)) {
      const newSelectedCategory = [...selectedCategory, category];
      setSelectedCategory(newSelectedCategory);
      setValue(
        'categoryIds',
        newSelectedCategory.map(category => category.categoryId)
      );
      setSearchWord('');
      setCategories([]);
    } else {
      alert('이미 등록된 카테고리입니다.');
      setSearchWord('');
      setCategories([]);
    }
  };
  // 선택된 카테고리 삭제 처리
  const handleRemoveCategory = (categoryId: number) => {
    const newSelectedCategory = selectedCategory.filter(category => category.categoryId !== categoryId);
    setSelectedCategory(newSelectedCategory);
    setValue(
      'categoryIds',
      newSelectedCategory.map(category => category.categoryId) // categoryId만 추출
    );
  };

  return (
    <CategorySearchContainer>
      <input
        type="text"
        value={searchWord}
        onChange={handleInputChange}
        placeholder="스팟과 관련된 카테고리를 검색해 주세요"
        className="search-input"
      />
      {categories.length > 0 && (
        <div className="category-list">
          {categories.map(category => (
            <div key={category.categoryId} className="category-item" onClick={() => handleCategorySelect(category)}>
              <img className="category-img" src={category.imageFilePath ?? defaultImage} />
              {category.name}
            </div>
          ))}
        </div>
      )}
      {selectedCategory.length > 0 && (
        <div className="selected-category-list">
          {selectedCategory.map(category => (
            <div key={category.categoryId} className="selected-category-item">
              {category.name}
              <button className="remove-button" onClick={() => handleRemoveCategory(category.categoryId)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </CategorySearchContainer>
  );
};

// 스타일 정의
const CategorySearchContainer = styled.div`
  position: relative;

  .search-input {
    width: 100%;
    height: 42px;

    padding: 8px;
    margin-top: 8px;

    border: 1px solid ${({ theme }) => theme.color.gray40};
    outline: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.gray20};

    ${({ theme }) => theme.font.body4};
    box-sizing: border-box;
  }

  .category-list {
    position: absolute;
    top: 47px;
    left: 0;
    right: 0;

    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 2px;
  }

  .category-item {
    display: flex;
    gap: 20px;
    padding: 12px 20px;
    align-items: center;

    background-color: ${({ theme }) => theme.color.gray20};
    cursor: pointer;
    ${({ theme }) => theme.font.body5};
    font-weight: bold;

    .category-img {
      width: 60px;
      height: 60px;
      border-radius: 12px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.color.gray40};
    }
  }

  .selected-category-list {
    margin: 20px 0;
    border: 1px solid ${({ theme }) => theme.color.gray40};
    border-radius: 12px;
    padding: 8px;
    ${({ theme }) => theme.font.body4};
  }

  .selected-category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 8px;
    margin-bottom: 4px;
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.color.gray30};
    }
  }

  .remove-button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.color.gray60};
    font-size: 16px;
    cursor: pointer;
  }
`;

export default CategorySearch;
