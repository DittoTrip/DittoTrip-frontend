import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { addReviewComment, deleteReviewComment } from '../api/reviewComment';
import useReviewDetail from '../hooks/review/useReviewDetail';

import { styled } from 'styled-components';

import AppBar from '../components/common/AppBar';
import LangSelectButton from '../components/LangSelectButton';
import ReviewItem from '../components/review/ReviewItem';
import CommentList from '../components/comment/CommentList';
import CommentInput from '../components/comment/CommentInput';
import ErrorPage from './Error';
import BottomSheet from '../components/bottomsheet/BottomSheet';
import { CommentData } from '../models/ditto/dittoModel';
import { deleteReview } from '../api/review';

const ReviewDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reviewDetailData, spotData, commentData, error, loading } = useReviewDetail(id!);

  // 댓글 삭제 or 신고 펼치기
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  // 리뷰 삭제 or 신고 펼치기
  const [isExpandedReviewOptions, setIsExpandedReviewOptions] = useState(false);

  // "삭제","신고"를 위한 comment
  const [selectedComment, setSelectedComment] = useState<CommentData>();

  // "대댓글" 위한 parentComment => parentId가 null 이면 등록 , string이면 대댓
  const [parentComment, setParentComment] = useState<CommentData | null>(null);
  // 댓글 컨트롤 (등록)
  const handleSubmit = (comment: string) => {
    const body = { body: comment };
    console.log(body);

    addReviewComment(id!, body, parentComment?.commentId.toString()).then(
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
      deleteReviewComment(id!, selectedComment?.commentId.toString()).then(
        res => {
          console.log(res);
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  // 리뷰 컨트롤 (삭제)
  const handleDeleteReview = () => {
    deleteReview(id!).then(
      res => {
        alert('Delete');
        console.log(res);
        window.location.reload();
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
        navigate(`/report/REVIEW_COMMENT/${selectedComment!.commentId.toString()}`);
      },
    },
  ];

  // 내 리뷰 아닌 경우 - 신고
  const expandedReviewOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.report'),
      handleClick: () => {
        navigate(`/report/DITTO/${id!}`);
      },
    },
  ];

  // 내 리뷰인 경우 옵션 - 삭제
  const expandedMyReviewOptionsContent = [
    {
      id: 0,
      text: t('bottomsheet.delete'),
      handleClick: () => {
        handleDeleteReview();
        setIsExpandedReviewOptions(false);
      },
    },
    {
      id: 1,
      text: t('bottomsheet.modify'),
      handleClick: () => {
        alert('modify');
        setIsExpandedReviewOptions(false);
      },
    },
  ];

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  } else if (error) {
    return <ErrorPage message={'spot id를 확인해주세요'} type="error" />;
  }

  return (
    <ReviewDetailStyle>
      <div className="app-bar">
        <AppBar leading={true} title={<div className="title">{spotData}</div>} action={<LangSelectButton />} />
      </div>
      <div className="content">
        <ReviewItem setIsExpandedOption={setIsExpandedReviewOptions} review={reviewDetailData!} />
      </div>
      <div className="comment-list">
        <CommentList
          comments={commentData}
          setSelectedComment={setSelectedComment}
          setIsExpandedOption={setIsExpandedOptions}
          setParentComment={setParentComment}
          parentComment={parentComment!}
        />
      </div>
      <CommentInput
        handleSubmit={handleSubmit}
        placeholder={parentComment ? '대댓글을 남겨보세요' : t('comment.placeholder')}
      />

      {isExpandedOptions && selectedComment && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={selectedComment.isMine ? expandedMyOptionsContent : expandedOptionsContent}
          setIsOpen={setIsExpandedOptions}
        />
      )}

      {isExpandedReviewOptions && (
        <BottomSheet
          title={t('bottomsheet.viewDetail')}
          list={reviewDetailData?.isMine ? expandedMyReviewOptionsContent : expandedReviewOptionsContent}
          setIsOpen={setIsExpandedReviewOptions}
        />
      )}
    </ReviewDetailStyle>
  );
};

const ReviewDetailStyle = styled.div`
  padding-bottom: 160px;

  .app-bar .title {
    display: flex;
    justify-content: start;
    ${({ theme }) => theme.font.subTitle};
  }
  .content {
    padding: 0 28px;
  }
  .comment-list {
    padding: 0 28px;
  }
`;

export default ReviewDetail;
