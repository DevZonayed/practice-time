import React, { useEffect, useRef, useState } from "react";

const Time = () => {
  const [timerHistory, setTimeHistory] = useState([]);
  const practiceTimer = useRef();
  const [practiceTime, setPracticeTime] = useState(0);

  useEffect(() => {
    if (timerHistory[timerHistory.length - 1]?.endAt) {
      if (practiceTimer.current) {
        clearInterval(practiceTimer.current);
      }
    } else if (timerHistory.length !== 0) {
      practiceTimer.current = setInterval(() => {
        let total = 0;
        timerHistory.map((item) => {
          let chunkTime =
            new Date(
              item.endAt !== undefined ? item.endAt : Date.now()
            ).valueOf() - new Date(item.startAt).valueOf();
          total = total + chunkTime;
        });
        setPracticeTime(total);
      }, 100);
    }
    return () => {
      if (practiceTimer.current) {
        clearInterval(practiceTimer.current);
      }
    };
  }, [timerHistory]);

  //  Ms to time
  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  const startPractice = () => {
    let history = [...timerHistory];
    if (history.length === 0 || history[history.length - 1].endAt) {
      history.push({
        startAt: Date.now(),
      });
    }
    setTimeHistory(history);
    // handlePracticeTimer();
  };

  const stopPractice = () => {
    // Stop Timer First
    if (practiceTimer.current) {
      clearInterval(practiceTimer.current);
    }

    let history = [...timerHistory];
    history[history.length - 1] = {
      ...history[history.length - 1],
      endAt: Date.now(),
    };
    setTimeHistory(history);
  };

  const showHistory = () => {
    console.log(timerHistory);
  };
  return (
    <div>
      <div style={{ fontSize: "50px" }} className="display">
        {msToTime(practiceTime)}
      </div>
      <div className="actions">
        <button onClick={startPractice}>Start</button>
        <button onClick={stopPractice}>Stop</button>
        <button onClick={showHistory}>History</button>
      </div>

      <div className="historyDisplay">
        <br />
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {timerHistory.map((item, index) => {
            return (
              <li key={index}>
                {new Date(item.startAt).toLocaleTimeString("en", {
                  timeStyle: "short",
                })}{" "}
                -to-{" "}
                {item.endAt
                  ? new Date(item.endAt).toLocaleTimeString("en", {
                      timeStyle: "short",
                    })
                  : "Running"}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Time;
