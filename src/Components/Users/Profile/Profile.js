import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../../Containers/Spinner/Spinner'
import ShowPost from '../../Posts/ShowPost/ShowPost'
import './Profile.css'
export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            posts: [],
            isloading: false,
            error: {
                message: '',
                code: ''
            },
        }
    }

    componentDidMount() {
        let path = this.props.match.path
        let id = this.props.match.params.id

        this.setState(pre => ({
            isloading: true
        }))
        const storedData = JSON.parse(localStorage.getItem('profileData'));

        if (!storedData && path === "/profile") {
            this.props.history.push("/createProfile")
        }

        if (id) {
            Axios.get('/profile/' + id).then(data => {
                this.setState({ ...this.state.user, user: data.data.profile, isloading: false });
                return Axios.get('/profile/' + id + '/mypost')
            }).then(data => {
                this.setState({ ...this.state.posts, posts: data.data.post, isloading: false });
            }).catch(e => {
                this.setState({
                    isloading: false,
                    error: {
                        ...this.state.error, message: e.response.data.message,
                        code: e.response.status
                    }
                });

            })
        }
        else {
            let id
            Axios.get('/profile/viewprofile').then(data => {
                id = data.data.profile.username
                this.setState({ ...this.state.user, user: data.data.profile, isloading: false });

                Axios.get('/profile/' + id + '/mypost').then(data => {
                    this.setState({ ...this.state.posts, posts: data.data.post, isloading: false });
                })
            }).catch(e => {
                this.setState({
                    isloading: false,
                    error: {
                        ...this.state.error, message: e.response.data.message,
                        code: e.response.status
                    }
                });
            })


        }
    }

    render() {
        const storedData = JSON.parse(localStorage.getItem('profileData'));
        let path = this.props.match.path
        let isLoading
        let iserror

        if (this.state.isloading) {

            isLoading = (
                <>
                    <div className="container loading">
                        <div className="mar-20">
                            <Spinner />
                        </div>
                    </div>
                </>
            )
        }

        if (this.state.error.code) {
            iserror = (
                <>
                    <div className="container error container-short">
                        <div className="mar-20">
                            <h5>Error Code - {this.state.error.code}</h5>
                            <h4>Error Message - {this.state.error.message}</h4>
                        </div>
                    </div>
                </>
            )
        }

        let fetchedposts
        if (this.state.posts) {
            fetchedposts = this.state.posts.map((post, index) => (
                <ShowPost key={index} {...post} {...index} />
            ))
        }
        let profile = this.state.user

        return (
            <>
                {isLoading}
                {iserror}
                <div className="container py-5 container-short">
                    <div className="row profile">
                        <div className="col-md-8 col-xs-12 order-2 order-lg-1">
                            <h2 className="text-black font-weight-light mb-4">{profile.username}</h2>
                            {(!storedData && path !== "/profile") ? null : <Link to={"/profile/edit/" + profile._id}  >Edit Profile</Link>}
                            <p>{profile.bio}</p>
                        </div>

                        <div className="col-md-4 col-xs-12 order-1 order-lg-2">
                            <img className="img-fluid w-50 rounded-circle mb-3"
                                src={profile.imagePath} alt={profile.username}></img>
                        </div>
                    </div>

                </div>

                <div className="container py-5 container-short">
                    <h2 className="font-weight-light text-black">{profile.username}'s Posts</h2>
                    <hr />
                    {this.state.posts.length === 0 ? <h2 className="mt-5 text-center">No Posts Found</h2> : null}
                    <div className="row">
                        {fetchedposts}
                    </div>

                </div>
            </>
        )
    }
}

export default Profile
