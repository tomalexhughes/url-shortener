import styled from 'styled-components';

const Container = styled.div`
    width: 25rem;
    height: 100vh;
    margin: 0;
    padding: 10% 0 0 10%;

    @media screen and (min-width: 480px) {
        width: 44rem;
    }

    @media screen and (min-width: 960px) {
        padding: 14rem 0 0 14rem;
    }
`;

export default Container;
