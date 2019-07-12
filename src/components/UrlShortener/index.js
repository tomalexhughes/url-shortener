import React, { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import Form from '../_styles/Form';
import ErrorMessage from '../_styles/ErrorMessage';
import Heading1 from '../_styles/Heading1';
import Heading2 from '../_styles/Heading2';
import ColoredLink from '../_styles/ColoredLink';
import Button from '../_styles/Button';
import Heading3 from '../_styles/Heading3';

const UrlShortener = () => {
    const [userInput, updateUserInput] = useState('');
    const [shortenedUrl, updateShortenedUrl] = useState(null);
    const [isError, setIsError] = useState(false);

    const reset = () => {
        updateShortenedUrl(null);
        updateUserInput('');
        setIsError(false);
    };

    const onChange = ({ target: { value } }) => {
        setIsError(false);
        updateUserInput(value);
    };

    const onSubmit = async (e) => {
        setIsError(false);
        e.preventDefault();
        try {
            const { link } = await apiRequest({
                endpoint: '/shorten',
                method: 'POST',
                payload: { long_url: userInput }
            });
            updateShortenedUrl(link);
        } catch {
            /**
             * Optional catch binding
             * Would likely catch error and report to error tracker for production app
             */
            setIsError(true);
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
                    {isError && (
                        <ErrorMessage>
                            We&apos;re sorry! It looks like we experienced an
                            error, please try again.
                        </ErrorMessage>
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
            <Heading3 as="h2">
                <ColoredLink href={shortenedUrl} color="white">
                    {shortenedUrl}
                </ColoredLink>
            </Heading3>
            <Button onClick={reset}>Reset</Button>
        </>
    );
};

export default UrlShortener;
