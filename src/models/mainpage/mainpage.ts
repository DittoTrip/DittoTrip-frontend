export interface DittoData {
  dittoId: number;
  title: string;
  body: string;
  imagePath: string;
}

export interface CategoryData {
  categoryId: number;
  name: string;
  imagePath: string;
}

export interface SpotData {
  spotId: number;
  name: string;
  categoryName: string;
  imagePath: string;
}

export interface HomeData {
  dittoData: DittoData;
  categoryDataList: CategoryData[];
  spotDataList: SpotData[];
  isNotCheckedAlarm: boolean;
}
