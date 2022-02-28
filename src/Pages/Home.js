import React from "react";
import {fetchData} from "../Helpers/fetchData";
import PostsListing from "../Components/PostsListing";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: []
        };
    }

    componentDidMount() {
        fetchData('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=12', (status, response) => {
            this.setState({
                isLoaded: status,
                posts: response
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }, false);
        document.title = "Home";
    }

    imageError(e) {
        console.log("imageError ", e);
    }

    render() {
        const {error, isLoaded, posts} = this.state;

        return (
            <>

                {error && <div>Error: {error.message}</div>}

                <PostsListing posts={posts} placeholderCount={12} showPlaceholder={!isLoaded} />
            </>
        );
    }
}

export default Home;