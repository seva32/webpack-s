import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import getData from "./api";

function Posts() {
  const [posts, setPosts] = useState([]);

  async function fetchData() {
    const response = await getData("posts");
    setPosts(response.data);
  }
  useEffect(() => {
    fetchData();
    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  if (posts.length === 0) return <div>Loading...</div>;
  return (
    <div>
      {posts && posts.length !== 0 ? (
        <List>
          {posts.map((post) => (
            <List.Item key={post.id}>
              <List.Header>{post.title}</List.Header>A lovely luck
            </List.Item>
          ))}
        </List>
      ) : null}
    </div>
  );
}

export default Posts;
