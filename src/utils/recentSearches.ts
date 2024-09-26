// 검색어 저장 함수
export const saveSearchWord = (newSearchWord: string) => {
  const maxRecentSearches = 5;
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

  // 중복 검색어 삭제 및 최근 검색어 추가
  recentSearches = [newSearchWord, ...recentSearches.filter((word: string) => word !== newSearchWord)];

  // 최대 10개까지만 저장
  if (recentSearches.length > maxRecentSearches) {
    recentSearches.pop();
  }

  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
};

// 최근 검색어 불러오기 함수
export const getRecentSearchWords = () => {
  return JSON.parse(localStorage.getItem('recentSearches') || '[]');
};

// 최근 검색어 삭제 함수
export const deleteSearchWord = (searchWord: string) => {
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
  recentSearches = recentSearches.filter((word: string) => word !== searchWord);
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
};
