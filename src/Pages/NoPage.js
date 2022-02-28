import React from "react";
import {Link} from "react-router-dom";

const NoPage = () => {
    return (
        <>
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </>
    );
};

export default NoPage;