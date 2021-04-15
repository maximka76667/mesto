export default class UserInfo {
  constructor(
    profileNameSelector,
    profilePositionSelector,
    avatarImageSelector
  ) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profilePosition = document.querySelector(profilePositionSelector);
    this._avatar = document.querySelector(avatarImageSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      position: this._profilePosition.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profilePosition.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  }
}
