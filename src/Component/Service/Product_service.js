import axios from './custom_axios';

const fetchAllProducts = async () => {
    try {
        const reponse = await axios.get("/data.json");
        return reponse.data;
    } catch {
        return [];
    }

}
export { fetchAllProducts }