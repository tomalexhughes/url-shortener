import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    max-width: 320px;
    height: 100vh;
    margin: 0;
    padding: 200px 20px 0;

    @media screen and (min-width: 768px) {
        width: 50%;
        max-width: initial;
        padding: 10% 0 0 10%;
    }
`;

export default Container;
