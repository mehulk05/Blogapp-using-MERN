import Axios from 'axios'
import React, { Component } from 'react'
import Spinner from '../../../Containers/Spinner/Spinner'
import ShowPost from '../ShowPost/ShowPost'

export class Mypost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            error: {
                message: '',
                code: ''
            },
            isloading: false,
        }
    }

    componentDidMount() {
        this.setState(pre => ({
            isloading: true
        }))
        Axios.get("/posts/mypost").then(data => {

            this.setState({ ...this.state.posts, posts: data.data.posts, isloading: false });
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

    render() {
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
        return (
            <>
                {isLoading}
                {iserror}
                <div className="container hero py-5">
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                            {
                                this.state.posts.length === 0 ? <h2 className="text-center">No Posts Found</h2> : null
                            }
                            <div className="row">
                                {fetchedposts}
                            </div>
                        </div>


                    </div>
                </div>
            </>

        )
    }
}

export default Mypost
