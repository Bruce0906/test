import { Grid, Item, Image, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Topics from "../components/Topics";
import firebase from "../utils/firebase";
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
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
          <Grid.Column width={10}>
            <Item.Group>
              {posts.map((post) => {
                return (
                  <Item key={post.id} as={Link} to={"/posts/${post.id}"}>
                    <Item.Image src={post.imageUrl} />
                    <Item.Content>
                      <Item.Meta>
                        {post.author.photoUrl ? (
                          <Image
                            src={
                              post.author.photoUrl ||
                              "https://react.semantic-ui.com/images/wireframe/image.png"
                            }
                          />
                        ) : (
                          <Icon name="user circle"></Icon>
                        )}
                        {post.topic} · {post.author.displayName || "使用者"}
                      </Item.Meta>
                      <Item.Header>{post.title}</Item.Header>
                      <Item.Description>{post.content}</Item.Description>
                      <Item.Extra>留言0·按讚0</Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })}
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default HomePage;
