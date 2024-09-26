import styled from 'styled-components';
import GlobalNavigationBar from '../components/GlobalNavigationBar';
import { GlobalNavigationBarType } from '../components/GlobalNavigationBar/types';
import ScrollToTop from '../components/common/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
  GNBType?: GlobalNavigationBarType;
}
const Layout = ({ children, GNBType }: LayoutProps) => {
  return (
    <LayoutStyle>
      <ScrollToTop />
      {children}
      <GlobalNavigationBar GNBType={GNBType} />
    </LayoutStyle>
  );
};
const LayoutStyle = styled.main`
  width: 100%;
  min-height: 100vh;
  max-width: 600px;

  margin: 0 auto;
  padding-bottom: 87px;
`;
export default Layout;
