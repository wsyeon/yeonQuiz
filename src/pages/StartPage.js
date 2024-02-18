import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const { record, time, user } =
    JSON.parse(localStorage.getItem("quizStatus")) ?? "";
  const [taken, setTaken] = useState(false);
  const [name, setName] = useState(user ?? "");
  const navigate = useNavigate();

  const now = new Date();
  const lastQuiz = new Date(time);
  const timeDiff = now - lastQuiz;

  useEffect(() => {
    if (record === "taken" && time) {
      const oneHour = 60 * 60 * 1000;
      if (timeDiff >= oneHour) {
        localStorage.removeItem("quizStatus");
        setTaken(false);
      } else {
        setTaken(true);
      }
    }
  }, [record, time, timeDiff]);

  const onClick = (taken) => {
    const timer = 3600 - Math.trunc(timeDiff / 1000);
    if (taken) {
      if (timer < 0) {
        alert("새로고침을 해주세요");
      } else {
        alert(`${timer}초 남았습니다`);
      }
    } else {
      navigate(`/step?name=${name}`);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => {
            e.preventDefault();
            setName(e.target.value);
          }}
        />
        <button disabled={name.trim() === ""} onClick={() => onClick(taken)}>
          시작하기
        </button>
      </div>
    </div>
  );
};

export default StartPage;
