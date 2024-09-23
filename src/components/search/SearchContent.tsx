import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useBookmarkedCategory from '../../hooks/category/useCategoryLike';
import { useAuthStore } from '../../store/authStore';

import styled from 'styled-components';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import { CategoryData } from '../../models/category/categoryModel';
import { defaultImage } from '../../constants/constant';

interface Props {
  data: CategoryData;
}

const SearchContent = ({ data }: Props) => {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarkedCategory(data.categoryId.toString());
  const { isLoggedIn } = useAuthStore();

  const handleHeartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      alert('로그인하세요');
      return;
    }
    toggleBookmark();
  };

  return (
    <SearchContentStyle>
      <div className="content-box" onClick={() => navigate(`/list/${data.categoryId}`)}>
        <img className="content-img" src={data.imageFilePath ?? defaultImage}></img>
        <div className="title-box">
          <div className="content-title">{data.name}</div>
          <div className="like" onClick={handleHeartClick}>
            <FontAwesomeIcon icon={isBookmarked ? faHeart : faEmptyHeart} />
          </div>
        </div>
      </div>
    </SearchContentStyle>
  );
};

const SearchContentStyle = styled.div`
  text-align: center;
  display: inline-block;

  .content-img {
    width: 100%;
    aspect-ratio: 0.8;

    border-radius: 12px;
    margin-bottom: 12px;
    object-fit: cover;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .title-box {
    display: flex;
    justify-content: space-between;
  }

  .content-title {
    ${({ theme }) => theme.font.body2}
    font-weight: bold;
  }

  .like {
    margin-right: 0;
    font-size: 20px;
    path {
      color: ${({ theme }) => theme.color.keyColor};
    }
  }
`;

export default SearchContent;
