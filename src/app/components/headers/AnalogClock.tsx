import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="clock-container">
      <div className="clock">
        {/* Clock hands */}
        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }} />
        <div className="center" />

        {/* Numbers */}
        <div className="numbers">
          {[...Array(12)].map((_, i) => {
            const angle = (i + 1) * 30;
            const radius = 85; // adjust based on size
            const x = radius * Math.sin((angle * Math.PI) / 180);
            const y = -radius * Math.cos((angle * Math.PI) / 180);
            return (
              <div
                key={i}
                className="number"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
