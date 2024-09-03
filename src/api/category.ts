import {
  CategoryAddProps,
  CategoryData,
  CategoryListProps,
  CategoryModifyProps,
  CategoryResponse,
} from '../models/Category/categoryModel';
import { api } from './https';

// 카테고리 북마크 추가
export const addBookmark = async (id: string) => {
  const response = await api.post<CategoryResponse>(`category/${id}/bookmark`);
  console.log(response.data);
  return response.data;
};
// 카테고리 북마크 삭제
export const removeBookmark = async (id: string) => {
  const response = await api.delete<CategoryResponse>(`category/${id}/bookmark`);
  console.log(response.data);

  return response.data;
};

// 북마크 여부 확인
export const bookmarkedCategory = async (id: number) => {
  const response = await api.get<CategoryResponse>(`category/${id}/bookmark`);
  return response.data;
};
// 카테고리 리스트 (subtype 별)
export const fetchMoreData = async (data: CategoryListProps) => {
  const response = await api.get<CategoryResponse>('/category/list', {
    params: { ...data },
  });
  return response.data;
};
// 카테고리 검색 - 타입분류 x
export const searchCategory = async (searchWord: string) => {
  const response = await api.delete<CategoryData[]>(`category/list/search/typeless`, {
    params: { searchWord },
  });
  console.log(response.data);
  return response.data;
};
// 찜기능 - 북마크한 카테고리 리스트 (major 타입별)
export const bookmarkedCategoryList = async (data: CategoryListProps) => {
  const response = await api.delete<CategoryResponse>(`category/list/bookmark`, {
    params: { data },
  });
  console.log(response.data);
  return response.data;
};

// -------관리자 기능 ----------//

// 카테고리 추가
export const addCategory = async (data: CategoryAddProps) => {
  const response = await api.post(`category`, { data });
  return response.data;
};
// 카테고리 수정
export const modifyCategory = async ({ id, data }: { id: number; data: CategoryModifyProps }) => {
  const response = await api.put<CategoryResponse>(`category/${id}`, { data });
  return response.data;
};
// 카테고리 삭제
export const removeCategory = async (id: number) => {
  const response = await api.delete<CategoryResponse>(`category/${id}`);
  return response.data;
};
