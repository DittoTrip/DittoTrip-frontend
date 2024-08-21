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
  min-height: 100vh;
  max-width: 600px;

  margin: 0 auto;
  padding-bottom: 160px;
`;
export default Layout;
