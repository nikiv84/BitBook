export default class PostDTO{
    constructor(postData){
        this._text = postData.text;
        this._id = postData.id;
        this._dateCreated = postData.dateCreated;
        this._userId = postData.userId;
        this._userDisplayName = postData.userDisplayName;
        this._type = postData.type;
    }

    
    get text(){
        return this._text;
    }

    set text(newText){
        this._text = newText;
    }

    get id(){
        return this._id;
    }


    get dateCreated(){
        return this._dateCreated;
    }

    set dateCreated(newDateCreated){
        this._dateCreated = newDateCreated;
    }

    get userId(){
        return this._userId;
    }


    get userDisplayName(){
        return this._userDisplayName;
    }

    set userDisplayName(newUserDisplayName){
        this._userDisplayName = newUserDisplayName;
    }

    get type(){
        return this._type;
    }
    set type(newType){
        return this._type = newType;
    }



   
}