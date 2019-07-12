import React from 'react';
import styled, { keyframes } from 'styled-components';

const delay = keyframes`
    0%,
    80%,
    100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
`;

const Loader = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    > div {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: ${({ theme }) => theme.primary};
        border-radius: 100%;
        animation: ${delay} 1.4s infinite ease-in-out both;
    }

    > div:nth-of-type(1) {
        animation-delay: -0.32s;
    }

    > div:nth-of-type(2) {
        animation-delay: -0.16s;
    }
`;

export default () => (
    <Loader>
        <div />
        <div />
        <div />
    </Loader>
);
