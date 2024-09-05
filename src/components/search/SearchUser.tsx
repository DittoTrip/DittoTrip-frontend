
import styled from "styled-components"

interface UserDataType {
    name : string;
}

interface Props {
    data : UserDataType;
}

const SearchUser = ({data} : Props) => {
    return (
        <SearchUserStyle>
            <div className="user-box">
                <div className="user-img" ></div>
                <div className="user-name">{data.name}</div>
            </div>
        </SearchUserStyle>
    )
}

const SearchUserStyle = styled.div`
    
    .user-box {
        display: flex;
        border-bottom: solid 1px #B6B6B6;
        width: 100%;
        align-items: center;
    }
    .user-img {
        margin: 20px 0;
        margin-right: 20px;
        width: 40px;
        height: 40px;
        background-color: #D9D9D9;
        border-radius: 50px;
    }

    .user-name {
        ${({ theme }) => theme.font.body2};
        
    }
`;

export default SearchUser;