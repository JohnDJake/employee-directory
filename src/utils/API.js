import axios from 'axios';

export default {
    generate: (count) => axios.get(`https://randomuser.me/api/?results=${count}&inc=name,email,login,dob,phone,picture&noinfo`)
}