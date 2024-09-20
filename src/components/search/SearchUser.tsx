import styled from 'styled-components';
import { UserData } from '../../models/userpage/userPageModel';
import { defaultImage } from '../../constants/constant';

interface Props {
  data: UserData;
}

const SearchUser = ({ data }: Props) => {
  return (
    <SearchUserStyle>
      <div className="user-box">
        <img className="user-img" src={defaultImage} />
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
