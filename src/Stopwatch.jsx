import { useEffect, useState, useRef } from "react";

function Stopwatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTime = useRef()

    useEffect(() => {

        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])


    function start() {
        if (isRunning) return;
        startTime.current = Date.now() - time;
        intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTime.current);
        }, 10);
        setIsRunning(true);
    }

    function stop() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);

    }

    function reset() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
        setIsRunning(false);
    }

    function formatTime(number) {
        const minutes = Math.floor(number / 60000);
        const seconds = Math.floor((number % 60000) / 1000);
        const centiseconds = Math.floor((number % 1000) / 10)

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
    }

    return (
        <>
            <div className="content">
                <div className="display">
                    <p>{formatTime(time)}</p>
                </div>
                <div className="f-buttons">
                    <button className="start" onClick={start} >Start</button>
                    <button className="stop" onClick={stop}>Stop</button>
                    <button className="reset" onClick={reset}>Reset</button>
                </div>
            </div>
        </>);
}

export default Stopwatch;