export type categoryType =
  | 'PERSON_ACTOR'
  | 'PERSON_SINGER'
  | 'PERSON_COMEDIAN'
  | 'CONTENT_MOVIE'
  | 'CONTENT_DRAMA'
  | 'CONTENT_ENTERTAINMENT';

export interface CategoryData {
  categoryId: number;
  name: string;
  imageFilePath: string | null;
  myBookmarkId: number | null;
}

export interface CategoryResponse {
  categoryDataList: CategoryData[];
  totalPages: number;
}

export interface CategoryListProps {
  subType: categoryType;
  page: number;
  size: number;
  sort?: string;
}
