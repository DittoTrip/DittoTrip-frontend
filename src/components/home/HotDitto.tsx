import styled from "styled-components"
import { dittoItem } from "../../pages/Home";

interface Props {
    dittoList :dittoItem[];
}



const HotDitto = ({dittoList} :Props) =>{
    return(
        <DHotDittoStyled>
            {
                dittoList.map((item,i)=>{
                    return (
                        <div key={i} className="ditto-box">
                            <img className="ditto-img" src={item.img}></img>
                            <div className="ditto-location">{item.location}</div>
                            <div className="ditto-title">{item.title}</div>
                        </div>
                    )
                })
            }
            
            
        </DHotDittoStyled>
    )
}

const DHotDittoStyled = styled.div`
    .ditto-box {
        position: relative;
        float: left;
        margin-left: 18px;
        margin-bottom: 18px;
    }
    .ditto-img {
        
    }
    .ditto-location {
        position: absolute;
        bottom: 30px;
        color: white;
        ${({theme}) => theme.font.body2}
        left: 10px;
        width: 9rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .ditto-title {
        position: absolute;
        bottom: 12px;
        color: white;
        ${({theme}) => theme.font.body4}
        left: 10px;
        width: 9rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`;

export default HotDitto;