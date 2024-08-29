import { styled } from 'styled-components';
import { ColorKey } from '../../styles/theme';

const Dot = ({ color }: { color: ColorKey }) => {
  return <DotStyle color={color}></DotStyle>;
};

const DotStyle = styled.div<{ color: ColorKey }>`
  width: 2px;
  height: 2px;
  background-color: ${({ theme, color }) => theme.color[color]};
  border-radius: 50%;
`;

export default Dot;
