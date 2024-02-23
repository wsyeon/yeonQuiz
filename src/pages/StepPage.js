import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import data from "../common/api/question.json";
import { Div, Footer, Header, Wrapper, BorderInput } from "./StartPage";
import { MdTimer } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";

const StepPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(searchParams.get("step") ?? 0);
  const [point, setPoint] = useState(searchParams.get("point") ?? 0);
  const [second, setSecond] = useState(10);
  const name = searchParams.get("name");
  const count = useRef(10);
  const interval = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    interval.current = setInterval(() => {
      count.current -= 0.1;
      setSecond((prev) => (prev -= 0.1));
    }, 105);
  }, [step]);

  useEffect(() => {
    if (count.current <= 0) {
      count.current = 10;
      setSecond(10);
      setStep((prev) => prev + 1);
      clearInterval(interval.current);
      setPoint((prev) => prev + 0);
      searchParams.set("step", step + 1);
      searchParams.set("point", point + 0);
      setSearchParams(searchParams);
    }
  }, [second, step, point, searchParams, setSearchParams]);

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
    count.current = 10;
    setSecond(count.current);
    setStep((prev) => prev + 1);
    setPoint((prev) => prev + parseInt(data[step].answers[num].point));
    searchParams.set("step", step + 1);
    searchParams.set("point", point + parseInt(data[step].answers[num].point));
    setSearchParams(searchParams);
    clearInterval(interval.current);
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
          <PrograssBarWrap>
            <MdTimer size={32} />
            <PrograssBar $time={second} />
          </PrograssBarWrap>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
  height: auto;
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
  font-size: 18px;
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

const PrograssBar = styled.div`
  background-color: #fee500;
  width: ${(props) => props.$time * 10}%;
  height: 50%;
  transition: 0.3;
  border-radius: 20px;
  border: none;
`;
const PrograssBarWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  box-sizing: border-box;
`;
