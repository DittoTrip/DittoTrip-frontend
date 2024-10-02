import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

interface Props {
  text: string;
}
const Tag = ({ text }: Props) => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    navigate(`/search-result?search=${text}`);
  };

  return <TagStyled onClick={handleClick}>#{text}</TagStyled>;
};

const TagStyled = styled.div`
  width: fit-content;
  padding: 2px 12px;

  border-radius: 15px;

  background-color: ${({ theme }) => theme.color.subColor3};
  color: black;
  ${({ theme }) => theme.font.body4};
`;

export default Tag;
