export interface RewardData {
  rewardId: number;
  name: string;
  imagePath: string;
  rewardExp: number;
  rewardType: 'ITEM' | 'BADGE';
}

export interface UserQuest {
  userQuestId: number;
  title: string;
  body: string;
  conditionCount: number;
  nowCount: number;
  userQuestStatus: 'NOT_ACHIEVE' | 'ACHIEVE' | 'PENDING';
  rewardData: RewardData;
}

export interface UserQuestDataListResponse {
  userQuestDataList: UserQuest[];
  totalPages: number;
}
