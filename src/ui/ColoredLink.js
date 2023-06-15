import styled from 'styled-components';

const ColoredLink = styled.a`
    color: ${({ color }) => color};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export default ColoredLink;
