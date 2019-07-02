import Mock from 'mockjs' 
import cityList from "./json/city";
//import cityList from "./data/city"

Mock.mock('/city/list','get',cityList);