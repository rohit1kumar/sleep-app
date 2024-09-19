import React, { useState, useEffect } from 'react';

export default function GoalSelection({ onGoalSelect }) {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch('/api/v1/goals')
            .then(response => response.json())
            .then(data => setGoals(data))
            .catch(error => console.error('Error fetching goals:', error));
    }, []);

    return (
        <div className="space-y-4">
            <p className="text-2xl font-bold text-center text-indigo-600">Select a Goal</p>
            <div className="grid gap-4">
                {goals.map(goal => (
                    <button
                        key={goal.id}
                        onClick={() => onGoalSelect(goal)}
                        className="block w-full text-left px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                        {goal.description}
                    </button>
                ))}
            </div>
        </div>
    );
}