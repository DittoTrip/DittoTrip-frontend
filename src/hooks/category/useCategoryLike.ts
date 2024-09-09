import { useState, useEffect } from 'react';
import { addBookmark, bookmarkedCategory, removeBookmark } from '../../api/category';

const useBookmarkedCategory = (id: string) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await bookmarkedCategory(id);
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
        removeBookmark(id);
        setIsBookmarked(false);
      } else {
        await addBookmark(id);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log('북마크 실패', error);
    }
  };

  return { isBookmarked, toggleBookmark };
};

export default useBookmarkedCategory;
