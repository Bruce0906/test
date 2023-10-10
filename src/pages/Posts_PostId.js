import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Header,
  Image,
  Segment,
  Icon,
} from "semantic-ui-react";
import Topics from "../components/Topics";
import { useParams } from "react-router-dom";
import firebase from "../utils/firebase";
import "firebase/compat/firestore";
const Posts_PostId = () => {
  const { postId } = useParams();

  default_displayName = "DefaultName";
  user_post_displayName = "HAHAHA";

  default_url = "http://123fd";
  user_post_url = "http://abc";

  const [post, setPost] = useState({
    author: {
      photoUrl: "",
      displayName: "",
    },
  });

  useEffect(() => {
    // doc:集合底下的哪個文件
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        setPost(data);
      });
  }, []);

  return (
    <Container>
      <Grid>
        <Grid.Row>
          {/* 切成三等分 */}
          <Grid.Column width={3}>
            <Topics />
          </Grid.Column>
          <Grid.Column width={10}></Grid.Column>
          <Image src={post.author?.photoUrl ? post.author.photoUrl : ""} />
          {post.author?.displayName ? post.author.displayName : "No username"}
          {post?.author?.displayName?.subName
            ? console.log("subName is not null")
            : console.log("subName is null")}

          <Header>
            {post.title}
            <Header.Subheader>
              {post.topic}·{post.createdAt?.toDate().toLocaleDateString()}
            </Header.Subheader>
          </Header>
          <Image src={post.imageUrl} />
          {/* 呈現文章段落 */}
          <Segment basic vertical>
            {post.content}
          </Segment>
          <Segment basic vertical>
            留言0·按讚0·
            <Icon name="thumbs up outline" color="grey" />·
            <Icon name="bookmark outline" color="grey" />
          </Segment>
          <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Posts_PostId;
