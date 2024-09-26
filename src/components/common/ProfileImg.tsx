import styled from 'styled-components';
import { UserProfileData } from '../../models/user/userModel';
import WriteButton from '../ditto/WriteButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  userProfileData: UserProfileData;
  width?: string;
  background?: boolean;
  showEditIcon?: boolean;
}

const ProfileImg = ({ userProfileData, width, background, showEditIcon }: Props) => {
  const { itemSkin, itemHair, itemEyes, itemMouth, itemAccessory } = userProfileData;
  const navigate = useNavigate();

  return (
    <ProfileImgStyle width={width} background={background}>
      {itemSkin && <img className="image-item" src={itemSkin.wearingImagePath} alt={itemSkin.name} />}
      {itemHair && <img className="image-item" src={itemHair.wearingImagePath} alt={itemHair.name} />}
      {itemEyes && <img className="image-item" src={itemEyes.wearingImagePath} alt={itemEyes.name} />}
      {itemMouth && <img className="image-item" src={itemMouth.wearingImagePath} alt={itemMouth.name} />}
      {itemAccessory && <img className="image-item" src={itemAccessory.wearingImagePath} alt={itemAccessory.name} />}
      {showEditIcon && (
        <div className="edit-icon">
          <WriteButton
            handleClick={() => navigate(`/character`)}
            color="gray80"
            backgroundColor="gray20"
            border={true}
          />
        </div>
      )}
    </ProfileImgStyle>
  );
};

const ProfileImgStyle = styled.div<{ width?: string; background?: boolean }>`
  position: relative;
  width: ${({ width }) => (width ? width : '42px')};
  height: ${({ width }) => (width ? width : '42px')};
  aspect-ratio: 1;

  background: ${({ background, theme }) => (background ? 'transparent' : theme.color.gray20)};

  border-radius: 50%;

  .image-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }

  .edit-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
`;

export default ProfileImg;
