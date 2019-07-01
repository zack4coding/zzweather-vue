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
   this.getWeatherInfo();
   
  },
  mounted() {
  },
  methods: {
      cityChange(){
        this.es.close();
        this.getWeatherInfo();
      },
      getWeatherInfo(){
        var _this = this;
        this.es =new EventSource('http://localhost:9090/forecast',{city:_this.citySelected});
        this.es.addEventListener('message', function(e) {
            let jsonstr = JSON.parse( e.data );
            _this.updateTime = _this.timestampToTime(jsonstr.timestamp);
            _this.weather = jsonstr.weather;
            _this.temperature = jsonstr.temperature;
            _this.wind = jsonstr.wind;
        })
      },
      loadCity(){
        var _this = this;
        this.axios({
            method: 'get',
            url: "http://localhost:9090/city/list"
        })
        .then(function(response){
            if(response.data.code===100){
                _this.cityList = response.data.data;
                _this.citySelected = response.data.data[0];
            }
        })
        .catch(function (error) {
            console.log(error);
        }); 
      },
      timestampToTime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1) + ' ';
        let h =(date.getHours()+1 < 10 ? '0'+(date.getHours()+1) : date.getHours()+1)+ ':';
        let m =(date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes()+1)+ ':';
        let s = (date.getSeconds()+1 < 10 ? '0'+(date.getSeconds()+1) : date.getSeconds()+1);
        return Y+M+D+h+m+s;
    }
  }  
}
</script>
<style scoped>
@import "../assets/index.css";
</style>
