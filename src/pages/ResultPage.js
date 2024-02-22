import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrapper, Div, Header, Footer, BorderInput } from "./StartPage";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import yeon from "../img/yeon.jpeg";
import { Button } from "./StepPage";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, total } = location.state;
  const winner = total >= 90;

  useEffect(() => {
    const userInfo = JSON.stringify({
      user: name,
      time: new Date(),
      record: "taken",
    });
    localStorage.setItem("quizStatus", userInfo);
  }, [name]);

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
        {winner ? (
          <Body>
            <TextDiv>
              <p>
                {name}님!!! <br /> {total}점 축하드립니다!
              </p>
            </TextDiv>
            <TextDiv>
              <p style={{ fontWeight: 600 }}>
                점수를 스크린샷 후 원성연에게 인증해주세요!
              </p>
            </TextDiv>
            <Button onClick={() => navigate("/")}>다시 하기</Button>
          </Body>
        ) : (
          <Body>
            <Img src={yeon} alt="밥 ㅋ" />
            <TextDiv>
              <p>
                {name}님~ <br /> 고작 {total}점? ㅋㅋㅋㅋㅋ
              </p>
            </TextDiv>
            <Button onClick={() => navigate("/")}>넌 다시해라 걍 ㅋ</Button>
          </Body>
        )}

        <Footer>
          <CiSquarePlus size={35} color="gray" />
          <BorderInput />
        </Footer>
      </Div>
    </Wrapper>
  );
};

export default ResultPage;

const Body = styled.div`
  width: 350px;
  height: auto;
  background-color: white;
  border-radius: 20px;
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: center;
  border-radius: 20px 20px 0 0;
`;

const TextDiv = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
  font-weight: 750;
  line-height: 1.5;
`;
