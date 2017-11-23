export default class ProfileDTO {

    constructor(name, aboutShort, about, avatarUrl, postsCount, commentsCount){
     
        this._name = name;
        this._aboutShort = aboutShort;
        this._about = about;
        this._avatarUrl = avatarUrl;
        this._postsCount = postsCount;
        this._commentsCount = commentsCount;
    }

    
    get name(){
        return this._name;
    }
    get aboutShort(){
        return this._aboutShort;
    }
    get about(){
        return this._about;
    }
    get avatarUrl(){
        return this._avatarUrl;
    }
    get postsCount(){
        return this._postsCount;
    }
    get commentsCount(){
        return this._commentsCount;
    }


    set name(newName){
        this._name = newName;
    }
    set aboutShort(newAboutShort){
        this._aboutShort = newAboutShort;
    }
    set about(newAbout){
        this._about = newAbout;
    }
    set avatarUrl(newAvatarUrl){
        this._avatarUrl = newAvatarUrl;
    }
 

}


