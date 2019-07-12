import React, { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import Form from '../_styles/Form';
import ErrorMessage from '../_styles/ErrorMessage';
import Heading1 from '../_styles/Heading1';
import Heading2 from '../_styles/Heading2';
import ColoredLink from '../_styles/ColoredLink';
import Button from '../_styles/Button';
import Loader from '../_styles/Loader';

const GENERIC_ERROR_MESSAGE = `We're sorry! It looks like we experienced an
                            error, please try again.`;

const UrlShortener = () => {
    const [userInput, updateUserInput] = useState('');
    const [shortenedUrl, updateShortenedUrl] = useState(null);
    const [errorMessage, setError] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const reset = () => {
        updateShortenedUrl(null);
        updateUserInput('');
        setError(null);
    };

    const onChange = ({ target: { value } }) => {
        setError(null);
        updateUserInput(value);
    };

    const checkValidity = () => {
        if (userInput.trim() === '') {
            setError('URL cannot be empty.');
            return false;
        }

        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        const isValid = checkValidity();
        if (!isValid) return;

        try {
            setIsSending(true);
            const { link } = await apiRequest({
                endpoint: '/shorten',
                method: 'POST',
                payload: { long_url: userInput.trim() }
            });
            setIsSending(false);
            updateShortenedUrl(link);
        } catch (error) {
            setIsSending(false);
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
                        {isSending ? <Loader /> : 'Submit'}
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
