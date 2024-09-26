import { useNavigate } from 'react-router-dom';

import useBookmarkedCategory from '../../hooks/category/useCategoryLike';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import { CategoryData } from '../../models/category/categoryModel';
import { defaultImage } from '../../constants/constant';

interface Props {
  data: CategoryData;
}

const SearchCeleb = ({ data }: Props) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarkedCategory(data.categoryId.toString());

  const handleHeartClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    toggleBookmark();
  };

  return (
    <SearchCelebStyle>
      <div
        className="celeb-box"
        onClick={() => {
          navigate(`/spot/list/${data.categoryId}`);
        }}>
        <img className="celeb-img" src={data.imageFilePath ?? defaultImage}></img>
        <div className="celeb-name">{data.name}</div>
        <div className="like" onClick={handleHeartClick}>
          <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} />
        </div>
      </div>
    </SearchCelebStyle>
  );
};

const SearchCelebStyle = styled.div`
  .celeb-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    border-bottom: solid 1px #e6e6e6;
  }
  .celeb-img {
    width: 74px;
    height: 74px;
    object-fit: cover;

    margin: 20px 0;
    margin-right: 20px;

    border-radius: 50%;
  }

  .celeb-name {
    flex: 1;
    text-align: left;
    ${({ theme }) => theme.font.body2};
  }

  .like {
    font-size: 20px;
    path {
      color: ${({ theme }) => theme.color.keyColor};
    }
  }
`;

export default SearchCeleb;
