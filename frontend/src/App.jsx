import React, { useState } from 'react';
import SignUp from './components/SignUp';
import GoalSelection from './components/GoalSelection';
import SleepDataEntry from './components/SleepDataEntry';
import EfficiencyDisplay from './components/EfficiencyDisplay';

export default function App() {
  const [currentStep, setCurrentStep] = useState('signup');
  const [user, setUser] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [sleepEfficiency, setSleepEfficiency] = useState(90);

  const handleSignUp = (userData) => {
    setUser(userData);
    setCurrentStep('goals');
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setCurrentStep('sleepData');
  };

  const handleSleepDataSubmit = (efficiency) => {
    // setSleepEfficiency(90);
    setCurrentStep('efficiency');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="relative sm:max-w-xl sm:mx-auto">
        <div className="relative p-10 bg-white shadow-lg sm:rounded-3xl">
          <div className="max-w-md mx-auto">
            {currentStep === 'signup' && <SignUp onSignUp={handleSignUp} />}
            {currentStep === 'goals' && <GoalSelection onGoalSelect={handleGoalSelect} token={user.token} />}
            {currentStep === 'sleepData' && (
              <SleepDataEntry
                onDataSubmit={handleSleepDataSubmit}
                token={user.token}
                goalId={selectedGoal.id}
              />
            )}
            {currentStep === 'efficiency' && <EfficiencyDisplay efficiency={sleepEfficiency} />}
          </div>
        </div>
      </div>
    </div>
  );
}