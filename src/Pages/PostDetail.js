import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {fetchData} from "../Helpers/fetchData";
import ContentLoader from "react-content-loader";

/*class PostDetail extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        // const { slug } = this.state.params();
        // console.log(slug);
        this.state = {
            postId: 0,
            error: null,
            isLoaded: false,
            posts: []
        };
    }

    componentDidMountx() {
        fetch("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10")
            .then(res => res.json())
            .then(
                (result) => {
                    setTimeout(()=> {
                        this.setState({
                            isLoaded: true,
                            posts: result
                        });
                    },1000);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <h1>PostDetail Articles</h1>
        );
    }
}*/


function PostDetail() {
    const {slug} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);

    const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
    const [comments, setComments] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        const fetchPosts = (slug) => {
            fetchData(`https://jsonplaceholder.typicode.com/posts/${slug}`, (status, response) => {
                setIsLoaded(status);
                setPost(response);
                document.title = response.title;
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });
        };
        
        const fetchComments = (slug) => {
            fetchData(`https://jsonplaceholder.typicode.com/posts/${slug}/comments`, (status, response) => {
                setIsCommentsLoaded(status);
                setComments(response);
            }, (error) => {
                setIsCommentsLoaded(true);
                setError(error);
            });
        };

        fetchPosts(slug);
        fetchComments(slug);
    }, [slug]);

    return (
        <>
            {error && <div>Error: {error.message}</div>}

            {!isLoaded &&
                <ContentLoader
                    viewBox="0 0 100% 100%"
                    height="650"
                    width="100%"
                    backgroundColor="#ebeaea"
                    foregroundColor="#dbdbdb">
                    <rect x="0" y="0" rx="5" ry="5" width="650" height="400"/>
                    <rect x="0" y="440" rx="5" ry="5" width="100%" height="30"/>
                    <rect x="0" y="490" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="510" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="530" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="550" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="570" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="590" rx="5" ry="5" width="100%" height="10"/>
                    <rect x="0" y="610" rx="5" ry="5" width="50%" height="10"/>
                </ContentLoader>
            }

            {(isLoaded && typeof post.title != "undefined") &&
                <div className="row">
                    <LazyLoadImage effect="blur" src={`https://picsum.photos/id/${post.id}/650/400`} width={650}
                                   height={400} className="img-responsive img-thumbnail img-fluid"/>
                    <h3 className="text-capitalize">{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            }

            {!isCommentsLoaded &&
                <ContentLoader
                    viewBox="0 0 100% 100%"
                    height="650"
                    width="100%"
                    backgroundColor="#ebeaea"
                    foregroundColor="#dbdbdb">
                    <rect x="0" y="0" rx="5" ry="5" width="30%" height="30"/>
                    <rect x="0" y="50" rx="100%" ry="100%" width="50" height="50"/>
                    <rect x="0" y="110" rx="5" ry="5" width="200" height="20"/>
                    <rect x="0" y="140" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="160" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="180" rx="5" ry="5" width="25%" height="10"/>

                    <rect x="0" y="210" rx="100%" ry="100%" width="50" height="50"/>
                    <rect x="0" y="270" rx="5" ry="5" width="200" height="20"/>
                    <rect x="0" y="300" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="320" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="340" rx="5" ry="5" width="25%" height="10"/>

                    <rect x="0" y="370" rx="100%" ry="100%" width="50" height="50"/>
                    <rect x="0" y="430" rx="5" ry="5" width="200" height="20"/>
                    <rect x="0" y="460" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="480" rx="5" ry="5" width="50%" height="10"/>
                    <rect x="0" y="500" rx="5" ry="5" width="25%" height="10"/>
                </ContentLoader>
            }
            {isCommentsLoaded && comments.length > 0 &&
                <div className="row">
                    <div className="col-sm-5 col-md-6 col-12 pb-4">
                        <h1>Comments</h1>
                        {comments.map(comment => (
                            <div className="comment mt-4 text-justify float-left" key={comment.id}>
                                <LazyLoadImage src={`https://picsum.photos/id/${500 + comment.id}/100/100`}
                                               alt="" className="rounded-circle" width="40"
                                               height="40" effect="blur"/>
                                <h4>{comment.name}</h4>
                                <span>{comment.email}</span> <br/>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {(isLoaded && typeof post.title == "undefined") ? "T" : "F"}
            {(isLoaded && typeof post.title == "undefined") &&
                <Navigate to="/"/>
            }

        </>
    );
}

export default PostDetail;