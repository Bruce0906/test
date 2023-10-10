import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import firebase from "./utils/firebase";
import "./components/customStyles.css";
const Header = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    // 在第一次渲染完,監聽使用者的狀態
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser); // 監聽使用者的登入狀態來決定要顯示註冊/登入的按鈕還是登出的按鈕
    });
  }, []);
  return (
    <Menu className="menu_style">
      <Menu.Item as={Link} to="/">
        HomePage
      </Menu.Item>
      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Menu position="right">
        {/* 如果 user 不是 null 顯示發表文章,會員,登出的元件 */}
        {user ? (
          <>
            {" "}
            {/* 若要顯示同一層級平行的元件需要使用<></> */}
            <Menu.Item as={Link} to="/new-post">
              發表文章
            </Menu.Item>
            <Menu.Item as={Link} to="/member">
              會員
            </Menu.Item>
            <Menu.Item onClick={() => firebase.auth().signOut()}>
              登出
            </Menu.Item>
          </>
        ) : (
          <Menu.Item as={Link} to="/signin">
            註冊/登入
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
