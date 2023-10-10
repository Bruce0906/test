import React, { useState } from "react";
import { Menu, Form, Container, Message, Grid } from "semantic-ui-react";
import firebase from "../utils/firebase";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import "../components/customStyles.css";
import networkImage from "../components/network_image.png";
const Signin = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 在送出表單後,顯示轉圈圈的樣式
  const onSubmit = () => {
    setIsLoading(true);
    if (activeItem === "register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/");
          setIsLoading(false);
        })
        .catch((error) => {
          {
            /* 在register頁面抓取錯誤 */
          }
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("信箱已存在");
              break;
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度不足");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else if (activeItem === "signin") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          {
            /* 在signin頁面抓取錯誤 */
          }
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("信箱格式不正確");
              break;
            case "auth/user-not-found":
              setErrorMessage("信箱不存在");
              break;
            case "auth/invalid-login-credentials":
              setErrorMessage("密碼錯誤");
              break;
            default:
          }
          setIsLoading(false);
        });
    }
  };
  return (
    <>
      <Container>
        <Menu widths="2" className="menu_style">
          <Menu.Item
            active={activeItem === "register"}
            onClick={() => {
              setErrorMessage(""); // 從 signin 切換到 register 時不會顯示 errorMessage
              setActiveItem("register");
            }}
          >
            註冊
          </Menu.Item>
          <Menu.Item
            active={activeItem === "signin"}
            onClick={() => {
              setErrorMessage(""); // 從 register 切換到 signin 時不會顯示 errorMessage
              setActiveItem("signin");
            }}
          >
            登入
          </Menu.Item>
        </Menu>

        <Form onSubmit={onSubmit} className="form_style">
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <Grid.Column width={5}>
                <img
                  src={networkImage}
                  alt="loading_wrong"
                  width="400"
                  height="210"
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Form.Input
                  className="form_input_size"
                  label="信箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="請輸入信箱"
                ></Form.Input>
                <Form.Input
                  className="form_input_size"
                  label="密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="請輸入密碼"
                  type="password"
                ></Form.Input>
                {/* if errorMessage is not null,print errorMessage content */}
                {errorMessage && <Message negative>{errorMessage}</Message>}
                <Form.Button loading={isLoading}>
                  {/* 將 isLoading 裡的值傳入 loading 當中 */}
                  {activeItem === "register" && "註冊"}
                  {activeItem === "signin" && "登入"}
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    </>
  );
};

export default Signin;
