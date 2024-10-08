import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useDittoList from '../hooks/ditto/useDittoList';
import { addDittoComment, deleteDittoComment } from '../api/dittoComment';
import useDittoBookmark from '../hooks/ditto/useDittoLike';
import useDittoDetail from '../hooks/ditto/useDittoDetail';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as EmptyBookmark, faComment } from '@fortawesome/free-regular-svg-icons';

import AppBar from '../components/common/AppBar';
import TagSlide from '../components/common/TagSlide';
import CommentInput from '../components/comment/CommentInput';
import UserProfileWithComment from '../components/common/UserProfileWithComment';
import ErrorPage from './Error';
import DittoInfinity from '../components/ditto/DittoInfinity';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import CommentList from '../components/comment/CommentList';

import { CommentData } from '../models/ditto/dittoModel';
import { defaultImage, defaultPageOptions } from '../constants/constant';
import formatDate from '../utils/formatDate';
import { deleteDitto } from '../api/ditto';
import { addFollow, deleteFollow } from '../api/follow';
import { useAuthStore } from '../store/authStore';
import i18n from '../lang/i18n';
import LangSelectButton from '../components/LangSelectButton';
import ImageModal from '../components/common/ImageModal';

const DittoDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuthStore();
  const language = i18n.language;

  // 댓글 상태
  const [isCommentSending, setIsCommentSending] = useState(false);

  const { dittoData, commentData, commentCount, initialBookmarkCount, myFollowingId, error, loading } = useDittoDetail(
    id!,
    language,
    isCommentSending
  );
  const { isBookmarked, toggleBookmark, bookmarkCount } = useDittoBookmark(id!, initialBookmarkCount!);

  // 더 알아보기
  const [currentPage, setCurrentPage] = useState(0);
  const { dittoList, hasMore } = useDittoList(currentPage, defaultPageOptions, '', language);

  // 댓글 삭제 or 신고 펼치기
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  // 디토 삭제 or 신고 펼치기
  const [isExpandedDittoOptions, setIsExpandedDittoOptions] = useState(false);

  // "삭제","신고"를 위한 comment
  const [selectedComment, setSelectedComment] = useState<CommentData>();

  // "대댓글" 위한 parentComment => parentId가 null 이면 등록 , string이면 대댓글
  const [parentComment, setParentComment] = useState<CommentData | null>(null);

  // 댓글 컨트롤 (등록)
  const handleSubmit = (comment: string) => {
    const body = { body: comment };
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');

      return;
    }

    addDittoComment(id!, body, parentComment?.commentId.toString()).then(
      res => {
        console.log(res);
        setParentComment(null);
        // window.location.reload();
        setIsCommentSending(!isCommentSending);
      },
      error => {
        console.log(error);
      }
    );
  };

  // 댓글 컨트롤 (삭제)
  const handleDeleteComment = () => {
    if (selectedComment) {
      deleteDittoComment(id!, selectedComment?.commentId.toString()).then(
        res => {
          console.log(res);
          // window.location.reload();
          setIsCommentSending(!isCommentSending);
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  // 디토 컨트롤 (삭제)
  const handleDeleteDitto = () => {
    deleteDitto(id!).then(
      res => {
        alert(t('message.delete'));
        console.log(res);
        navigate('/ditto');
      },
      error => {
        console.log(error);
      }
    );
  };

  // 내 댓글인 경우 옵션 - 삭제
  const expandedMyOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        handleDeleteComment();
        setIsExpandedOptions(false);
      },
    },
  ];

  // 내 디토 아닌 경우 - 신고
  const expandedDittoOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        navigate(`/report/DITTO/${id!}`);
      },
    },
  ];

  // 내 디토 경우 옵션 - 삭제
  const expandedMyDittoOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.modify'),
      handleClick: () => {
        navigate(`/ditto/edit?ditto=${id!}`);
      },
    },
    {
      id: 1,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        handleDeleteDitto();
        setIsExpandedDittoOptions(false);
      },
    },
  ];

  // 내 댓글 아닌 경우 - 신고
  const expandedOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        navigate(`/report/DITTO_COMMENT/${selectedComment!.commentId.toString()}`);
      },
    },
  ];

  const [isFollowed, setIsFollowed] = useState(myFollowingId ?? null);

  useEffect(() => {
    setIsFollowed(myFollowingId);
  }, [myFollowingId]);

  const toggleFollow = async () => {
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');

      return;
    }

    if (!isFollowed) {
      const res = await addFollow(dittoData!.userData.userId.toString());
      if (res == 200) {
        setIsFollowed(1);
      } else {
        alert(`${t('message.followFail')}`);
      }
    } else {
      const res = await deleteFollow(dittoData!.userData.userId.toString());
      if (res == 200) {
        setIsFollowed(null);
      } else {
        alert(`${t('message.unFollowFail')}`);
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

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
    return <ErrorPage message={'Ditto id를 확인해주세요'} type="error" />;
  }

  return (
    <DittoDetailStyle>
      <div className="app-bar">
        <AppBar
          leading={false}
          title={
            <div className="title" onClick={() => navigate('/ditto')}>
              {'Ditto'}
            </div>
          }
          action={<LangSelectButton />}
        />
      </div>
      <img className="main-img" src={dittoData!.imagePath ?? defaultImage} onClick={handleImageClick} />
      <div className="content-wrapper">
        <UserProfileWithComment
          userProfileData={dittoData!.userData.userProfileData}
          userId={dittoData!.userData.userId}
          name={dittoData!.userData.nickname}
          date={formatDate(dittoData!.createdDateTime)}
          following={isFollowed}
          isMine={dittoData?.isMine}
          toggleFollow={toggleFollow}
          setIsExpandedOption={setIsExpandedDittoOptions}
        />

        <div className="title-wrapper">
          <FontAwesomeIcon className="icon" icon={faLocationDot} />
          <div>{dittoData!.title}</div>
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
        <div className="more">{t('myPage.more')}</div>
      </div>
      <DittoInfinity dittoList={dittoList} itemsPerRow={2} />
      {isExpandedOptions && selectedComment && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={selectedComment.isMine ? expandedMyOptionsContent : expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
        />
      )}

      {isExpandedDittoOptions && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={dittoData?.isMine ? expandedMyDittoOptionsContent : expandedDittoOptionsContent}
          setIsOpen={setIsExpandedDittoOptions}
        />
      )}
      {isModalOpen && (
        <ImageModal setIsOpen={setIsModalOpen} imageUrl={dittoData!.imagePath ?? defaultImage} width={90} />
      )}
    </DittoDetailStyle>
  );
};

const DittoDetailStyle = styled.div`
  .title {
    ${({ theme }) => theme.font.title}
    color :  ${({ theme }) => theme.color.keyColor};

    cursor: pointer;
  }
  .app-bar {
    margin-bottom: 20px;
  }
  .main-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
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

    .ditto-content {
      white-space: pre-wrap;
    }

    .tag-wrapper {
      margin: 10px 0;
    }

    .more {
      margin-top: 12px;
      ${({ theme }) => theme.font.body2}
    }
  }
`;

export default DittoDetail;
