import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Error() {
  const navigate = useNavigate();
  const TimerRef = useRef();
  const [counter, setCounter] = useState(5);

  const startTimer = () => {
    pauseTimer();
    TimerRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
  };

  const pauseTimer = () => {
    if (TimerRef.current) {
      clearInterval(TimerRef.current);
    }
  };

  useEffect(() => {
    if (counter < 0) {
      navigate("/");
    }
  }, [counter, navigate]);

  useEffect(() => {
    startTimer();

    return () => {
      pauseTimer();
    };
  }, []);
  return (
    <div className="hero  flex-grow bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 class="text-5xl font-bold">Error Page</h1>
          <p class="py-6">在{counter}秒後即將自動返回首頁...</p>
          <button class="btn btn-primary">回首頁</button>
        </div>
      </div>
    </div>
  );
}

export default Error;
