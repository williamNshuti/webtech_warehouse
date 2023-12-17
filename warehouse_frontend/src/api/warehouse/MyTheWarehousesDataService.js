import axios from "../customAxiosConfig/CustomAxiosConfig";
import AuthenticationService from "../authentication/AuthenticationService";

const MyTheWarehousesDataService = (id) => {
  let username = AuthenticationService.getLoggedInUser();

  try {
    return axios.get(`/theWarehouses/saved/`, {
      params: {
        username,
      },
    });
  } catch (err) {
    let error = "";
    if (err.response) {
      error += err.response;
    }
    return error;
  }
};

export default MyTheWarehousesDataService;
