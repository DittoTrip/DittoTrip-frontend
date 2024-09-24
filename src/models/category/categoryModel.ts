export type SubType =
  | 'PERSON_ACTOR'
  | 'PERSON_SINGER'
  | 'PERSON_COMEDIAN'
  | 'CONTENT_MOVIE'
  | 'CONTENT_DRAMA'
  | 'CONTENT_ENTERTAINMENT';

export type MajorType = 'CONTENT' | 'PERSON';

export interface CategoryData {
  categoryId: number;
  name: string;
  imageFilePath: string | null;
  myBookmarkId: number | null;
  hashtags: string[];
}

export interface CategoryResponse {
  categoryDataList: CategoryData[];
  totalPages: number;
}

export interface CategoryListProps {
  subType?: SubType;
  majorType?: MajorType;
  page: number;
  size: number;
  sort?: string;
}

export interface CategoryModifyData {
  name: string;
  categoryMajorType: MajorType;
  categorySubType: SubType;
  removeHashtags: string[];
  newHashtags: string[];
  removeSpotIds: number[];
  newSpotIds: number[];
}

export interface CategoryModifyProps {
  categoryModifyReq: CategoryModifyData;
  image: string | null;
}

export interface CategoryAddData {
  name: string;
  categoryMajorType: MajorType;
  categorySubType: SubType;
  hashtagNames: string[];
  spotIds: number[];
}
export interface CategoryAddProps {
  categorySaveReq: CategoryAddData;
  image: string | null;
}
