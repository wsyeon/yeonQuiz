import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, total } = location.state;

  useEffect(() => {
    const userInfo = JSON.stringify({
      user: name,
      time: new Date(),
      record: "taken",
    });
    localStorage.setItem("quizStatus", userInfo);
  }, [name]);

  return (
    <div>
      <div>끝</div>
      <div>{name}</div>
      <div>{total}</div>
      <button onClick={() => navigate("/")}>홈으로</button>
    </div>
  );
};

export default ResultPage;
