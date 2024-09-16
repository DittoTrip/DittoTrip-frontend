import { useState, useEffect } from 'react';
import { addDittoBookemark, deleteDittoBookmark, getDittoBookmark } from '../../api/ditto';

const useDittoBookmark = (id: string, likes: number) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState(likes);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await getDittoBookmark(id);
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
        deleteDittoBookmark(id);
        setIsBookmarked(false);
        setBookmarkCount(bookmarkCount - 1);
      } else {
        await addDittoBookemark(id);
        setIsBookmarked(true);
        setBookmarkCount(bookmarkCount + 1);
      }
    } catch (error) {
      console.log('북마크 실패', error);
    }
  };

  return { isBookmarked, toggleBookmark, bookmarkCount };
};

export default useDittoBookmark;
