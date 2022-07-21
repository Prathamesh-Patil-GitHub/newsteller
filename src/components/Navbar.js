// *****************************
// @author - Prathamesh Patil  **
// ****************************

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

/*We have made Navbar as function component intentionally to use the useLocation hook from the react-router-dom library,
because the useLocation hook can be only used inside function components of React*/
export default function Navbar() {
    const location = useLocation();

    const logout = function(){
        localStorage.clear();
        window.location.pathname = "/login"; 
    };
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NewsTeller</Link>
                    <button className="navbar-toggler" onClick={()=>{document.body.style.zoom=0.8;}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/business" ? "active" : ""}`} to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/entertainment" ? "active" : ""}`} to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/health" ? "active" : ""}`} to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/science" ? "active" : ""}`} to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/technology" ? "active" : ""}`} to="/technology">Technology</Link>
                            </li>
                            {localStorage.getItem("auth_token")!=null && <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/saved-news" ? "active" : ""}`} to="/saved-news">Saved News</Link>
                            </li>}
                        </ul>
                        { localStorage.getItem("auth_token") == null && <div className="form-inline my-2 my-lg-0">
                        <Link to="/signup"><button className="btn btn-outline-light mx-2 my-2 my-sm-0">Sign Up</button></Link>
                            <Link to="/login"><button className="btn btn-outline-light mx-2 my-2 my-sm-0">Log in</button></Link>
                        </div>}
                        {
                            localStorage.getItem("auth_token") != null && 
                            <div>
                                <small className='text-light mx-1'>{localStorage.getItem("name")}</small>
                                <button className="btn btn-outline-danger mx-2 my-2 my-sm-0" onClick={()=>{logout();}}>Log out</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
