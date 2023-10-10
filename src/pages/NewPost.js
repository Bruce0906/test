import React, { useState, useEffect } from "react";
import {
  Container,
  FormInput,
  Header,
  Form,
  Image,
  Button,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import firebase from "../utils/firebase";
import "firebase/compat/storage";
import "firebase/compat/firestore";
const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // data 裡的內容是個陣列,每個陣列裡都是一個物件,物件就是 topics 的文件
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopics(data);
      });
  }, []);
  // 將 topics 裡的陣列用 map function 轉成 text 和 value 的物件
  const options = topics.map((topic) => {
    return {
      text: topic.name,
      value: topic.name,
    };
  });
  // 如果 file 有東西顯示 file 裡的東西 , 如果為 null 顯示預設圖片
  const previewURL = file
    ? URL.createObjectURL(file)
    : "https://react.semantic-ui.com/images/wireframe/image.png";

  const onSubmit = async () => {
    setIsLoading(true);
    let imageUrl = "https://react.semantic-ui.com/images/wireframe/image.png"; // 默認圖片 URL

    // 如果有上傳文件，再執行上傳圖片的邏輯
    if (file) {
      const documentRef = firebase.firestore().collection("posts").doc();
      const fileRef = firebase.storage().ref("post-images/" + documentRef.id);
      const metadata = {
        contentType: file.type,
      };
      fileRef.put(file, metadata).then(() => {
        fileRef.getDownloadURL().then((imageUrl) => {
          documentRef
            .set({
              title: title,
              content: content,
              topic: topicName,
              // 產生當下時間類型的值
              createdAt: firebase.firestore.Timestamp.now(),
              author: {
                displayName: firebase.auth().currentUser.displayName || "",
                photoURL: firebase.auth().currentUser.photoURL || "",
                uid: firebase.auth().currentUser.uid,
                email: firebase.auth().currentUser.email,
              },
              imageUrl,
            })
            .then(() => {
              setIsLoading(false);
              navigate("/");
            });
        });
      });
    } else {
      const documentRef = firebase.firestore().collection("posts").doc();

      documentRef
        .set({
          title: title,
          content: content,
          topic: topicName,
          // 產生當下時間類型的值
          createdAt: firebase.firestore.Timestamp.now(),
          author: {
            displayName: firebase.auth().currentUser.displayName || "",
            photoURL: firebase.auth().currentUser.photoURL || "",
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
          },
          imageUrl,
        })
        .then(() => {
          setIsLoading(false);
          navigate("/");
        });
    }
  };
  return (
    <Container>
      <Header>發表文章</Header>
      <Form onSubmit={onSubmit}>
        <Image src={previewURL} size="small" floated="left" />
        {/* htmlFor 相當於 id 必須與下方的 id 相同 */}
        <Button basic as="label" htmlFor="post-image">
          上傳文章圖片
        </Button>
        <Form.Input
          type="file"
          id="post-image"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <Form.Input
          placeholder="輸入文章標題"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Form.TextArea
          placeholder="輸入文章內容"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Form.Dropdown
          placeholder="選擇文章主題"
          options={options}
          selection // 設定下拉式選單的樣式
          value={topicName} // 用 useState 控制下拉式選單
          onChange={(e, { value }) => setTopicName(value)}
        />
      </Form>
      <Button loading={isLoading} onClick={onSubmit} type="button">
        送出
      </Button>
    </Container>
  );
};

export default NewPost;
