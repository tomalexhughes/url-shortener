import React, { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import Form from '../_styles/Form';
import ErrorMessage from '../_styles/ErrorMessage';
import Heading1 from '../_styles/Heading1';
import Heading2 from '../_styles/Heading2';
import ColoredLink from '../_styles/ColoredLink';
import Button from '../_styles/Button';

const GENERIC_ERROR_MESSAGE = `We're sorry! It looks like we experienced an
                            error, please try again.`;

const UrlShortener = () => {
    const [userInput, updateUserInput] = useState('');
    const [shortenedUrl, updateShortenedUrl] = useState(null);
    const [errorMessage, setError] = useState(null);

    const reset = () => {
        updateShortenedUrl(null);
        updateUserInput('');
        setError(null);
    };

    const onChange = ({ target: { value } }) => {
        setError(null);
        updateUserInput(value);
    };

    const onSubmit = async (e) => {
        setError(null);
        e.preventDefault();
        try {
            const { link } = await apiRequest({
                endpoint: '/shorten',
                method: 'POST',
                payload: { long_url: userInput }
            });
            updateShortenedUrl(link);
        } catch (error) {
            setError((error && error.description) || GENERIC_ERROR_MESSAGE);
        }
    };

    if (shortenedUrl == null) {
        return (
            <>
                <Heading1>Welcome</Heading1>
                <Heading2>Enter a URL below to receive a shorter link</Heading2>

                <Form onSubmit={onSubmit}>
                    <label htmlFor="longUrl">
                        Long URL
                        <input
                            id="longUrl"
                            value={userInput}
                            onChange={onChange}
                            placeholder="https://example.com"
                        />
                    </label>
                    {errorMessage && (
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    )}
                    <Button type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
            </>
        );
    }

    return (
        <>
            <Heading1>Your shortened URL is...</Heading1>
            <Heading2>
                <ColoredLink href={shortenedUrl} color="white">
                    {shortenedUrl}
                </ColoredLink>
            </Heading2>
            <Button onClick={reset}>Reset</Button>
        </>
    );
};

export default UrlShortener;
