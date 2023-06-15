import React from 'react';
import { ThemeProvider } from 'styled-components';
import UrlShortener from '../UrlShortener';
import GlobalStyle from '../../ui/GlobalStyle';
import Container from '../../ui/Container';
import Footer from '../../ui/Footer';

const theme = {
    primary: '#4354cb'
};

const App = () => (
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <>
                <Container>
                    <UrlShortener />
                </Container>
                <Footer>
                    Created by <a href="http://tomalexhughes.com">Tom Hughes</a>
                </Footer>
            </>
        </ThemeProvider>
    </>
);

export default App;
