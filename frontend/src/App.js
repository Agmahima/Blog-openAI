
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import { login } from './component/login/login';
// import Login from './component/Login';
import { Login } from './component/Login';
import { Main } from './component/Main';
import { BlogSummary } from './component/BlogSummary';
import BlogPage from './component/BlogPage';
// import { BlogPostPage } from './component/BlogPostPage';



function App() {
  const user=localStorage.getItem("token");
  return (
   <>
  
   <Routes>
    {user && <Route path='/' exact element={<Main />}/>}
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Main />} />
    <Route path='/summary' element={<BlogSummary/>}/>
    <Route exact path="/view/:id" element={ <BlogPage editable={false} />} />
    <Route exact path="/edit/:id" element={ <BlogPage editable={true} />} />
   </Routes>
   </>
  );
}

export default App;
