
import React, { useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
import loginApi from "../api/login_api"
import "./login.css"
export default function Login() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
  });
  const [who, setWho] = useState("");

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      // 음성인식 결과가 value 상태값으로 할당됩니다.
      who === "id" ? setInfo("id", result) : setInfo("password", result);
    },
  });

  const setInfo = (type, value) => {
    setUserInfo((user) => {
      return { ...user, [type]: value };
    });
  };
  const navigate = useNavigate();

  const login = async () => {
     const result = await loginApi(userInfo);
    if (result) {
      alert("로그인 완료");
      navigate("/main");
    }
  };

  const whoClick = (e) => {
    setWho(e.target.name);
  };

  const inputUserInfo = (text) => {
    setUserInfo((user) => {
      return { ...user, [text.target.name]: text.target.value };
    });
  };

  const onMouse = (e) => {
    whoClick(e);
    listen();
  };

  return (
    <body>
      <div className="wrapper">
        <div className="title">STTTS</div>
        <div className="login_wrapper">
          <div className="id_wrapper">
            <div className="id_title">* ID</div>
            <input
              className="id"
              name="id"
              defaultValue={userInfo.id}
              onChange={inputUserInfo}
            ></input>
            {/* <button name="id" onMouseDown={onMouse} onMouseUp={stop}>
              🎤
            </button> */}
          </div>
          <div>
            <div className="pw_title">* PASSWORD</div>
            <input
              className="pw"
              name="password"
              type="password"
              defaultValue={userInfo.password}
              onChange={inputUserInfo}
            ></input>
            {/* <button name="pw" onMouseDown={onMouse} onMouseUp={stop}>
              🎤
            </button> */}
          </div>
          <div className="signUp">
            회원이 아니신가요?
          </div>
          <div>
            <button className="signin" onMouseUp={login}>LOGIN</button>
            {listening && <div>음성인식 활성화 중</div>}
          </div>
        </div>
      </div>
    </body>
  );
}