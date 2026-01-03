import React, { useState } from 'react';
import bgImage from '../../assets/Background/budgetBG.png';

const BudgetEstimate = () => {
  const [showResult, setShowResult] = useState(false);

  const handleEstimate = () => {
    setShowResult(true);
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-16"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-16 max-w-5xl w-full text-center">
        
        {/* Title */}
        <h1 className="text-5xl lg:text-6xl font-['Brush_Script_MT',cursive] text-yellow-400 mb-6 animate-pulse">
          Budget Planner
        </h1>

        {/* Subheading */}
        <h2 className="text-xl lg:text-2xl text-gray-100 mb-6 font-['Abril_Fatface']">
          Plan Your Trip Smartly
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm lg:text-lg mb-12 leading-relaxed">
          Estimating your travel budget has never been easier. With Apna Trip, you can get a clear idea of your total travel cost instantly. 
          Our smart estimation tool considers daily expenses, trip duration, and helps you plan efficiently so you can travel confidently without worrying about overspending. 
          Click the button below to see your estimated budget and start planning your perfect trip today.
        </p>

        {/* Estimate Button */}
        <button
          onClick={handleEstimate}
          className="bg-yellow-400 text-gray-900 font-semibold px-10 py-3 rounded-full text-lg lg:text-xl hover:bg-yellow-300 transition-transform transform hover:scale-105"
        >
          Estimate Budget
        </button>

        {/* Result Display */}
        {showResult && (
          <div className="mt-10 text-3xl lg:text-4xl text-gray-100 font-bold animate-pulse">
            Estimated Budget: ₹25,000
          </div>
        )}

        {/* Footer Note */}
        <p className="mt-10 text-gray-400 text-sm lg:text-base">
          This estimate is based on average daily expenses and trip duration. Adjust your travel plans accordingly for a perfect budget-friendly journey.
        </p>
      </div>
    </section>
  );
};

export default BudgetEstimate;
