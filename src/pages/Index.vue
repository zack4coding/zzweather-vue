<template>
  <div>
    <div class="table-div">
    <table class="c-table">
        <thead>
        <tr>
          <th>City</th>
          <th>Updated time</th>
          <th>Weather</th>
          <th>Temperature</th>
          <th>Wind</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
              <select v-model="citySelected" @change="cityChange()">
                  <option :value="item" v-for="item in cityList" :key="item">{{item}}</option>
              </select>
          </td>
          <td>{{updateTime}}</td>
          <td>{{weather}}</td>
          <td>{{temperature}}</td>
          <td class="wind">{{wind}}</td>
        </tr>
        </tbody>
    </table>
</div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      cityList:[],
      citySelected:'',
      updateTime:'',
      weather:'',
      temperature:'',
      wind:'',
      es :Object
    }
  },
  created() {
    this.loadCity();
  },
  mounted() {
  },
  methods: {

    /**
     * This will trigger fetch current weather of selected city.
     */
    cityChange(){
      this.es.close()
      this.getWeatherInfo();
    },
    getWeatherInfo(){
      var that = this;

      this.es =new EventSource(`${process.env.BACKEND_URL}/current/event?city=${that.citySelected}`);
      this.es.addEventListener('message', (e) => {
        let jsonstr = JSON.parse( e.data );

        that.updateTime = that.timestampToTime(jsonstr.timestamp);
        that.weather = jsonstr.weather;
        that.temperature = jsonstr.temperature;
        that.wind = jsonstr.wind;
      })
    },
    /**
       * Load supported cities and get the First city' weather.
       */
    loadCity(){
      var that = this;

      this.axios({
        method: 'get',
        url:`${process.env.BACKEND_URL}/city/list`
      })
        .then((response) => {
          if (response.data.code===100){
            that.cityList = response.data.data;
            that.citySelected = response.data.data[0];
          }
        })
        .then(() => {
          that.getWeatherInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    timestampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = `${date.getFullYear()}-`;
      let M = `${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-`;
      let D = `${date.getDate()+1 < 10 ? `0${date.getDate()+1}` : date.getDate()+1} `;
      let h =`${date.getHours()+1 < 10 ? `0${date.getHours()+1}` : date.getHours()+1}:`;
      let m =`${date.getMinutes()+1 < 10 ? `0${date.getMinutes()+1}` : date.getMinutes()+1}:`;
      let s = date.getSeconds()+1 < 10 ? `0${date.getSeconds()+1}` : date.getSeconds()+1;

      return Y+M+D+h+m+s;
    }
  }
}
</script>
<style scoped>
@import "../assets/index.css";
</style>
