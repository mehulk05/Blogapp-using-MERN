import React from 'react'

function SocialMediaHorizontal() {
    return (
        <div className="mobile-only">
            <div className="footer-icons">
                <ul className="navbar-nav ">
                    <li className="nav-item inline-block">
                        <a href="https://github.com/mehulk05" aria-label="Github" className="nav-link text-github">
                            <i className="fa fa-github"></i>
                        </a>
                    </li>
                    <li className="nav-item inline-block">
                        <a href="https://medium.com/@mehulkothari05" aria-label="Medium" className="nav-link">
                            <span>
                                <img className="img-circle medium-icon" width="24" alt="" src="https://seeklogo.com/images/M/medium-logo-93CDCF6451-seeklogo.com.png" />
                            </span>
                        </a>
                    </li>
                    <li className="nav-item inline-block">
                        <a href="https://www.instagram.com/mehul_kothari05/" aria-label="Insagram" className="nav-link">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>

                    <li className="nav-item inline-block">
                        <a href="https://www.linkedin.com/in/mehul-kothari-765868126/" aria-label="LinkedIn" className="nav-link">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default SocialMediaHorizontal
