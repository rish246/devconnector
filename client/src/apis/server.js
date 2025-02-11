// use axios.create to create a global server header
import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:5553/api'
});
