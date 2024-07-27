import { styled } from 'styled-components';
interface ContentItemProps {
  img: string;
  name: string;
}
const ContentItem = ({ img, name }: ContentItemProps) => {
  return (
    <ContentItemStyled>
      <img className="content-item-img" src={img} alt={name} />
      <div className="content-item-name">{name}</div>
    </ContentItemStyled>
  );
};

const ContentItemStyled = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // width: 100%;
  // height: 350px;
  // padding: 10px 0 15px;
  // overflow: hidden;
  // transition: border 300ms;

  // img {
  //   flex-shrink: 0;
  //   min-width: 100%;
  //   min-height: 100%;
  // }
  padding: 0 10px;

  .content-item-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .content-item-name {
    ${({ theme }) => theme.font.body4}
  }
`;

export default ContentItem;
