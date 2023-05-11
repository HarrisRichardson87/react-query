import { useState } from 'react';
import './App.css';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from 'react-hook-form';
import PostList1 from './PostList1';
import PostList2 from './PostList2';
import Post from './Post';
import CreatePost from './CreatePost';
import PostListPaginated from './PostListPaginated';
import PostPageInfinite from './PostPageInfinite';
import { getPosts, getPost, createPost } from './api/posts';
import { getUser } from './api/users';
export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1/>);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const queryClient = useQueryClient();

  const handleOnClick = (id) => {
    setCurrentPage(<Post id={id} />);
  }

  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery(["post", 1 ], () => getPost(1));
    queryClient.prefetchQuery(["users",1 ], () => getUser(1));
  }

  return (
    <div className="App">
      <button onClick={() => setCurrentPage(<PostList1 onClick={handleOnClick} />)}>PostList1</button>
      <button onClick={() => setCurrentPage(<PostList2 onClick={handleOnClick} />)}>PostList2</button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={1} />)}>Post</button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>CreatePost</button>
      <button onClick={() => setCurrentPage(<PostListPaginated onClick={handleOnClick} />)}>Paginated</button>
      <button onClick={() => setCurrentPage(<PostPageInfinite  onClick={handleOnClick} />)}>Infinite</button>
      {currentPage}
    </div>
  );
}
