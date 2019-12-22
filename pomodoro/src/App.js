import React, { useState, useEffect } from 'react';

import './App.scss';

function App() {
	const [ time, setTime ] = useState(1500);
	const [ active, setActive ] = useState(false);
	const [ count, setCount ] = useState(0);
	const [ onBreak, setOnBreak ] = useState(false);

	useEffect(() => {
		let int = null;
		if (active && time > 0) {
			int = setInterval(() => {
				setTime((time) => time - 1);
			}, 10);
		} else {
      if (active && time === 0 && !onBreak){
        setActive(false);
        setTime(shortOrLong())
        setOnBreak(true)
        setCount(count + 1)
        alert("Time For A Break!!")
      }
      else if (onBreak && time === 0){
        setOnBreak(false);
        setTime(1500);
        clearInterval(int);
        setActive(false)
      }
    }
		return () => clearInterval(int);
	});

	const formatTime = () => {
		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  };
  
  const shortOrLong = () => {
    if (count % 2 !=0){
      return 600
    } else{
      return 300;
    }
  }


	return (
		<div className="App">
			<h1>Pomodoro Timer</h1>
			<p>{time}</p>
			<p>{count}</p>
			<button onClick={() => setActive(!active)}>{active? "Pause" : "Start"}</button>
		</div>
	);
}

export default App;
