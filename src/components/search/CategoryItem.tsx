import { styled } from 'styled-components';
import { defaultImage } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';

interface CategoryItemProps {
  id: number;
  img: string;
  title: string;
}

const CategoryItem = ({ id, img, title }: CategoryItemProps) => {
  const navigate = useNavigate();

  return (
    <CategoryItemStyled>
      <div className="hot-category-wrapper" onClick={() => navigate(`/spot/list/${id}`)}>
        <img className="category-item-img" src={img ?? defaultImage} alt={title} />
        <div className="category-item-name">{title}</div>
      </div>
    </CategoryItemStyled>
  );
};

const CategoryItemStyled = styled.div`
  .hot-category-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    margin-right: 8px;

    .category-item-img {
      width: 100px;
      height: 128px;
      object-fit: cover;
      border-radius: 12px;
    }
    .category-item-name {
      width: 100px;
      text-align: start;
      overflow: hidden;
      text-overflow: ellipsis;
      ${({ theme }) => theme.font.body3}
    }
  }
`;

export default CategoryItem;
