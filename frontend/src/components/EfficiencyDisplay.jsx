import React from 'react';

export default function EfficiencyDisplay({ efficiency }) {
    return (
        <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-4">Your Sleep Efficiency</p>
            <p className="bg-indigo-100 border-2 border-indigo-300 text-indigo-600 px-4 py-3 rounded-lg font-bold text-4xl">{efficiency}%</p>
            <p className="mt-4 text-gray-600">
                That's good 😎
            </p>
        </div>
    );
}