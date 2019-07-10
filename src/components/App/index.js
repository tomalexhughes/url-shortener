import React from 'react';
import { ThemeProvider } from 'styled-components';
import UrlShortener from '../UrlShortener';
import GlobalStyle from '../_styles/GlobalStyle';
import Heading1 from '../_styles/Heading1';
import Heading2 from '../_styles/Heading2';
import Container from '../_styles/Container';
import Footer from '../_styles/Footer';

const theme = {
    primary: '#4354cb'
};

const App = () => (
    <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <>
                <Container>
                    <Heading1>Welcome</Heading1>
                    <Heading2>
                        Enter a URL below to receive a shorter link
                    </Heading2>
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
