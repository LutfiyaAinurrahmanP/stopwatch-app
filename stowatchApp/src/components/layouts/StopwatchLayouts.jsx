import Typography from "@mui/material/Typography";
import CardComponents from "../ui/CardComponent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";

export default function StopwatchLayout() {
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}.${centis}`;
  }

  const [elapsed, setElapsed] = useState(0);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const isRunning = intervalRef.current !== null;

  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    startTimeRef.current = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 50);
  };

  const pause = () => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsed(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return (
    <>
      <CardComponents
        title="Stopwatch App"
        content={
          <>
            <Typography variant="h5">{formatTime(elapsed)}</Typography>
          </>
        }
        action={
          <>
            <Button
              size="small"
              variant="contained"
              onClick={start}
              disabled={isRunning}
            >
              Start
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={pause}
              disabled={!isRunning}
            >
              Pause
            </Button>
            <Button size="small" variant="outlined" onClick={reset}>
              Reset
            </Button>
          </>
        }
      />
    </>
  );
}
