import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const StartPage = () => {
  const location = useLocation();
  const [nickName, setNickName] = useState(location.state?.name || "");

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="이름"
          value={nickName}
          disabled={location.state?.name ? true : false}
          onChange={(e) => {
            e.preventDefault();
            setNickName(e.target.value);
          }}
        />
        <Link to={`/step?name=${nickName}`}>
          <button>시작하기</button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
