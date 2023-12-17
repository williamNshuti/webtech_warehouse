class AuthenticationService {
  registerSuccessfulLoginBusiness(username) {
    localStorage.setItem("authenticatedUser", username);
    localStorage.setItem("role", "business");
    console.log("Successful login");
  }

  registerSuccessfulLoginUser(username) {
    localStorage.setItem("authenticatedUser", username);
    localStorage.setItem("role", "user");
    console.log("Successful login");
  }

  logout() {
    localStorage.clear();
    localStorage.clear();
    window.location.reload(false);
  }

  isUserLoggedIn() {
    let role = localStorage.getItem("role");
    if (role !== "user") {
      return false;
    } else {
      return true;
    }
  }

  isBusinessLoggedIn() {
    let role = localStorage.getItem("role");
    if (role !== "business") {
      return false;
    } else {
      return true;
    }
  }

  getLoggedInUser() {
    let username = localStorage.getItem("authenticatedUser");
    if (username == null) {
      return "";
    } else {
      return username;
    }
  }

  setUpToken(jwtToken) {
    localStorage.setItem("token", jwtToken);
  }
}

export default new AuthenticationService();
