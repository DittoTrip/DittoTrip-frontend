import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';

import CommentInput from '../components/comment/CommentInput';
import CommentList from '../components/comment/DittoCommentList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as EmptyBookmark, faComment } from '@fortawesome/free-regular-svg-icons';

import UserProfileWithComment from '../components/common/UserProfileWithComment';
import useDittoDetail from '../hooks/ditto/useDittoDetail';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ErrorPage from './Error';
import useDittoBookmark from '../hooks/ditto/useDittoLike';

const DittoDetail = () => {
  const { id } = useParams();
  const { dittoData, dittoComment, commentCount, error, loading } = useDittoDetail(id!);
  console.log(dittoComment);
  const { isBookmarked, toggleBookmark, bookmarkCount } = useDittoBookmark(id!, 5);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }

  return (
    <DittoDetailStyle>
      <div className="app-bar">
        <AppBar leading={false} title={<div className="title">Ditto</div>} />
      </div>
      <img
        className="main-img"
        src="https://velog.velcdn.com/images/gogo6570/post/13956471-8806-4af6-a68b-50037177105a/image.png"
      />
      <div className="content-wrapper">
        <UserProfileWithComment
          name={dittoData!.userData.nickname}
          date={formatDate(dittoData!.createdDateTime)}
          following={true}
          setIsExpandedOption={() => {}}
        />

        <div className="title-wrapper">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <div>만휴정</div>
        </div>

        <div className="ditto-content">{dittoData?.body}</div>

        <div className="tag-wrapper">
          <TagSlide tagList={dittoData?.hashtags} />
        </div>

        <div className="icon-box">
          <FontAwesomeIcon
            className="icon"
            icon={isBookmarked ? faBookmark : EmptyBookmark}
            onClick={() => toggleBookmark()}
          />
          <div className="count">{bookmarkCount}</div>
          <FontAwesomeIcon className="icon" icon={faComment} />
          <div className="count">{commentCount}</div>
        </div>
      </div>
      <div className="content-wrapper">
        <CommentList comments={dittoComment!} setIsExpandedOption={() => {}} />
      </div>
      <CommentInput handleSubmit={() => {}} fixed={false} />

      <div className="content-wrapper">
        <div>더 찾아보기</div>
      </div>

      {/* <DittoInfinity dittoList={DummyDitto} /> */}
    </DittoDetailStyle>
  );
};

const DittoDetailStyle = styled.div`
  .title {
    ${({ theme }) => theme.font.title}
    color :  ${({ theme }) => theme.color.keyColor}
  }
  .app-bar {
    margin-bottom: 20px;
  }
  .main-img {
    width: 100%;
    height: 400px;
  }
  .content-wrapper {
    margin: 0 28px 16px 28px;

    .icon-box {
      display: flex;
      align-items: center;
      gap: 10px;

      padding-bottom: 12px;

      border-bottom: solid 1px ${({ theme }) => theme.color.gray40};

      .count {
        color: ${({ theme }) => theme.color.gray80};
      }

      .icon {
        path {
          color: ${({ theme }) => theme.color.subColor1};
        }
      }
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;

      font-weight: bold;

      margin-bottom: 10px;
    }

    .tag-wrapper {
      margin: 10px 0;
    }
  }
`;

export default DittoDetail;
