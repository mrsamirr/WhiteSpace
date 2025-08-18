import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface GoogleUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    username?: string;
}

export const useGoogleAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/oauth/google`, {
                idToken: credentialResponse.credential
            });

            const { token, user } = response.data;

            // Store token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to dashboard or home
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Google authentication error:', err);
            setError(err.response?.data?.error || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google authentication was cancelled or failed.');
        setLoading(false);
    };

    return {
        handleGoogleSuccess,
        handleGoogleError,
        loading,
        error,
        setError
    };
};