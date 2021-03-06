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
  },

  getPortfolio: function(username, setPortfolio) {
    setPortfolio({ isLoading: true })
    const apiUrl = 'http://localhost:5000/g_prof/' + username;
    axios.get(apiUrl)
      .then(res => {
        const stockListRes = Object.values(res.data);
        console.log(stockListRes);
        setPortfolio({ isLoading:false, list: stockListRes});
      })
      .catch(function (error) {
          console.log(error);
      });
  },

  getWatchlist: function(username, setWatchlist) {
    const apiUrl = 'http://localhost:5000/g_watch/' + username;
    axios.get(apiUrl)
      .then(res => {
        const stockListRes = Object.values(res.data);
        setWatchlist({list: stockListRes, isLoading: false});
      })
      .catch(function (error) {
          console.log(error);
      });
  },

  getFeaturedStocks: function(setFeaturedStocks) {
    const apiUrl = 'http://localhost:5000/g_trend';
    axios.get(apiUrl)
      .then(res => {
        const stockListRes = Object.values(res.data);
        setFeaturedStocks({list: stockListRes, isLoading: false});
      })
      .catch(function (error) {
          console.log(error);
      });
  },

  addToWatchlist: function(username, tik, watchlist, setWatchlist) {
    const apiUrl = 'http://localhost:5000/add_w/' + username + "/" + tik;
    axios.get(apiUrl)
      .then( res => {
          if (res){
            this.getWatchlist(username, setWatchlist)
          }
        }
      )
      .catch(function (error) {
          console.log(error);
      });
  },

  removeFromWatchlist: function(username, tik, watchlist, setWatchlist) {
    const apiUrl = 'http://localhost:5000/rem_w/' + username + "/" + tik;
    axios.get(apiUrl)
      .then( res => {
          if (res){
            this.getWatchlist(username, setWatchlist)
          }
        }
      )
      .catch(function (error) {
          console.log(error);
      });
  }
}

export default apiClient;