import styled from 'styled-components';
import GlobalNavigationBar from '../components/GlobalNavigationBar';
import { GlobalNavigationBarType } from '../components/GlobalNavigationBar/types';

interface LayoutProps {
  children: React.ReactNode;
  GNBType?: GlobalNavigationBarType;
}
const Layout = ({ children, GNBType }: LayoutProps) => {
  return (
    <LayoutStyle>
      {children}
      <GlobalNavigationBar GNBType={GNBType} />
    </LayoutStyle>
  );
};
const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;
export default Layout;
