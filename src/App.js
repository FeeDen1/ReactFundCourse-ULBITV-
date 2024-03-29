import React, {useEffect, useMemo, useRef, useState} from 'react';

import './styles/App.css';

import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

import PostForm from "./components/PostForm";

import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import {usePosts} from "./components/hooks/usePosts";

import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import {getPageCount} from "./utils/pages";
import {usePagination} from './components/hooks/usePagination'
import Pagination from "./components/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPages] = useState(1)
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)


  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    let totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))

  })






  const searchedAndSortedPosts = usePosts(posts, filter.sort, filter.query)


  useEffect(() => {
    fetchPosts()
  }, [page]);

  const changePage = (page) => {
    setPages(page)
  }
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }



  return (<div className="App">
    <button onClick={fetchPosts}>GET POSTS</button>
    <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
      Создать пользователя
    </MyButton>
    <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}/>
    </MyModal>

    <hr style={{margin: '15px 0'}}/>
    <PostFilter
        filter={filter}
        setFilter={setFilter}
    />
    {postError && <h1>Произошла ошибка {postError}</h1>}
    {isPostsLoading ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}><Loader/></div> :
        <PostList remove={removePost} posts={searchedAndSortedPosts} title='Список постов 1'/>
    }
    <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
    />





  </div>);
}

export default App;
