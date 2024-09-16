import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useDittoList from '../hooks/ditto/useDittoList';
import { addDittoComment, deleteDittoComment } from '../api/dittoComment';
import useDittoBookmark from '../hooks/ditto/useDittoLike';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as EmptyBookmark, faComment } from '@fortawesome/free-regular-svg-icons';

import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';
import CommentInput from '../components/comment/CommentInput';
import UserProfileWithComment from '../components/common/UserProfileWithComment';
import useDittoDetail from '../hooks/ditto/useDittoDetail';
import ErrorPage from './Error';

import formatDate from '../utils/formatDate';
import DittoInfinity from '../components/ditto/DittoInfinity';
import { defaultPageOptions } from '../constants/constant';
import { CommentData } from '../models/ditto/dittoModel';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import CommentList from '../components/comment/CommentList';

const DittoDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { dittoData, commentData, commentCount, error, loading } = useDittoDetail(id!);
  const { isBookmarked, toggleBookmark, bookmarkCount } = useDittoBookmark(id!, 5);
  // 더 알아보기
  const [currentPage, setCurrentPage] = useState(0);
  const { dittoList, hasMore } = useDittoList(currentPage, defaultPageOptions);

  // 리뷰, 댓글 삭제 or 신고 펼치기
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  // "삭제","신고"를 위한 comment
  const [selectedComment, setSelectedComment] = useState<CommentData>();

  // "대댓글" 위한 parentComment => parentId가 null 이면 등록 , string이면 대댓글
  const [parentComment, setParentComment] = useState<CommentData | null>(null);
  // 댓글 컨트롤 (등록)
  const handleSubmit = (comment: string) => {
    const body = { body: comment };
    console.log(body);

    addDittoComment(id!, body, parentComment?.commentId.toString()).then(
      res => {
        console.log(res);
        setParentComment(null);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  };

  // 댓글 컨트롤 (삭제)
  const handleDelete = () => {
    if (selectedComment) {
      deleteDittoComment(id!, selectedComment?.commentId.toString()).then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  // 내 댓글인 경우 옵션 - 삭제
  const expandedMyOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        alert('delete');
        handleDelete();
        setIsExpandedOptions(false);
      },
    },
  ];

  // 내 댓글 아닌 경우 - 신고
  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        navigate(`/report/COMMENT/${selectedComment!.commentId.toString()}`);
      },
    },
  ];

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      setCurrentPage(prevPage => prevPage + 1); // Load next page
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
        <CommentList
          comments={commentData!}
          setSelectedComment={setSelectedComment}
          setIsExpandedOption={setIsExpandedOptions}
          setParentComment={setParentComment}
          parentComment={parentComment!}
        />
      </div>
      <CommentInput
        handleSubmit={handleSubmit}
        placeholder={parentComment ? '대댓글을 남겨보세요' : t('comment.placeholder')}
        fixed={false}
      />

      <div className="content-wrapper">
        <div>더 찾아보기</div>
      </div>
      <DittoInfinity dittoList={dittoList} />

      {isExpandedOptions && selectedComment && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={selectedComment.isMine ? expandedMyOptionsContent : expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
        />
      )}
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
