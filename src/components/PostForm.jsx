import { useState } from "react";
import { MyButton } from "./UI/button/MyButton";
import { MyInput } from "./UI/input/MyInput";

const newPost = { title: '', body: ''}

export const PostForm = ({
  create
}) => {
  const [post, setPost] = useState(newPost);

  const addNewPost = (e) => {
    e.preventDefault();

    if (!post.title && !post.body) {
      return;
    }

    create({...post, id: Date.now()})
    setPost(newPost);
  }

  return (
    <form>
        <MyInput
          type="text"
          placeholder="Название поста"
          value={post.title}
          onChange={(e) => setPost({...post, title: e.target.value})}
        />
        <MyInput
          type="text" 
          placeholder="Описание поста"
          value={post.body}
          onChange={(e) => setPost({...post, body: e.target.value})}
        />
        <MyButton
          onClick={addNewPost}
        >Добавить пост</MyButton>
    </form>
  );
};