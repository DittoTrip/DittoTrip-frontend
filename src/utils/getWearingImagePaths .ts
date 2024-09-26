import { UserProfileData } from '../models/user/userModel';

export const getWearingImagePaths = (profileData: UserProfileData): string[] => {
  return [
    profileData.itemSkin.wearingImagePath,
    profileData.itemEyes.wearingImagePath,
    profileData.itemMouth.wearingImagePath,
    profileData.itemHair.wearingImagePath,
    profileData.itemAccessory.wearingImagePath,
  ];
};
