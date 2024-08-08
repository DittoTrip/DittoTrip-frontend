import styled from "styled-components"
import { dramaItem } from "../../pages/Home";

interface Props {
    dramaList: dramaItem[];
}

const Drama = ({dramaList}: Props) =>{
    return(
        <DramaStyled>
            <ul >
                {dramaList?.map((item)=>{
                    return (
                        <li className="drama-list">
                            <div className="drama-box">
                                <img className="drama-img" src={item.img}></img>
                                <div className="drama-title">{item.title}</div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </DramaStyled>
    )
}

const DramaStyled = styled.div`
    .drama-list {
        display: inline-block;
    }
    .drama-title {
        font-size: 10px;
    }
`;

export default Drama;