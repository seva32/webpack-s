import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import Loader from "./Loader";
import getData from "./api";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchData() {
    try {
      const response = await getData("posts");
      setErrorMessage("");
      return response;
    } catch (e) {
      setErrorMessage("No posts to show...");
      return [];
    }
  }
  useEffect(() => {
    fetchData().then((res) => {
      setPosts(res.data);
    });

    return () => {
      console.warn("Posts unmounted");
    };
  }, [setPosts]);

  if (errorMessage.length !== 0) return <div>{errorMessage}</div>;

  if (posts && posts.length !== 0) {
    return (
      <div>
        <List>
          {posts.map((post) => (
            <List.Item key={post.id}>
              <List.Header>{post.title}</List.Header>A love t
            </List.Item>
          ))}
        </List>
      </div>
    );
  }

  return <Loader />;
}

export default Posts;
