import { PostItem } from "./PostItem"
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const PostList = ({
  posts,
  title,
  remove
}) => {

  if (!posts.length) {
    return <h1 className="txt-center">Постов не найдено</h1>
  }

  return (
    <>
      <h1 className="txt-center">{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => {
          return (
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
            >
              <PostItem post={post} remove={remove} />
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </>
  );
};