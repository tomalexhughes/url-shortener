import styled from 'styled-components';

const Container = styled.div`
    max-width: 320px;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 200px 2rem 0;

    @media screen and (min-width: 768px) {
        max-width: initial;
        width: 50%;
        padding: 10% 0 0 10%;
    }
`;

export default Container;
