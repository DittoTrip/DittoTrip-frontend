import { styled } from 'styled-components';

const Dot = () => {
  return <DotStyle></DotStyle>;
};

const DotStyle = styled.div`
  width: 2px;
  height: 2px;
  background-color: ${({ theme }) => theme.color.gray80};
  border-radius: 50%;
`;

export default Dot;
