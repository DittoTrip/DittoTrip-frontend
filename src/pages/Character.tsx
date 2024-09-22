import styled from 'styled-components';
import AppBar from '../components/common/AppBar';
import Button from '../components/common/Button';
import { useEffect, useState } from 'react';
import { TapItem } from './Category';
import Tap from '../components/common/Tab';
import { findItemList } from '../api/reward';
import { UserItemDataMap } from '../models/reward/rewardModel';
import ErrorPage from './Error';
import { defaultImage } from '../constants/constant';

const tapData: TapItem[] = [
  {
    id: 0,
    title: '피부',
    content: <></>,
  },
  {
    id: 1,
    title: '머리',
    content: <></>,
  },
  {
    id: 2,
    title: '눈',
    content: <></>,
  },
  {
    id: 3,
    title: '입',
    content: <></>,
  },
  {
    id: 4,
    title: '장식',
    content: <></>,
  },
];

const Character = () => {
  const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);
  const [itemList, setItemList] = useState<UserItemDataMap>();
  const [loading, setLoading] = useState<boolean>(true);
  //   헐 유저 정보를 받아와야하네
  //   어디서? - 프로필 수정 페이지랑 같은 api 사용 => 초기화
  const [selectedItemList, setSelectedItemList] = useState<string[]>([]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await findItemList();

      setItemList(response.userItemDataMap);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleClick = (index: number, newItem: string) => {
    setSelectedItemList(prevItems => prevItems.map((item, i) => (i === index ? newItem : item)));
  };

  if (loading) {
    return <ErrorPage message={'Loading...'} type="loading" />;
  }

  return (
    <CharacterStyle>
      <div className="app-bar">
        <AppBar
          leading={true}
          title={<div className="title">캐릭터 편집</div>}
          action={
            <Button size={'small'} scheme={'keyButton'}>
              완료
            </Button>
          }
        />
      </div>
      <div className="container">
        <div className="character-tab">
          <div className="content-wrapper">
            <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
            <div className="box-container">
              {selectedId == 0 && (
                <>
                  {itemList!.SKIN.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(0, item.imagePath)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 1 && (
                <>
                  {itemList!.HAIR.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(1, item.imagePath)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}{' '}
              {selectedId == 2 && (
                <>
                  {itemList!.EYES.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(2, item.imagePath)}>
                      {<img src={item.imagePath} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 3 && (
                <>
                  {itemList!.HAIR.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(3, item.imagePath)}>
                      {<img src={item.imagePath ?? defaultImage} width={'100%'} />}
                    </div>
                  ))}
                </>
              )}
              {selectedId == 4 && (
                <>
                  {itemList!.ACCESSORY.map((item, index) => (
                    <div className="box" key={index} onClick={() => handleClick(4, item.imagePath)}>
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
    height: 400px;
    width: 100%;
    background-color: #f9f9f9;
    position: relative;
  }
  .character-tab {
    height: 500px;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 310px;
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
`;

export default Character;
