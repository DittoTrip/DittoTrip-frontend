import { useState, useEffect } from 'react';
import { addBookmark, bookmarkedCategory, removeBookmark } from '../../api/category';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useBookmarkedCategory = (id: string) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await bookmarkedCategory(id);
        setIsBookmarked(result);
      } catch (error) {
        console.log('북마크 여부 받아오기 실패', error);
      }
    };

    if (isLoggedIn) {
      fetchBookmarkStatus();
    }
  }, [id]);

  const toggleBookmark = async () => {
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');

      return;
    }
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
