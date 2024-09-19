export interface Time { // SaveReq의 부하 1
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }

export interface SaveReq { //포스트 spot/apply/spot/apply api 이친구의 부하 1
    name: string;
    intro: string;
    address: string;
    startTime: Time;
    endTime: Time;
    phoneNumber: string;
    homeUri: string;
    pointX: number;
    pointY: number;
    categoryIds: number[];
    hashtagNames: string[];
  }

export interface SpotSaveRequest { // 포스트 spot/apply/spot/apply api 이거 왜 매핑이 신기하네
    saveReq: SaveReq;
    image: string;
    images: string[];
  }

  // 여기는 아직 디자인이랑 관리자 기능 등의 api가 안나온것으로 추정중