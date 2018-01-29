class UserDTO {
    constructor(id, name, aboutShort, avatarUrl, lastPostDate) {
        this._id = id;
        this._name = name;
        this._aboutShort = aboutShort;
        this._avatarUrl = avatarUrl;
        this._lastPostDate = lastPostDate;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get aboutShort() {
        return this._aboutShort;
    }

    get avatarUrl() {
        return this._avatarUrl;
    }

    get lastPostDate() {
        return this._lastPostDate;
    }


}

export default UserDTO;