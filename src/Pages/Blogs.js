import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import {fetchData} from "../Helpers/fetchData";
import PostsListing from "../Components/PostsListing";

// Example items, to simulate fetching from another resources.
const items = [...Array(100).keys()];

function Blogs ({ itemsPerPage }) {

    // We start with an empty list of items.
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = "Blogs";
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setPageCount(Math.ceil(100 / itemsPerPage));
        setIsLoaded(false);

        const fetchPosts = (start) => {
            fetchData(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${itemsPerPage}`, (status, response) => {
                setIsLoaded(status);
                setPosts(response);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });
        };

        fetchPosts(itemOffset, itemsPerPage);
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );

        setItemOffset(newOffset);
    };

    return (
        <>
            {error && <div>Error: {error.message}</div>}

            <PostsListing posts={posts} placeholderCount={itemsPerPage} showPlaceholder={!isLoaded} />

            <nav aria-label="Page navigation">
                <ReactPaginate
                    className="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"

                    previousClassName="page-item"
                    previousLinkClassName="page-link"

                    nextClassName="page-item"
                    nextLinkClassName="page-link"

                    breakClassName="page-item"
                    breakLinkClassName="page-link"

                    activeClassName="active"

                    onPageChange={handlePageClick}

                    pageRangeDisplayed={100}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    breakLabel="..."
                    nextLabel="next >"
                    renderOnZeroPageCount={null} />
            </nav>
        </>
    );
};

export default Blogs;