export default class UserInfo {
  constructor(profileNameSelector, profilePositionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profilePosition = document.querySelector(profilePositionSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      position: this._profilePosition.textContent,
    };
  }

  setUserInfo(name, position) {
    this._profileName.textContent = name;
    this._profilePosition.textContent = position;
  }
}
