import React, { useEffect, useState } from "react";
import firebase from "../utils/firebase";
import "firebase/compat/firestore";
import { List } from "semantic-ui-react";
const Topics = () => {
  const [topics, setTopics] = useState([]);
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
  return (
    <List animated selection>
      {topics.map((topic) => {
        return <List.Item key={topic.name}>{topic.name}</List.Item>;
      })}
    </List>
  );
};

export default Topics;
