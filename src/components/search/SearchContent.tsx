import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import styled from "styled-components"

interface ContentDataType {
    img : string;
    title : string;
    isLike : boolean;
}

interface Props {
    data : ContentDataType;
}

const SearchContent = ({data} : Props) => {
    return (
        <SearchContentStyle>
            <div className="content-box">
                <img className="content-img" src={data.img}></img>
                <div className="title-box">
                    <div className="content-title">{data.title}</div>
                    <div className="like">
                    <FontAwesomeIcon icon={faEmptyHeart} />
                    </div>
                </div>
            </div>
            <div className="content-box">
                <img className="content-img" src={data.img}></img>
                <div className="title-box">
                    <div className="content-title">{data.title}</div>
                    <div className="like">
                    <FontAwesomeIcon icon={faEmptyHeart} />
                    </div>
                </div>
            </div>
        </SearchContentStyle>
    )
}

const SearchContentStyle = styled.div`
    text-align: center;
    
    .content-box {
        display: inline-block;
        margin-right:17px ;
        margin-bottom: 28px;
    }

    .title-box {
        display: flex;
        justify-content: space-between;
    }

    .content-title {
        ${({theme}) => theme.font.body2}
        font-weight: bold;
    }
    .like {
        margin-right: 0;
        font-size: 20px;
        path {
            color: ${({ theme }) => theme.color.keyColor};
          }
    }
`;

export default SearchContent;