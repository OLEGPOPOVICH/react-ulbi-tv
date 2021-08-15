import { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import { PostFilter } from "../components/PostFilter";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
import { MyButton } from "../components/UI/button/MyButton";
import { Loader } from "../components/UI/loader/Loader";
import { MyModal } from "../components/UI/myModal/MyModal";
import { Pagination } from "../components/UI/pagination/Pagination";
import { MySelect } from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { usePosts } from "../hooks/usePosts";
import { getPageCount } from "../utils/pages";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [isPostsLoading, postError, fetchPosts] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);

    const totalCount = response.headers['x-total-count'];

    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const changePage = (page) => {
    setPage(page);
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = ({id}) => {
    setPosts(posts.filter((post) => post.id !== id ));
  }

  return (
    <div className="App">
      <MyButton
        onClick={() => setModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 15, name: '15'},
          {value: 20, name: '20'},
          {value: -1, name: 'Все'},
        ]}
      />
      {postError && <h1 className="txt-center">Произошла ошибка {postError}</h1>}
      <PostList posts={sortedAndSearchedPosts} title="Список постов" remove={removePost} />
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
      {isPostsLoading &&
        <div
          style={{display: 'flex', justifyContent: 'center', marginTop: 50}}
        ><Loader /></div>
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;
