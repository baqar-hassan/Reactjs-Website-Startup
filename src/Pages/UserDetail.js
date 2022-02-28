import React, {useEffect, useState} from "react";
import {useParams, Navigate} from "react-router-dom";
// get our fontawesome imports
import "../scss/UserDetail.scss";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {fetchData} from "../Helpers/fetchData";
import PostsListing from "../Components/PostsListing";
import ContentLoader from "react-content-loader";

const UserDetail = () => {

    const [error, setError] = useState(null);
    const [UserLoaded, setIsUserLoaded] = useState(false);
    const [user, setUser] = useState([]);

    const [PostsLoaded, setIsPostsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    const [isTodosLoaded, setIsTodosLoaded] = useState(false);
    const [todos, setTodos] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const fetchUser = (id) => {
            fetchData(`https://jsonplaceholder.typicode.com/users/${id}`, (status, response) => {
                setUser(response);
                setIsUserLoaded(true);

                document.title = "About" + response.name;
            }, (error) => {
                setIsUserLoaded(true);
                setError(error);
            });
        }

        const fetchUserPosts = (id) => {
            fetchData(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, (status, response) => {
                setPosts(response);
                setIsPostsLoaded(true);
            }, (error) => {
                setIsPostsLoaded(true);
                setError(error);
            });
        }

        const fetchUserTodo = (id) => {
            fetchData(`https://jsonplaceholder.typicode.com/users/${id}/todos`, (status, response) => {
                setTodos(response);
                setIsTodosLoaded(true);
            }, (error) => {
                setIsTodosLoaded(true);
                setError(error);
            });
        }
        fetchUser(id);
        fetchUserPosts(id);
        fetchUserTodo(id);
    }, [id])

    return (
        <>
            {error && <div>Error: {error.message}</div>}

            {!UserLoaded &&
                <section className="section about-section" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-6">
                                <div className="about-text go-to">
                                    <ContentLoader
                                        viewBox="0 0 100% 100%"
                                        height={486}
                                        width="100%"
                                        backgroundColor="#ebeaea"
                                        foregroundColor="#dbdbdb">
                                        <rect x="0" y="0" rx="5" ry="5" width="100%" height="20"/>
                                        <rect x="0" y="30" rx="5" ry="5" width="100%" height="20"/>
                                        <rect x="0" y="70" rx="5" ry="5" width="100%" height="10"/>
                                        <rect x="0" y="90" rx="5" ry="5" width="100%" height="10"/>
                                        <rect x="0" y="110" rx="5" ry="5" width="100%" height="10"/>
                                        <rect x="0" y="130" rx="5" ry="5" width="100%" height="10"/>
                                        <rect x="0" y="150" rx="5" ry="5" width="50%" height="10"/>

                                        <rect x="0" y="200" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="0" y="220" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="200" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="220" rx="5" ry="5" width="40%" height="10"/>

                                        <rect x="0" y="260" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="0" y="280" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="260" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="280" rx="5" ry="5" width="40%" height="10"/>

                                        <rect x="0" y="320" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="0" y="340" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="320" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="340" rx="5" ry="5" width="40%" height="10"/>

                                        <rect x="0" y="380" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="0" y="400" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="380" rx="5" ry="5" width="40%" height="10"/>
                                        <rect x="50%" y="400" rx="5" ry="5" width="40%" height="10"/>
                                    </ContentLoader>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-avatar text-center">
                                    <ContentLoader
                                        viewBox="0 0 100% 100%"
                                        height={400}
                                        width={400}
                                        backgroundColor="#ebeaea"
                                        foregroundColor="#dbdbdb">
                                        <rect x="15" y="10" rx="100%" ry="100%" width="315" height="315"/>
                                    </ContentLoader>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {(UserLoaded && typeof user.name == "undefined") &&
                <Navigate to="/users" />
            }

            {(UserLoaded && typeof user.name != "undefined") &&
                <section className="section about-section" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-6">
                                <div className="about-text go-to">
                                    <h3 className="dark-color">About <span className="theme-color">{user.name}</span>
                                    </h3>
                                    <h6 className="theme-color lead">A {user.company.catchPhrase} in {user.company.name}</h6>
                                    <p>I <mark>{user.company.bs}</mark> services for customers of all sizes,
                                        specializing
                                        in creating stylish, modern websites, web services and online stores. My passion
                                        is
                                        to design digital user experiences through the bold interface and meaningful
                                        interactions.
                                    </p>
                                    <div className="row about-list">
                                        <div className="col-md-6">
                                            <div className="media">
                                                <label>Birthday</label>
                                                <p>4th april 1998</p>
                                            </div>
                                            <div className="media">
                                                <label>Username</label>
                                                <p>{user.username}</p>
                                            </div>
                                            <div className="media">
                                                <label>Residence</label>
                                                <p>{user.address.city}</p>
                                            </div>
                                            <div className="media">
                                                <label>Address</label>
                                                <p>{user.address.suite}, {user.address.street} {user.address.zipcode}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="media">
                                                <label>E-mail</label>
                                                <p>{user.email}</p>
                                            </div>
                                            <div className="media">
                                                <label>Phone</label>
                                                <p>{user.phone}</p>
                                            </div>
                                            <div className="media">
                                                <label>Website</label>
                                                <p>{user.website}</p>
                                            </div>
                                            <div className="media">
                                                <label>GEO</label>
                                                <p>{user.address.geo.lat} - {user.address.geo.lng}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-avatar text-center">
                                    <LazyLoadImage effect="blur"
                                                   className="img-fluid rounded-circle img-thumbnail"
                                                   src={`https://placekitten.com/315/315?image=${user.id}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }

            <h1>Posts</h1>
            <PostsListing posts={posts} placeholderCount={12} showPlaceholder={!PostsLoaded}/>

            <h1>Todos</h1>
            {!isTodosLoaded &&
                <div className="bg-white col-12">
                    <ContentLoader
                        width="100%"
                        height="600"
                        backgroundColor="#ebeaea"
                        foregroundColor="#dbdbdb">
                        <rect x="15" y="0" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="5" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="40" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="45" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="80" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="85" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="120" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="125" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="160" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="165" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="200" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="205" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="200" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="205" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="240" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="245" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="280" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="285" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="320" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="325" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="360" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="365" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="400" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="405" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="440" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="445" rx="1" ry="1" width="80%" height="20"/>
                        <rect x="15" y="480" rx="50" ry="50" width="30" height="30"/>
                        <rect x="60" y="485" rx="1" ry="1" width="80%" height="20"/>
                    </ContentLoader>
                </div>
            }

            {isTodosLoaded &&
                <div className="p-3 bg-white">
                    {todos.map(todo => (
                        <div className="d-flex align-items-center" key={todo.id}>
                            <label>
                                <input type="checkbox" readOnly checked={todo.completed}
                                       className="option-input radio"/>
                                &nbsp;
                                <span className="label-text"
                                      style={{"textDecorationLine": todo.completed ? "line-through" : "none"}}
                                      title={todo.completed ? "Completed" : ""}>
                                <b>#{todo.id}</b>&nbsp;
                                    {todo.title}
                            </span>
                            </label>
                        </div>
                    ))}
                </div>
            }


        </>
    );
};

export default UserDetail;