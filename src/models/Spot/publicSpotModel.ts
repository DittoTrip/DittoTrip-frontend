interface Header {
  resultCode: string;
  resultMsg: string;
}

export interface Item {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}

interface Items {
  item: Item[];
}

interface Body {
  items: Items;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

interface Response {
  header: Header;
  body: Body;
}

export interface LocationBasedListResponse {
  response: Response;
}

export interface AroundSpotProps {
  numOfRows: number;
  pageNo: number;
  MobileOS: string;
  MobileApp: string;
  mapX: string;
  mapY: string;
  radius: number;
  contentTypeId: number;
  serviceKey: string;
}
