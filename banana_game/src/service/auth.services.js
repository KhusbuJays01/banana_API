const { default: axiosClient } = require("../axios");

class AuthService {
    signup(values) {
        return axiosClient.post("/signup", values);
    }
    login(values){
        return axiosClient.post('login',values);
    }
    logout(){
        return axiosClient.get('/logout');
    }

}

export default new AuthService();