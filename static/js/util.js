class Utils {
  static parseJWT(jwt) {
    const payload = jwt.split('.')[1];
    const base64 = payload.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}

export default Utils;
