import React, { useState, useEffect } from 'react';
import './MouseStatus.css';

const MouseStatus = () => {
  const [physicalHealth, setPhysicalHealth] = useState(50);
  const [mentalHealth, setMentalHealth] = useState(50);
  const [mood, setMood] = useState(50);

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem('mouseStatus'));
    if (savedStatus) {
      setPhysicalHealth(savedStatus.physicalHealth);
      setMentalHealth(savedStatus.mentalHealth);
      setMood(savedStatus.mood);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mouseStatus', JSON.stringify({ physicalHealth, mentalHealth, mood }));
  }, [physicalHealth, mentalHealth, mood]);

  const getColor = (value) => {
    if (value <= 50) return 'red';
    if (value >= 80) return 'green';
    return 'black';
  };

  const handleChange = (setter) => (e) => {
    setter(Number(e.target.value));
  };

  return (
    <div className="mouse-status">
      <h2>쥐의 상태</h2>
      <div className="status-item">
        <label>몸 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={physicalHealth}
          onChange={handleChange(setPhysicalHealth)}
        />
        <span style={{ color: getColor(physicalHealth) }}>{physicalHealth}</span>
      </div>
      <div className="status-item">
        <label>마음 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={mentalHealth}
          onChange={handleChange(setMentalHealth)}
        />
        <span style={{ color: getColor(mentalHealth) }}>{mentalHealth}</span>
      </div>
      <div className="status-item">
        <label>기분 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={mood}
          onChange={handleChange(setMood)}
        />
        <span style={{ color: getColor(mood) }}>{mood}</span>
      </div>
    </div>
  );
};

export default MouseStatus;