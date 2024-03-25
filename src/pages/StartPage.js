import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";

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
        alert(`${Math.trunc(timer / 60)}분 ${timer % 60}초 남았습니다`);
      }
    } else {
      navigate(`/step?name=${name}`);
    }
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
          <Title>
            <h1>상식 퀴즈!</h1>
            <p>
              총 10문제를 풀어 고득점을 획득하여
              <br />
              기프티콘을 받아 가세요
            </p>
          </Title>

          <Input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
          />
          <Button disabled={name.trim() === ""} onClick={() => onClick(taken)}>
            퀴즈 풀기 <FaCircleArrowRight />
          </Button>
        </Body>
        <Footer>
          <CiSquarePlus size={35} color="gray" />
          <BorderInput />
        </Footer>
      </Div>
    </Wrapper>
  );
};

export default StartPage;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  width: 390px;
  height: 100vh;
  background-color: #b2c7d9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 0 0 0;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Footer = styled.div`
  background-color: white;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  font-size: 16px;
  gap: 4px;
  height: 48px;
  width: 300px;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 20px;
  font-size: 16px;
  gap: 4px;
  height: 48px;
  width: 300px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  font-weight: 700;
  margin-top: 10px;
  cursor: pointer;
`;

const Title = styled.div`
  margin: 0 auto;
  text-align: center;
  P {
    color: gray;
  }
`;

export const BorderInput = styled.div`
  width: 331px;
  height: 32px;
  border: 2px solid hsla(0, 0%, 65%, 0.5);
  border-radius: 20px;
  background-color: #f9f9f9;
`;
