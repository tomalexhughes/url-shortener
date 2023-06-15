import styled from 'styled-components';
import WarningTriangle from '../images/WarningTriangle.svg';

const ErrorMessage = styled.div`
    position: relative;
    margin-top: 1rem;
    padding-left: 2.8rem;
    color: white;
    font-weight: 700;
    font-size: 1.6rem;

    &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 2.3rem;
        height: 2rem;
        background: url(${WarningTriangle}) no-repeat;
        transform: translateY(-50%);
        content: '';
    }
`;

export default ErrorMessage;
