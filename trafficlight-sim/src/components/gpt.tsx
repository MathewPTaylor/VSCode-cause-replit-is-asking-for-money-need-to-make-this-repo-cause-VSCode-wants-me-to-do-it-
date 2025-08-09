import React, { useState, useEffect } from 'react';

const trafficStates = ['green', 'yellow', 'red'];

interface prop {
    color: string;
}

function TrafficLight({color}: prop) {
  return (
    <div>
      <p>{color}</p>
      <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: color === 'red' ? 'red' : '#ccc' }} />
      <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: color === 'yellow' ? 'yellow' : '#ccc' }} />
      <div style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: color === 'green' ? 'green' : '#ccc' }} />
    </div>
  );
}

function TrafficLightSimulator() {
  const [lightAIndex, setLightAIndex] = useState(0);
  const [lightBIndex, setLightBIndex] = useState(1); // Offset by 1 state

  useEffect(() => {
    const interval = setInterval(() => {
      setLightAIndex(prev => (prev + 1) % trafficStates.length);
      setLightBIndex(prev => (prev + 1) % trafficStates.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '50px' }}>
      <div>
        <h3>Traffic Light A</h3>
        <TrafficLight color={trafficStates[lightAIndex]} />
      </div>
      <div>
        <h3>Traffic Light B</h3>
        <TrafficLight color={trafficStates[lightBIndex]} />
      </div>
    </div>
  );
}

export default TrafficLightSimulator;
