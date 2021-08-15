import { useHistory } from "react-router-dom";
import { MyButton } from "./UI/button/MyButton";

export const PostItem = ({
  post,
  remove
}) => {
  const history = useHistory();

  return (
    <div className="post">
      <div className="post_content">
        <strong>{post.id}. {post.title}</strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
        <MyButton onClick={() => history.push(`/posts/${post.id}`)}>Открыть</MyButton>
      </div>
    </div>
  );
};