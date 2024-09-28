import { useState, useEffect } from 'react';
import { addDittoBookemark, deleteDittoBookmark, getDittoBookmark } from '../../api/ditto';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useDittoBookmark = (id: string, likes: number) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [bookmarkCount, setBookmarkCount] = useState(likes);
  const { isLoggedIn } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setBookmarkCount(likes);
  }, [likes]);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const result = await getDittoBookmark(id);
        setIsBookmarked(result);
      } catch (error) {
        console.log('북마크 여부 받아오기 실패', error);
      }
    };
    if (isLoggedIn) {
      fetchBookmarkStatus();
    }
  }, [id, likes]);

  const toggleBookmark = async () => {
    if (!isLoggedIn) {
      alert(t('guide.login'));
      navigate('/login');

      return;
    }
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
