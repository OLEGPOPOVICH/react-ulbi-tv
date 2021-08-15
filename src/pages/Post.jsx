import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsService from "../API/CommentsService";
import PostService from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";

export const Post = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, error, fetchPostById] = useFetching(async (id) => {
    const { data } = await PostService.getById(id);
    setPost(data[0]);
  })
  const [isLoadingComments, errorComments, fetchComments] = useFetching(async (id) => {
    const { data } = await CommentsService.getAll(id);
    setComments(data);
  })

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id)
  }, []);

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    <div>{error}</div>
  }

  return (
    <div>
      <h1 className="txt-center">{post.id} {post.title}</h1>
      <div>
        <h2>Комментарии</h2>
        {isLoadingComments 
          ? <Loader />
          : <div>
              {comments.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    style={{marginTop: 15}}
                  >
                    <h5>{comment.email}</h5>
                    <div>{comment.body}</div>
                  </div>
                );
              })}
            </div>
        }
      </div>
    </div>
  );
};