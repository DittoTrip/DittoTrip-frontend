import { styled } from 'styled-components';

interface DittoItemProps {
  img: string;
  title: string;
}

const DittoItem = ({ img, title }: DittoItemProps) => {
  return (
    <DittoItemStyled>
      <img className="ditto-item-img" src={img} alt={title} />
      <div className="ditto-item-name">{title}</div>
    </DittoItemStyled>
  );
};

const DittoItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin-right: 16px;

  .ditto-item-img {
    width: 100px;
    height: 128px;
  }
  .ditto-item-name {
    ${({ theme }) => theme.font.body3}
    text-align: center;
    white-space: nowrap; 
  }
`;

export default DittoItem;
