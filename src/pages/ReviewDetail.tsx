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
import { ReviewCommentData } from '../models/reveiw/reviewModel';

const ReviewDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reviewDetailData, spotData, commentData, error, loading } = useReviewDetail(id!);

  // 리뷰 삭제 or 신고 펼치기
  const [isExpandedOptions, setIsExpandedOptions] = useState(false);

  // "삭제","신고"를 위한 comment
  const [selectedComment, setSelectedComment] = useState<ReviewCommentData>();

  // "대댓글" 위한 parentComment => parentId가 null 이면 등록 , string이면 수정
  const [parentComment, setParentComment] = useState<ReviewCommentData | null>(null);
  console.log(parentComment);
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
        <ReviewItem setIsExpandedOption={() => {}} review={reviewDetailData!} />
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
