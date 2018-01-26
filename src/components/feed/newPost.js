import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { validationService } from "../../service/validationService";
import PropTypes from "prop-types";
import { AVATAR_PLACEHOLDER } from "../../constants";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    }
};

export default class NewPost extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            textModalOpen: false,
            imageModalOpen: false,
            videoModalOpen: false,
            text: "",
            imageUrl: "",
            videoUrl: "",
            display: "none",
            errors: {
                allFields: "",
                link: ""
            },
            file: null
        };
        this.bindEventHandlers();

    }

    bindEventHandlers() {
        this.activateTextModal = this.activateTextModal.bind(this);
        this.activateImageModal = this.activateImageModal.bind(this);
        this.activateVideoModal = this.activateVideoModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveTextPost = this.saveTextPost.bind(this);
        this.saveImagePost = this.saveImagePost.bind(this);
        this.saveVideoPost = this.saveVideoPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.hideShowButtons = this.hideShowButtons.bind(this);
        this.previewImage = this.previewImage.bind(this);
    }

    componentDidMount() {

        var elem = document.querySelector(".fixed-action-btn");
        var options = {
            direction: "top", // Direction menu comes out
            hoverEnabled: true, // Hover enabled
            toolbarEnabled: false // Toolbar transition enabled
        };
        var instance = new M.FloatingActionButton(elem, options);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);

        this.setState({
            [name]: value
        });
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    previewImage() {
        dataService.fileUpload(this.state.file, (response) => {
            this.setState({
                imageUrl: response.data
            });
        }, (error) => {
            console.log(error);
        });

    }


    activateTextModal() {
        this.setState({
            textModalOpen: true
        });
    }

    activateImageModal() {
        this.setState({
            imageModalOpen: true
        });
    }

    activateVideoModal() {
        this.setState({
            videoModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            textModalOpen: false,
            imageModalOpen: false,
            videoModalOpen: false,
            display: "none",
            errors: {}
        });
    }

    hideShowButtons() {
        this.setState({
            display: ""
        });

        if (this.state.display == "") {
            this.setState({
                display: "none"
            });
        }
    }

    saveTextPost() {

        let text = {
            text: this.state.text
        };

        validationService.isTextPostValid(text,
            (text) => {
                dataService.newPost("Text", text,
                    (response) => {
                        this.closeModal();
                        this.setState({
                            text: "",
                            imageUrl: "",
                            videoUrl: ""
                        });
                        this.props.reloadFeed();
                    });
            },
            (error) => {
                this.setState({
                    errors: {
                        allFields: error
                    }
                });
            });
    }

    saveImagePost() {

        let image = {
            imageUrl: ""
        };

        image.imageUrl = this.state.imageUrl ? this.state.imageUrl : AVATAR_PLACEHOLDER;


        validationService.isImagePostValid(image,
            (image) => {
                dataService.newPost("Image", image,
                    (response) => {
                        this.closeModal();
                        this.setState({
                            imageUrl: "",
                            file: null
                        });
                        this.props.reloadFeed();
                    });
            },
            (errors) => {
                this.setState({
                    errors: errors
                });
            });

    }


    saveVideoPost() {

        let videoUrl = {
            videoUrl: this.state.videoUrl
        };

        validationService.isVideoPostValid(videoUrl,
            (videoUrl) => {
                dataService.newPost("Video", videoUrl,
                    (response) => {
                        this.closeModal();
                        this.setState({
                            text: "",
                            imageUrl: "",
                            videoUrl: ""
                        });
                        this.props.reloadFeed();
                    });
            },
            (errors) => {
                this.setState({
                    errors: errors
                });
            });
    }



    render() {
        const TextModal =

            <Modal
                isOpen={this.state.textModalOpen}
                style={customStyles}
            >

                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">New Text Post</h4>
                    </div>

                    <div className="modal-body">
                        Post content: <textarea cols="50" rows="5" className="col-12" type="text" name="text" onChange={this.handleChange} value={this.state.text} /><br />
                        <div className="fieldsError text-danger">{this.state.errors.allFields}</div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.saveTextPost}>Save post</button>
                        <button type="button" className="btn btn-secondary closebtn" onClick={this.closeModal}>Close</button>
                    </div>

                </div>
            </Modal>;

        const ImgModal =

            <Modal isOpen={this.state.imageModalOpen}
                style={customStyles}
            >

                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">New Image Post</h4>
                    </div>

                    <div className="row">
                        <div className="col s12 pad0">
                            <label htmlFor="file-upload" className="waves-effect waves-light btn custom-file-upload blue darken-4">
                                <i className="material-icons left">wallpaper</i> Upload Image
                            </label>
                            <input id="file-upload" type="file" onChange={this.onChange} />
                            <button onClick={this.previewImage} className="waves-effect waves-light btn">Upload</button>
                        </div>
                        <div className="col s12">
                            {this.state.imageUrl ? <img src={this.state.imageUrl} width="100%" /> : ""}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s6 pad0">
                            <button onClick={this.saveImagePost} className="waves-effect waves-light btn">Post</button>
                        </div>
                        <div className="col s6 pad0">
                            <button onClick={this.closeModal} className="waves-effect waves-light btn closebtn red darken-3">Discard</button>
                        </div>
                    </div>

                </div>
            </Modal>;

        const VideoModal =

            <Modal isOpen={this.state.videoModalOpen}
                style={customStyles}
            >

                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">New Video Post</h4>
                    </div>

                    <div className="modal-body">
                        Video URL: <textarea cols="10" rows="2" className="col-12" type="text" name="videoUrl" onChange={this.handleChange} value={this.state.videoUrl} /><br />
                        <div className="nameError text-danger">{this.state.errors.allFields}</div>
                        <div className="fieldsError text-danger">{this.state.errors.link}</div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.saveVideoPost}>Save post</button>
                    </div>

                </div>
            </Modal>;
        return (
            <div>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large amber darken-1">
                        <i className="large material-icons">add</i>
                    </a>
                    <ul>
                        <li onClick={this.activateVideoModal}><a className="btn-floating pink darken-3"><i className="material-icons">ondemand_video</i></a></li>
                        <li onClick={this.activateImageModal}><a className="btn-floating purple darken-4"><i className="material-icons">image</i></a></li>
                        <li onClick={this.activateTextModal}><a className="btn-floating light-blue darken-4"><i className="material-icons">text_fields</i></a></li>
                    </ul>
                </div>

                {TextModal}
                {ImgModal}
                {VideoModal}

            </div>

        );
    };
}

NewPost.propTypes = {
    reloadFeed: PropTypes.func
};