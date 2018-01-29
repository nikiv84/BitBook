export default class TextPostDTO {
    constructor(id, dateCreated, userId, userDisplayName, type, text, commentsNum) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._userId = userId;
        this._userDisplayName = userDisplayName;
        this._type = type;
        this._text = text;
        this._commentsNum = commentsNum;
    }

    get id() {
        return this._id;
    }

    get dateCreated() {
        return this._dateCreated;
    }

    get userId() {
        return this._userId;
    }

    get userDisplayName() {
        return this._userDisplayName;
    }

    get type() {
        return this._type;
    }

    get text() {
        return this._text;
    }

    get commentsNum() {
        return this._commentsNum;
    }

}