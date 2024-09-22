import { useState, useEffect } from 'react';
import { addReviewLike, deleteReviewLike, getReviewLike } from '../../api/review';

const useReviewBookmark = (id: string, likes: number) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState(likes);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await getReviewLike(id);
        setIsBookmarked(result);
      } catch (error) {
        console.log('북마크 여부 받아오기 실패', error);
      }
    };

    fetchBookmarkStatus();
  }, [id]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        deleteReviewLike(id);
        setIsBookmarked(false);
        setBookmarkCount(bookmarkCount - 1);
      } else {
        await addReviewLike(id);
        setIsBookmarked(true);
        setBookmarkCount(bookmarkCount + 1);
      }
    } catch (error) {
      console.log('북마크 실패', error);
    }
  };

  return { isBookmarked, toggleBookmark, bookmarkCount };
};

export default useReviewBookmark;
