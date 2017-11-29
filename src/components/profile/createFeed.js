import React from "react";
import { AVATAR_PLACEHOLDER } from "../../constants";
import PropTypes from "prop-types";
import Modal from "react-modal";
import DataService from "../../service/dataService";
import RedirectService from "../../service/redirectService";
import CommunicationService from "../../service/communicationService";
import ValidationService from "../../service/validationService";

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


export default class CreateFeed extends React.Component {
    constructor(props) {
        super(props);
        this.initBind();
        this.dataService = new DataService();
        this.commService = new CommunicationService();
        this.validService = new ValidationService();
        this.redirectService = new RedirectService();
        this.state = {
            modalIsOpen: false,
            text: "",
            dateCreated: "",
            userDisplayName: "",
            PropTypes: "",
            isNotValid: false,
            errorMsg: [],
            isUpdated: false
        };
    }

    initBind() {
        this.handleEdit = this.handleEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.getFeedEditData = this.getFeedEditData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEdit() {
        this.setState({ modalIsOpen: true });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalIsOpen: nextProps.clickedOnEdit
        });
    }

    componentDidMount() {
        this.getFeedEditData();
    }

    getFeedEditData() {
        this.dataService.getPost((postData) => {
            this.setState({
                text: postData.text,
                dateCreated: postData.dateCreated,
                userDisplayName: postData.userDisplayName,
                type: postData.type
                
            });
        });
    }

    saveChanges() {
        event.preventDefault();
        let data = {
            text: this.state.text,
            dateCreated: this.state.dateCreated,
            userDisplayName: this.state.userDisplayName,
            type: this.state.type
       
        };


        if (this.validService.isInputFieldValid(data, (errorMsgs) => {
            let newarr = errorMsgs;
            this.setState({
                isNotValid: true,
                errorMsg: newarr
            });
        })) {
            this.setState({
                isNotValid: false,
            });

            this.dataService.updatePost(data, (response) => {
                this.closeModal();
                this.setState({
                    isUpdated: true
                });
            }, (error) => {
                this.setState({
                    isNotValid: true,
                    errorMsg: error
                });
            });
        }
    }

    handleChange(event) {
        const inputText = event.target.value;
        // const fieldName = event.target.name;

        this.setState({
            text: inputText
        });
    }

    closeModal() {
        this.props.clickedOnClose();
    }

    render() {

        return (

            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div>
                        <h5>Create Feed</h5>
                        <input 
                            type="text"
                            name="inputText"
                            value={this.state.text} 
                            placeholder="Create Feed" 
                            onChange={this.handleChange}  />
                        

                        <button onClick={this.saveChanges} className="waves-effect waves-light btn">Post</button>
                        
                        <button onClick={this.closeModal} className="waves-effect waves-light btn closebtn">Close</button>
                        
                        <p id="error">{this.state.isNotValid ? `${this.state.errorMsg}` : ""}</p>
                    </div>
                </Modal>
            </div>
        );
    }
};

CreateFeed.propTypes = {
    profile: PropTypes.object,
    name: PropTypes.string,
    about: PropTypes.string,
    posts: PropTypes.number,
    comments: PropTypes.number,
    clickedOnEdit: PropTypes.bool,
    clickedOnClose: PropTypes.func
};