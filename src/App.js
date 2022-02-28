import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from "./Pages/Navigation";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import NoPage from "./Pages/NoPage";
import PostDetail from "./Pages/PostDetail";
import Users from "./Pages/Users";
import UserDetail from "./Pages/UserDetail";
import Footer from "./Pages/Footer";

function App() {
    return (
        <>
            <div className="container mb-5">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigation/>}>
                            <Route index element={<Home/>}/>
                            <Route path="blogs" element={<Blogs itemsPerPage={12}/>}/>
                            <Route path="users" element={<Users/>}/>
                            <Route path="users/:id" element={<UserDetail/>}/>
                            <Route path=":slug" element={<PostDetail/>}/>
                            <Route path="*" element={<NoPage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
            <div className="container text-center p-3">
                <Footer/>
            </div>
        </>
    );
}

export default App;
