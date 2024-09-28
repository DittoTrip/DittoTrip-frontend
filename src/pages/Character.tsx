import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import { TapItem } from './Category';
import Tap from '../components/common/Tab';
import { UserItemDataMap } from '../models/reward/rewardModel';
import ErrorPage from './Error';
import { defaultImage } from '../constants/constant';
import { getItemList, modyfyItem } from '../api/reward';
import { UserProfileItem } from '../models/user/userModel';
import { useTranslation } from 'react-i18next';

const Character = () => {
  const { t } = useTranslation();

  const tapData: TapItem[] = [
    {
      id: 0,
      title: `${t('character.skin')}`,
      content: <></>,
    },
    {
      id: 1,
      title: `${t('character.head')}`,
      content: <></>,
    },
    {
      id: 2,
      title: `${t('character.eye')}`,
      content: <></>,
    },
    {
      id: 3,
      title: `${t('character.mouth')}`,
      content: <></>,
    },
    {
      id: 4,
      title: `${t('character.decoration')}`,
      content: <></>,
    },
  ];

  // 탭 id
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);
  // 선택된 아이템 리스트
  const [selectedItemList, setSelectedItemList] = useState<UserProfileItem[]>([]);
  // 유저가 가진 아이템 리스트
  const [itemList, setItemList] = useState<UserItemDataMap>();
  const [loading, setLoading] = useState<boolean>(true);

  // 선택된 아이템 리스트에 추가
  const handleClick = (index: number, newItem: UserProfileItem) => {
    setSelectedItemList(prevItems => prevItems.map((item, i) => (i === index ? newItem : item)));
    console.log(selectedItemList);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await getItemList();

      const { itemSkin, itemHair, itemEyes, itemMouth, itemAccessory } = response.userProfileData;
      setSelectedItemList([itemSkin, itemHair, itemEyes, itemMouth, itemAccessory]);

      setItemList(response.userItemDataMap);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 유저 아이템 수정

  const EditItems = async () => {
    try {
      await modyfyItem(selectedItemList);

      alert(`변경되었습니다.`);
      fetchItems();
    } catch (err) {
      console.log(err);
      alert(`문제가 발생했습니다. 다시 시도해주세요.`);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <CharacterStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={<div className="title">{t('character.title')}</div>}
          action={
            <Button size={'small'} scheme={'keyButton'} onClick={() => EditItems()}>
              {t('character.complete')}
            </Button>
          }
        />
      </div>
      <div className="container">
        <div className="profile-img-wrapper">
          <div className="profile">
            {selectedItemList && <img className="image-item" src={selectedItemList[0].wearingImagePath} />}
            {selectedItemList && <img className="image-item" src={selectedItemList[1].wearingImagePath} />}
            {selectedItemList && <img className="image-item" src={selectedItemList[2].wearingImagePath} />}
            {selectedItemList && <img className="image-item" src={selectedItemList[3].wearingImagePath} />}
            {selectedItemList && <img className="image-item" src={selectedItemList[4].wearingImagePath} />}
          </div>
        </div>
        <div className="character-tab">
          <div className="content-wrapper">
            <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
            <div className="box-container">
              {selectedId == 0 && (
                <>
                  {itemList!.SKIN.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(0, item)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 1 && (
                <>
                  {itemList!.HAIR.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(1, item)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}{' '}
              {selectedId == 2 && (
                <>
                  {itemList!.EYES.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(2, item)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 3 && (
                <>
                  {itemList!.MOUTH.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(3, item)}>
                      {<img src={item.imagePath ?? defaultImage} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 4 && (
                <>
                  {itemList!.ACCESSORY.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(4, item)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </CharacterStyle>
  );
};

const CharacterStyle = styled.div`
  .app-bar {
    background-color: #f9f9f9;
  }
  .title {
    ${({ theme }) => theme.font.subTitle};
    flex: 1;
  }

  .container {
    width: 100%;
    aspect-ratio: 1;
    background-color: #f9f9f9;
    position: relative;

    .profile-img-wrapper {
      width: 100%;
      margin: 0 auto;

      .profile {
        position: relative;
        aspect-ratio: 1;
        width: 100%;
        border-radius: 50%;
      }
      .image-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.9;
      }
    }
  }
  .character-tab {
    height: 500px;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 100vw;
    border-radius: 30px;
    box-shadow: 0px -1px 15px -2px rgb(0, 0, 0, 0.1);
  }
  .content-wrapper {
    margin: 0 28px;
  }

  .box-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
  }

  .box {
    width: 100px;
    height: 100px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border-radius: 100%;
  }

  @media screen and (min-width: 600px) {
    .character-tab {
      top: 600px;
    }
  }
`;

export default Character;
