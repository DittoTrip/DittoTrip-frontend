import styled from "styled-components"
import { dramaItem } from "../../pages/Home";

interface Props {
    dramaList: dramaItem[];
}

const Drama = ({dramaList}: Props) =>{
    return(
        <DramaStyled>
            <ul className="drama-main">
                {dramaList?.map((item,i)=>{
                    return (
                        <li key={i} className="drama-list">
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
    .drama-main{
        margin-left: 27px;
        padding: 0;
    }
    .drama-list {
        display: inline-block;
        text-align: center;
        margin-right: 5.5px;
    }
    .drama-title {
        font-size: 10px;
    }
`;

export default Drama;