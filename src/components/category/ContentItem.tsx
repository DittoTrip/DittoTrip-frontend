import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
interface ContentItemProps {
  id: number;
  img: string;
  name: string;
}
const ContentItem = ({ id, img, name }: ContentItemProps) => {
  const navigate = useNavigate();
  return (
    <ContentItemStyled>
      <div onClick={() => navigate(`/spot/list/${id}`)}>
        <img className="content-item-img" src={img} alt={name} />
        <div className="content-item-name">{name}</div>
      </div>
    </ContentItemStyled>
  );
};

const ContentItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin-right: 16px;

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
