import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Link} from "react-router-dom";
import Placeholders from "./Placeholders";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";

class PostsListing extends React.Component {

    static propTypes = {
        posts: PropTypes.array,
        placeholderCount: PropTypes.number,
        showPlaceholder: PropTypes.bool
    };

    static defaultProps = {
        posts: [],
        placeholderCount: 0,
        showPlaceholder: false
    }

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.showPlaceholder
                    ? <div className="row">
                        <Placeholders repeat={this.props.placeholderCount} show={this.props.showPlaceholder}>
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
                    : <div className="row">
                        {this.props.posts.map(post => (
                            <div className="card col-3 m-2 p-0" style={{width: "18rem"}} key={post.id}>
                                <LazyLoadImage onError={(e) => this.imageError(e)} effect="blur"
                                               src={`https://picsum.photos/id/${post.id}/286/176`}
                                               height={176}
                                               className="card-img-top" alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <Link to={`/${post.id}`}>Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </>
        );
    }
}

export default PostsListing;
