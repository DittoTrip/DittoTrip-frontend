import { CategoryListProps, CategoryResponse } from '../models/Category/categoryModel';
import { api } from './https';

export const fetchMoreData = async (data: CategoryListProps) => {
  const response = await api.get<CategoryResponse>('/category/list', {
    params: { ...data },
  });
  return response.data;
};
