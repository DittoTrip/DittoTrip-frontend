import React from 'react';
import Slide from '../common/Slide';
import styled from 'styled-components';
import { CategoryData, categoryType } from '../../models/Category/categoryModel';

interface Props {
  title: string;
  list: CategoryData[];
  subType: categoryType;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loadMoreData: (subType: categoryType, page: number, setPage: React.Dispatch<React.SetStateAction<number>>) => void;
  isFavorite: boolean;
}

const CategorySection = ({ title, list, subType, page, setPage, loadMoreData, isFavorite }: Props) => {
  return (
    <SectionStyled>
      <div className="subTitle">{title}</div>
      <Slide carouselList={list} isFavorite={isFavorite} onEndReached={() => loadMoreData(subType, page, setPage)} />
    </SectionStyled>
  );
};

const SectionStyled = styled.div`
  padding: 12px 0;

  .subTitle {
    ${({ theme }) => theme.font.body2};
  }
`;

export default CategorySection;
