import React, { useState } from 'react';

export default function SignUp({ onSignUp }) {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/v1/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Store JWT in localStorage
                onSignUp({ token: data.token, nickname: data.nickname });
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('An error occurred during signup');
        }
    };
    return (
        <>
            <div>
                <p className="text-2xl font-bold text-center text-indigo-600 m-2">Sign Up</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        placeholder='what should we call you?'
                        onChange={(e) => setNickname(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='you know the drill'
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Sign Up
                </button>
            </form>
        </>
    );

}