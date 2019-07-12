import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    height: 5rem;
    margin-top: 2.5rem;
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    font-size: 1.6rem;
    background: white;
    border: none;
    border-radius: 4px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export default Button;
