import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [result, setResult] = useState(true);

  // useEffect(() => {
  //   if (location.state.total < 15) {
  //     setResult((pre) => !pre);
  //   }
  // }, [location.state.total]);

  return (
    <div>
      <div>끝</div>
      <div>{location.state.total}</div>
      <button
        onClick={() => navigate("/", { state: { name: location.state.name } })}
      >
        다시 하기
      </button>
    </div>
  );
};

export default ResultPage;
