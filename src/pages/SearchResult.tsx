import styled from "styled-components"
import LangSelectButton from "../components/LangSelectButton";
import AppBar from "../components/common/AppBar";
import SearchBar from "../components/common/SearchBar";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tap from "../components/common/Tab";
import DropDown from "../components/common/DropDown";
import SearchSpot from "../components/search/SearchSpot";
import SearchContent from "../components/search/SearchContent";

export interface TapItem {
    id: number;
    title: string;
    content: JSX.Element;
}

export const DummyContent = [
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png",
        title : "눈물의 여왕",
        isLike : false
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png",
        title : "눈물의 여왕",
        isLike : false
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png",
        title : "눈물의 여왕",
        isLike : false
    },
    {
        img : "https://velog.velcdn.com/images/gogo6570/post/1b81bc70-0307-4a94-b300-acbfa86413e3/image.png",
        title : "눈물의 여왕",
        isLike : false
    },
]

export const DummyDataList = [
    {
      img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
    {
      img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
    {
      img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
  
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
    {
      img: 'https://images.unsplash.com/photo-1560237731-890b122a9b6c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
  
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
    {
      img: 'https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
    {
      img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
      name: '소소주점',
      distance: '200km',
      reviewCount: 45,
      rating: 4.5,
      address: '강원 강릉시 율곡로3139번길 24 오죽헌',
      tagList: ['강동원', '변성은', '디토트립', '강원도', '변호사', '변성은', '디토리포', '여행'],
    },
  ];

const SearchResult = () => {
    const { t } = useTranslation();
    const tapData: TapItem[] = [
        { id: 1, title: "스팟", content: <div>드라마 / 영화</div> },
        { id: 2, title: "컨텐츠", content: <div>연예인들</div> },
        { id: 3, title: "연예인", content: <div>연예인들</div> },
        { id: 4, title: "사용자", content: <div>연예인들</div> },
    ];

    const [searchWord, setSearchWord] = useState('');
    const [selectedId, setSelectedId] = useState<number>(tapData[0]?.id);


    return (
        <SearchResultStyled>
            <div className="app-bar">
                <AppBar
                    leading={true}
                    title={
                        <div className="title">
                            <SearchBar setSearchWord={setSearchWord} placeholder={t('search.placeholder')} />
                        </div>
                }
                action={<LangSelectButton/>}
                />
            </div>
            <Tap tapData={tapData} selectedId={selectedId} setSelectedId={setSelectedId} />
            <div className="content-wrapper">
            {selectedId === 1 && (
                    <>
                        <DropDown setValue={() => setSelectedId} />
                        {DummyDataList.map(data => (<SearchSpot data={data} />))}
                    </>
                )}
                {selectedId === 2 && (
                    <>
                    {DummyContent.map(data => (<SearchContent data={data} />))}
                    </>
                )}
                {selectedId === 3 && (
                    <div>여기서 '연예인' 탭의 내용을 렌더링하세요</div>
                )}
                {selectedId === 4 && (
                    <div>여기서 '사용자' 탭의 내용을 렌더링하세요</div>
                )}
            </div>
        </SearchResultStyled>
    )
}

const SearchResultStyled = styled.div`
.content-wrapper {
    margin: 16px 28px;
}
`;
    
export default SearchResult;