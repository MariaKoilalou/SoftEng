import axios from 'axios';


const API_URL = "http://localhost:9103/intelliq_api/"


class UserService {
  getQuestionnaire(){
    return axios.get(API_URL+"getallquestionnaires")
  }
  getq(inp){
    return axios.get(API_URL+"questionnaire/"+ inp)
  }
  postSession(id){
    return axios.get(API_URL + "dosession/"+id)
  }
  getOptions(qid,id){
    return axios.get(API_URL+ "getquestionoptions/"+qid +"/"+id);
  }
  postAnswer(qid,id,sid,oid){
    return axios.get(API_URL + "doanswer/" + qid+"/" +id+"/"+sid+"/"+oid);
  }
  getQuestion(qid,id){
    return axios.get(API_URL+"question/"+qid+"/"+id);
  }
  getSessionNum(qid){
    return axios.get(API_URL + "getsessionnumber/"+qid);
  }
}
export default new UserService();
