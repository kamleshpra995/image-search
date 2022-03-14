import axios from 'axios';

const getSearchUrl = (text, currentPage) => `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=76e9083c11631432ac36256b1481888b&text=${text || ""}&per_page=15&page=${currentPage}&format=json&nojsoncallback=1'`


const getLatestUrl = (currentPage) => `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=76e9083c11631432ac36256b1481888b&per_page=15&page=${currentPage}&format=json&nojsoncallback=1`

const fetchData = async (text, currentPage) => {
    return new Promise((resolve, reject) => {
        //pick url on basis of fetch type
        const baseURL = text ? getSearchUrl(text, currentPage) : getLatestUrl(currentPage)
        axios.get(baseURL).then((response) => {
            let newData = null;
            if (response && response.data && response.data.photos) {
                newData = response.data.photos;
            }
            resolve(newData);
        }).catch(error => {
            // handle error here
            resolve({});
        });
    })
}
export default fetchData;