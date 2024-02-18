import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import data from "../common/api/question.json";

const StepPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(searchParams.get("step") ?? 0);
  const [point, setPoint] = useState(searchParams.get("point") ?? 0);
  const name = searchParams.get("name");
  const navigate = useNavigate();

  useEffect(() => {
    if (step > 9) {
      navigate("/result", {
        state: {
          total: point,
          name,
        },
      });
    }
  }, [navigate, point, name, step]);

  const goNextStep = (num) => {
    setStep((prev) => prev + 1);
    setPoint((prev) => prev + parseInt(data[step].answers[num].point));
    searchParams.set("step", step + 1);
    searchParams.set("point", point + parseInt(data[step].answers[num].point));
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div>{searchParams.get("name")}</div>

      {data[step] && <div>{data[step].question}</div>}
      <div>
        <button onClick={() => goNextStep(0)}>
          {data[step] && data[step].answers[0].content}
        </button>
        <button onClick={() => goNextStep(1)}>
          {data[step] && data[step].answers[1].content}
        </button>
      </div>
    </div>
  );
};

export default StepPage;
