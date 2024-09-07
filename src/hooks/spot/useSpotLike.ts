import { useState, useEffect } from 'react';
import { bookmarkedSpot } from '../../api/spot';
import { addSpotBookmark, removeSpotBookmark } from '../../api/spot';

const useBookmarkedSpot = (spotId: string, bookmarkedId: number) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await bookmarkedSpot(spotId);
        setIsBookmarked(result);
      } catch (error) {
        console.log('북마크 여부 받아오기 실패', error);
      }
    };

    fetchBookmarkStatus();
  }, [spotId]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        removeSpotBookmark(spotId, bookmarkedId);
        setIsBookmarked(false);
      } else {
        await addSpotBookmark(spotId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log('북마크 toggle 실패', error);
    }
  };

  return { isBookmarked, toggleBookmark };
};

export default useBookmarkedSpot;
