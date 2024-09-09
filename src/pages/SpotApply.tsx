import styled from "styled-components";
import AppBar from "../components/common/AppBar";
import ImageUploader from "../components/review/UploadImage";

const SpotApply = () => {
    return(
        <SpotApplyStyle>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            스팟 신청하기
                        </div>
                }
                />
            </div>

            <div className="spot-name">
                <div></div>
                <input></input>
            </div>
            <div>
                <div></div>
                <input></input>
            </div>
            <div>
                
            </div>
            
            <ImageUploader />

        </SpotApplyStyle>
    )
};

const SpotApplyStyle = styled.div`
    .app-bar {
        .title {
        ${({theme})=>theme.font.subTitle}
        }
    }
`;

export default SpotApply;