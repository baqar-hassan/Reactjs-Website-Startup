import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {fetchData} from "../Helpers/fetchData";
import Placeholders from "../Components/Placeholders";
import ContentLoader from "react-content-loader";

const Users = () => {
    const [error, setError] = useState(null);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        document.title = "Users";

        const fetchUsers = () => {
            fetchData('https://jsonplaceholder.typicode.com/users', (status, response) => {
                setIsUsersLoaded(true);
                setUsers(response);
            }, (error) => {
                console.log("error", error);
                setIsUsersLoaded(true);
                setError(error);
            });
        };

        fetchUsers();
    }, []);

    return (
        <>
            {error && <div>Error: {error.message}</div>}

            <div className="row">
                <Placeholders repeat={12} show={!isUsersLoaded}>
                    <div className="card col-3 m-2 p-0" style={{width: "18rem"}}>
                        <ContentLoader
                            viewBox="0 0 288 338"
                            backgroundColor="#ebeaea"
                            foregroundColor="#dbdbdb">
                            <rect x="10" y="185" rx="4" ry="4" width="271" height="10"/>
                            <rect x="10" y="205" rx="4" ry="4" width="271" height="10"/>
                            <rect x="10" y="225" rx="4" ry="4" width="271" height="10"/>
                            <rect x="10" y="245" rx="4" ry="4" width="150" height="10"/>
                            <rect x="10" y="290" rx="4" ry="4" width="150" height="15"/>
                            <rect x="0" y="0" rx="0" ry="0" width="288" height="177"/>
                        </ContentLoader>
                    </div>
                </Placeholders>
            </div>

            {isUsersLoaded &&
                <div className="row">
                    {users.map(user => (
                        <div className="col-lg-3 col-sm-6 mb-4" key={user.id}>

                            <div className="card hovercard">
                                <div className="avatar">
                                    <LazyLoadImage className="img-fluid w-100" effect="blur"
                                                   src={`https://placekitten.com/304/200?image=${user.id}`}/>
                                </div>
                                <div className="info p-2">
                                    <div className="title">
                                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    </div>
                                    <div className="desc">{user.email}</div>
                                    <div className="desc">{user.phone}</div>
                                    <div className="desc">{user.website}</div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default Users;