import React from 'react'
import { Link } from 'react-router-dom'
import ToText from '../../../utils/ToText'
import './ShowUser.css'

function ShowUser(props) {
    return (
        <div className="featured-user">
            <ul className="list-unstyled">
                <li>
                    <Link className="d-flex align-items-center" to={'/public/' + props.username}>
                        <img src={props.imagePath} className="img-fluid mr-2" alt={props.username} />
                    </Link>
                    <div className="podcaster">
                        <Link to={'/public/' + props.username}>
                            <span className="d-block username">{props.username}</span>
                            <span className="small">
                                {`${ToText(
                                    props.bio.substring(0, 80)
                                )}...`}
                            </span>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ShowUser
