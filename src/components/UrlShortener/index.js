import React, { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import Form from '../_styles/Form';
import ErrorMessage from '../_styles/ErrorMessage';

const UrlShortener = () => {
    const [userInput, updateUserInput] = useState('');
    const [shortenedUrl, updateShortenedUrl] = useState(null);
    const [isError, setIsError] = useState(false);

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

    return (
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
                    We&apos;re sorry! It looks like we experienced an error,
                    please try again.
                </ErrorMessage>
            )}
            <button type="submit" onClick={onSubmit}>
                Submit
            </button>
            {shortenedUrl && shortenedUrl}
        </Form>
    );
};

export default UrlShortener;
