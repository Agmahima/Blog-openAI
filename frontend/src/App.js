
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
// import { login } from './component/login/login';
// import Login from './component/Login';
import { Login } from './component/Login';
import { Main } from './component/Main';
import { BlogSummary } from './component/BlogSummary';
import BlogPage from './component/BlogPage';
import { useEffect, useState } from 'react';
// import { BlogPostPage } from './component/BlogPostPage';



function App() {
  // const user=localStorage.getItem("token");
  const [user, setUser] = useState(null);
    //  user=localStorage.getItem("token");

  useEffect(() => {
    // Fetch token from sessionStorage to check if user is logged in
    const token = sessionStorage.getItem('token');
    if (token) {
      setUser(true);  // Set user as logged in if token exists
    }
  }, []);
  return (
   <>
  
   {/* <Routes>
    {user && <Route path='/login' exact element={<Login />}/>}
    <Route path='/login' element={<Login />} />
    <Route path='/' element={<Main />} />
    <Route path='/summary' element={<BlogSummary/>}/>
    <Route exact path="/view/:id" element={ <BlogPage editable={false} />} />
    <Route exact path="/edit/:id" element={ <BlogPage editable={true} />} />
   </Routes> */}
    <Routes>
      {/* If user is not authenticated, redirect to login */}
      {!user ? (
        <Route path="*" element={<Navigate to="/login" />} />  
      ) : (
        <>
          {/* Authenticated routes */}
          <Route path='/' element={<Main />} />
          <Route path='/summary' element={<BlogSummary />} />
          <Route exact path="/view/:id" element={ <BlogPage editable={false} />} />
          <Route exact path="/edit/:id" element={ <BlogPage editable={true} />} />
        </>
      )}

      {/* Login route */}
      <Route path='/login' element={<Login />} />
    </Routes>
   </>
  );
}

export default App;
