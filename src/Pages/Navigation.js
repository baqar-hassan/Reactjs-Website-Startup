import {Outlet, Link, NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="navbar-brand" to="/">
                            <img src="https://placeholder.pics/svg/150x50/888888/EEE/Logo" alt="..." height="36" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users" className="nav-link">Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/users/123456" className="nav-link">Users</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
};

export default Navigation;