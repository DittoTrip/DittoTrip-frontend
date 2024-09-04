import { styled } from 'styled-components';

interface Props {
  text: string;
}
const Tag = ({ text }: Props) => {
  return <TagStyled>#{text}</TagStyled>;
};

const TagStyled = styled.div`
  padding: 2px 12px;

  border-radius: 15px;

  background-color: rgba(127, 161, 248, 0.2);
  color: black;
  ${({ theme }) => theme.font.body4};
`;

export default Tag;
