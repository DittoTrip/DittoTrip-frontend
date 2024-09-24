import styled from 'styled-components';
import { UserData } from '../../models/user/userModel';
import ProfileImg from '../common/ProfileImg';

interface Props {
  data: UserData;
}

const SearchUser = ({ data }: Props) => {
  return (
    <SearchUserStyle>
      <div className="user-box">
        <div className="user-img">
          <ProfileImg userProfileData={data.userProfileData} />
        </div>
        <div className="user-name">{data.nickname}</div>
      </div>
    </SearchUserStyle>
  );
};

const SearchUserStyle = styled.div`
  .user-box {
    display: flex;
    border-bottom: solid 1px ${({ theme }) => theme.color.gray40};
    width: 100%;
    align-items: center;
  }
  .user-img {
    margin: 20px 0;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    ${({ theme }) => theme.font.body2};
  }
`;

export default SearchUser;
