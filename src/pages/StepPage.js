import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import data from "../common/api/question.json";
import { Div, Footer, Header, Wrapper, BorderInput } from "./StartPage";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { styled } from "styled-components";

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
    <Wrapper>
      <Div>
        <Header>
          <IoIosArrowBack size={28} />
          <div style={{ marginLeft: 5 }}>
            <IoSearch size={28} />
            <AiOutlineMenu size={28} />
          </div>
        </Header>
        <Body>
          <div style={{ width: 40, margin: "0 auto" }}>
            <h1>Q{step + 1}</h1>
          </div>

          {data[step] && <Question>{data[step].question}</Question>}
          <div>
            <Button onClick={() => goNextStep(0)}>
              {data[step] && data[step].answers[0].content}
            </Button>
            <Button onClick={() => goNextStep(1)}>
              {data[step] && data[step].answers[1].content}
            </Button>
          </div>
        </Body>
        <Footer>
          <CiSquarePlus size={35} color="gray" />
          <BorderInput />
        </Footer>
      </Div>
    </Wrapper>
  );
};

export default StepPage;

const Body = styled.div`
  width: 350px;
  height: 330px;
  background-color: white;
  border-radius: 20px;
  h1 {
    border-bottom: 1px solid #8898a5;
    padding-bottom: 10px;
    color: #8898a5;
    text-align: center;
  }
`;

const Question = styled.p`
  font-size: 15px;
  line-height: 22px;
  margin: 28px auto;
  text-align: center;
  padding: 0 15px;
`;

export const Button = styled.button`
  align-items: center;
  background-color: #ebebeb;
  border: none;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  height: 50px;
  justify-content: center;
  margin: 8px auto;
  padding: 30px;
  transition: 0.2s;
  width: 300px;
  font-weight: 700;
  &:hover {
    background-color: #fee500;
    width: 305px;
    height: 55px;
    font-size: 17px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
`;
