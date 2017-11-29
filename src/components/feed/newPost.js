import React from "react";
import Modal from "react-modal";
import DataService from "../../service/dataService";
import ValidationService from "../../service/validationService";
import RedirectService from "../../service/redirectService";
import PropTypes from "prop-types";

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
            }
        };

        this.dataService = new DataService();
        this.validationService = new ValidationService();

        this.bindEventHandlers();

    }

    bindEventHandlers() {

        this.activateTextModal = this.activateTextModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveTextPost = this.saveTextPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideShowButtons = this.hideShowButtons.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    activateTextModal() {
        this.setState({
            textModalOpen: true
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
        event.preventDefault();

        let text = {
            text: this.state.text
        };

        this.validationService.isTextPostValid(text,
            (text) => {
                this.dataService.newPost("Text", text,
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

        return (

            <div className="modalButtons">

                <div className="fixed-action-btn">
                    <span className="btn-floating btn-large red">
                        <i className="large material-icons">add</i>
                        <ul>
                            <li><span className="btn-floating yellow darken-1"><i className="material-icons">ondemand_video</i></span></li>
                            <li><span className="btn-floating green"><i className="material-icons">image</i></span></li>
                            <li onClick={this.activateTextModal}><span className="btn-floating blue"><i className="material-icons">text_fields</i></span></li>
                        </ul>
                    </span>

                </div>

                {TextModal}

            </div >
        );
    };
}

NewPost.propTypes = {
    reloadFeed: PropTypes.func
};