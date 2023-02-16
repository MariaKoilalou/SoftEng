import axios from 'axios';


const API_URL = "http://localhost:9103/intelliq_api/"


class UserService {
  getQuestionnaire(){
    return axios.get(API_URL+"getallquestionnaires")
  }
  getq(inp){
    return axios.get(API_URL+"questionnaire/"+ inp)
  }
}
export default new UserService();
