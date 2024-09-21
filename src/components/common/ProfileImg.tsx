import React from 'react';
import styled from 'styled-components';
import { UserProfileData } from '../../models/user/userModel';

interface ProfileStackProps {
  userProfileData: UserProfileData;
}

const profileImg: React.FC<ProfileStackProps> = ({ userProfileData }) => {
  const { itemSkin, itemHair, itemEyes, itemMouse, itemAccessory } = userProfileData;
  console.log(itemSkin, itemHair, itemEyes, itemMouse, itemAccessory);
  return (
    <ProfileImgStyle>
      {<img className="image-item" src={itemSkin.imagePath} alt={itemSkin.name} />}
      {<img className="image-item" src={itemHair.imagePath} alt={itemHair.name} />}
      {<img className="image-item" src={itemEyes.imagePath} alt={itemEyes.name} />}
      {<img className="image-item" src={itemMouse.imagePath} alt={itemMouse.name} />}
      {<img className="image-item" src={itemAccessory.imagePath} alt={itemAccessory.name} />}
    </ProfileImgStyle>
  );
};

const ProfileImgStyle = styled.div`
  position: relative;
  width: 42px;
  height: 42px;

  background-color: #cfcfcf;
  border-radius: 50%;

  .image-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }
`;

export default profileImg;
