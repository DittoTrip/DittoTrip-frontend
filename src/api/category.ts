import { CategoryListProps, CategoryResponse } from '../models/Category/categoryModel';
import { api } from './https';

export const fetchMoreData = async (data: CategoryListProps) => {
  const response = await api.get<CategoryResponse>('/category/list', {
    params: { ...data },
  });
  return response.data;
};

export const addBookmark = async (id: string) => {
  const response = await api.post<CategoryResponse>(`category/${id}/bookmark`);
  console.log(response.data);
  return response.data;
};

export const removeBookmark = async (id: string) => {
  const response = await api.delete<CategoryResponse>(`category/${id}/bookmark`);
  console.log(response.data);

  return response.data;
};
