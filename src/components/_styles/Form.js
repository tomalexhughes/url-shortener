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
        width: 100%;
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
`;

export default Form;
