import { useEffect, useState } from "react";

interface Props {
  deadline: number; //Optional property ends with ?
  onFinish?: () => void;
}

function Timer({ deadline, onFinish }: Props) {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  let finished = false;

  function getTime() {
    const time = deadline - Date.now();
    if (!finished) {
      if (time <= 0) {
        setMinutes("00");
        setSeconds("00");
        finished = true;
        onFinish?.();
        return;
      }

      setMinutes(String(Math.floor((time / 1000 / 60) % 60)).padStart(2, "0"));
      setSeconds(String(Math.floor((time / 1000) % 60)).padStart(2, "0"));
    }
  }

  useEffect(() => {
    getTime();
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-dark px-4 text-light col-auto m-1 align-content-center text-center rounded fs-3">
        {minutes}:{seconds}
      </div>
    </>
  );
}

export default Timer;
