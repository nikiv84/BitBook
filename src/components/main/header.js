import React from "react";

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <span className="brand-logo">Logo</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Settings</li>
                </ul>
            </div>
        </nav>
    );

};
export default Header;