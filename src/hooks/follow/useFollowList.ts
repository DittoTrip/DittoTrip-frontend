import { useEffect, useState } from 'react';
import { FindFollowedList, FindFollowingList } from '../../api/follow';
import { FollowData } from '../../models/follow/followModel';

const useFollowList = (id: string) => {
  const [FollowedList, setFollowedList] = useState<FollowData[]>([]);
  const [FollowingList, setFollowingList] = useState<FollowData[]>([]);
  const [FollowedCount, setFollowedCount] = useState<number>();
  const [FollowingCount, setFollowingCount] = useState<number>();

  const [loading, setLoading] = useState(true);

  //   팔로워
  const fetchFollowList = async (id: string) => {
    try {
      // 팔로워
      const followedResponse = await FindFollowedList(id);
      setFollowedList(followedResponse.followDataList);
      setFollowedCount(followedResponse.followCount);
      //   팔로잉
      const followingresponse = await FindFollowingList(id);
      setFollowingList(followingresponse.followDataList);
      setFollowingCount(followingresponse.followCount);
    } catch (err) {
      console.log('팔로우 정보를 불러오는 중 오류가 발생했습니다.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowList(id);
  }, [id]);

  return { FollowedList, FollowedCount, FollowingList, FollowingCount, loading };
};

export default useFollowList;
