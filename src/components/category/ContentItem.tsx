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
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .content-item-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .content-item-name {
    ${({ theme }) => theme.font.body4}
    text-align: center;
  }
`;

export default ContentItem;
