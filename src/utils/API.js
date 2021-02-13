import axios from 'axios';

export default {
    generate: (count) => axios.get(`https://randomuser.me/api/?results=${count}&exc=login,registered&noinfo`)
}