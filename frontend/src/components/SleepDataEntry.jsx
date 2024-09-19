import React, { useState } from 'react';

export default function SleepDataEntry({ onDataSubmit, token, goalId }) {
    const [struggleDuration, setStruggleDuration] = useState('');
    const [sleepDuration, setSleepDuration] = useState('');
    const [bedTime, setBedTime] = useState('');
    const [wakeupTime, setWakeupTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sleepData = {
            struggle_duration: struggleDuration,
            bed_time: bedTime || '23:00',
            wakeup_time: wakeupTime || '07:00',
            sleep_duration: parseFloat(sleepDuration) || 8.0,
            goal_id: goalId
        };

        try {
            const response = await fetch('https://sleep-api.onrender.com/api/v1/sleep_records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sleepData),
            });
            const data = await response.json();
            if (response.ok) {
                onDataSubmit(data.sleep_efficiency);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert('An error occurred while submitting sleep data');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="struggleDuration" className="block text-sm font-medium text-gray-700">Struggle Duration</label>
                <select
                    id="struggleDuration"
                    value={struggleDuration}
                    onChange={(e) => setStruggleDuration(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md sm:text-sm"
                    required
                >
                    <option value="">Select duration</option>
                    <option value="less_than_2_weeks">Less than 2 weeks</option>
                    <option value="2_to_8_weeks">2 to 8 weeks</option>
                    <option value="more_than_8_weeks">More than 8 weeks</option>
                </select>
            </div>
            <div>
                <label htmlFor="bedTime" className="block text-sm font-medium text-gray-700">
                    What time do you go to bed for sleep?
                </label>
                <input
                    type="time"
                    id="bedTime"
                    value={bedTime || '23:00'}
                    onChange={(e) => setBedTime(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                />
            </div>
            <div>
                <label htmlFor="wakeupTime" className="block text-sm font-medium text-gray-700">
                    What time do you get out of the bed to start your day?
                </label>
                <input
                    type="time"
                    id="wakeupTime"
                    value={wakeupTime || '07:00'}
                    onChange={(e) => setWakeupTime(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                    required
                />
            </div>
            <div>
                <label htmlFor="sleepDuration" className="block text-sm font-medium text-gray-700">
                    How many hours of sleep do you get in a typical night?
                </label>
                <input
                    type="number"
                    min="0"
                    max="24"
                    id="sleepDuration"
                    value={sleepDuration || 8}
                    onChange={(e) => setSleepDuration(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., 7.5"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Submit Sleep Data
            </button>
        </form>
    );

}