import Axios from 'axios';
import React, { Component } from 'react'
import ImageUpload from '../../../Containers/ImageUpload/ImageUpload'
import Spinner from '../../../Containers/Spinner/Spinner';
export class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Post: {
                id: '',
                title: '',
                content: '',
                imagePath: '',
                created: ''
            },
            error: {
                message: '',
                code: ''
            },
            isloading: false,

            haserror: false,
            errors: {
                title: '',
                content: '',
                imagePath: '',
            }
        }
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }

    componentDidMount() {

        let path = this.props.match.path
        let id = this.props.match.params.id
        const storedData = JSON.parse(localStorage.getItem('profileData'));
        if (!storedData && path == "/create") {
                this.props.history.push("/createProfile")
        }
        if (path === "/edit/:id") {
            this.setState(pre => ({
                isloading: true
            }))

            Axios.get("/posts/" + id).then(data => {
                let post = data.data
                this.setState({
                    isloading: false,
                    Post: { ...this.state.Post, id: post._id, title: post.title, content: post.content, imagePath: post.imagePath }
                });
            })
                .catch(e => {
                    this.setState({
                        isloading: false,
                        error: {
                            ...this.state.error, message: e.response.data.message,
                            code: e.response.status
                        }
                    });
                })
        }
        console.log(this.state)
    }

    imageHandler = (id, value, isValid) => {
        this.setState({ Post: { ...this.state.Post, [id]: value } }, () => {

        });

    }

    myChangeHandler = (event) => {
        let nam = event.target?.name;
        let val = event.target?.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'title':
                if (value.length > 0) {
                    errors.title =
                        value.length < 6
                            ? 'Title   must be 5 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.title =
                        value.length === 0
                            ? 'title is required!'
                            : '';
                }
                break;

            case 'content':
                if (value.length > 0) {
                    errors.content =
                        value.length < 20
                            ? 'Content  must be 20 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.content =
                        value.length === 0
                            ? 'Content is required!'
                            : '';
                }
                break;
            case 'imagePath':
                if (value.length === 0) {
                    errors.imagePath =
                        value.length === 0
                            ? 'Image is required!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ ...errors, Post: { ...this.state.Post, [nam]: val } }, () => {

        });
    }

    mySubmitHandler(e) {
        this.setState(pre => ({
            isloading: true
        }))
        let path = this.props.match.path
        let id = this.props.match.params.id
        let date = new Date()
        e.preventDefault()
        let formData;
        if (typeof (this.state.Post.imagePath) === "object") {
            formData = new FormData();
            formData.append('id', this.state.Post.id);
            formData.append('title', this.state.Post.title);
            formData.append('content', this.state.Post.content);
            formData.append('image', this.state.Post.imagePath, this.state.Post.title);
            formData.append('postDate', date.toString());
        }
        else {
            formData = {
                "id": this.state.Post.id,
                'title': this.state.Post.title,
                'content': this.state.Post.content,
                'image': this.state.Post.imagePath,
                'postDate': date.toString()
            }
        }

        if (path === "/edit/:id") {
            Axios.put("/posts/" + id, formData).then(data => {
                this.setState(pre => ({
                    isloading: false
                }))
                this.props.history.push('/')
            })
                .catch(e => {
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
            Axios.post("/posts", formData).then(data => {
                this.setState(pre => ({
                    isloading: false
                }))
                this.props.history.push('/')
            })
                .catch(e => {
                    this.setState({
                        isloading: false,
                        error: {
                            ...this.state.error, message: e.response.data.message,
                            code: e.response.status
                        }
                    });
                })
        }
        this.setState({
            Post: { ...this.state.Post, title: '', content: '', imagePath: '' }
        });
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

        return (<>

            {isLoading}
            {iserror}
            <div className="container container-short">
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                <h3 className="text-center mb-3">Create Post</h3>
                    <div className="form-group">
                        <label htmlFor="title">Title </label>
                        <input
                            type='title'
                            name='title'
                            value={this.state.Post.title}
                            className={"form-control " + (this.state.errors.title ? 'is-invalid' : '')}
                            placeholder="Enter the title"
                            required
                            onChange={this.myChangeHandler}
                        />

                        {this.state.errors.title.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.title}</span></div>}

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Description </label>
                        <textarea
                            type='text'
                            name='content'
                            rows="4"
                            value={this.state.Post.content}
                            className={"form-control " + (this.state.errors.content ? 'is-invalid' : '')}
                            placeholder="Enter the  description"
                            required="required"
                            onChange={this.myChangeHandler}
                        />

                        {this.state.errors.content.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.content}</span></div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Image </label>
                        <ImageUpload
                            id="imagePath"
                            name="imagePath"
                            onInput={this.imageHandler}
                            value={this.state.Post.imagePath}
                            errorText="Please provide an image."
                        />
                        {this.state.errors.imagePath.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.imagePath}</span></div>}
                    </div>
                    <div className="form-group">
                        <button style={{ marginRight: '15px' }}
                            type='submit'
                            className="btn btn-primary"
                            disabled={this.state.Post.title && this.state.Post.content && this.state.Post.imagePath
                                ? '' : 'disabled'}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
        )
    }
}

export default CreatePost
