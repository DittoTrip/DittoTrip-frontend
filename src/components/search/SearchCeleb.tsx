import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faEmptyHeart } from '@fortawesome/free-regular-svg-icons';

import styled from "styled-components"

interface CelebDataType {
    img : string;
    name : string;
    isLike : boolean;
}

interface Props {
    data : CelebDataType;
}

const SearchCeleb = ({data} : Props) => {
    return (
        <SearchCelebStyle>
            <div className="celeb-box">
                <img className="celeb-img" src={data.img}></img>
                <div className="text-box">
                    <div className="celeb-name">{data.name}</div>
                    <div className="like">
                        <FontAwesomeIcon icon={faEmptyHeart} />
                    </div>
                </div>
            </div>
        </SearchCelebStyle>
    )
}

const SearchCelebStyle = styled.div`
    
    .celeb-box {
        display: flex;
        border-bottom: solid 1px #B6B6B6;
        width: 100%;
    }
    .celeb-img {
        margin: 20px 0;
        margin-right: 20px;
    }

    .text-box {
        display: flex;
        align-items: center;
    }
    .celeb-name {
        ${({ theme }) => theme.font.body2};
        margin-right: 200px;
    }
    .like {
        font-size: 20px;
        path {
            color: ${({ theme }) => theme.color.keyColor};
          }
    }
`;

export default SearchCeleb;