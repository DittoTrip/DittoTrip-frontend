import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './theme';

interface Props {
  themeName: ThemeName;
}
export const GlobalStyle = createGlobalStyle<Props>`

    :root{
        background-color: ${props => (props.themeName === 'light' ? 'white' : 'black')}
    }
    
    body{
        padding: 0;
        margin: 0;
    }
    h1{
        margin: 0;
    }
    *{
        font-family : 'Noto Sans KR', sans-serif;
        color: ${props => (props.themeName === 'light' ? 'black' : 'white')};
    }
`;
