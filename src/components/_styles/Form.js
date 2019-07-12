import styled from 'styled-components';

const Form = styled.form`
    label {
        display: flex;
        flex-direction: column;
        margin-top: 2.5rem;
        color: white;
        font-size: 1.6rem;
    }

    input {
        width: 25rem;
        height: 7.5rem;
        margin-top: 1.5rem;
        padding: 1rem;
        color: white;
        font-size: 1.6rem;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 4px;

        &::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
    }

    button {
        width: 25rem;
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
    }

    @media screen and (min-width: 480px) {
        input,
        button {
            width: 29rem;
        }
    }
`;

export default Form;
