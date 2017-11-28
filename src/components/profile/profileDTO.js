export default class ProfileDTO {

    constructor(userId, name, email, aboutShort, about, avatarUrl, postsCount, commentsCount){
        this._userId = userId;
        this._name = name;
        this._aboutShort = aboutShort;
        this._about = about;
        this._email = email;
        this._avatarUrl = avatarUrl;
        this._postsCount = postsCount;
        this._commentsCount = commentsCount;
    }

    
    get name(){
        return this._name;
    }

    set name(newName){
        this._name = newName;
    }

    get email(){
        return this._email;
    }

    set email(newEmail){
        this._email = newEmail;
    }

    get aboutShort(){
        return this._aboutShort;
    }

    set aboutShort(newAboutShort){
        this._aboutShort = newAboutShort;
    }

    get about(){
        return this._about;
    }

    set about(newAbout){
        this._about = newAbout;
    }

    get avatarUrl(){
        return this._avatarUrl;
    }

    set avatarUrl(newAvatarUrl){
        this._avatarUrl = newAvatarUrl;
    }

    get postsCount(){
        return this._postsCount;
    }

    get commentsCount(){
        return this._commentsCount;
    }
    
    get userId(){
        return this._userId;
    }


   
    
    
    
    
 

}


