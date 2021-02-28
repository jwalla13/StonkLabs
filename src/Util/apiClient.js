import axios from 'axios';

//We might need to change how we determine this value, I'm just hardcoding it here based on what runs locally for me
var apiEndpoint = 'http://127.0.0.1:5000'

const apiClient = {

  getStock: function(tik, setCurrentStock, stockView) {
    const apiUrl = apiEndpoint + '/tik/' + tik;
    setCurrentStock({
      isLoading: true
    })
    axios.get(apiUrl)
      .then((response) => {
        setCurrentStock({
          ticker: tik,
          currentStockInfo: response.data,
          isLoading: false,
          view: stockView
        });
      });
  }
}

export default apiClient;