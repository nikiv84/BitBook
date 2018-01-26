import React from "react";

const Footer = () => {
    return (
        <footer className="page-footer dark-blue lighten">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <p>
                            <a className="brand-logo" href="#/feed"><img src="../../assets/img/logo.svg" alt="BitBook logo" />it<span>Book</span></a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer-copyright dark-blue">
                <div className="container">
                    &copy; 2018 by <a className="grey-text text-lighten-4" title="GIT profile" rel="noreferrer noopener" target="_blank" href="https://github.com/nikiv84">Ivan Nikolic (nikiv84)</a>
                    <a className="grey-text text-lighten-4 right" rel="noreferrer noopener" href="http://www.bgit.rs" target="_blank">BIT</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;