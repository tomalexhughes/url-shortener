import styled from 'styled-components';

const Footer = styled.footer`
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: white;
    font-weight: 100;
    font-size: 1.6rem;

    a {
        color: white;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default Footer;
