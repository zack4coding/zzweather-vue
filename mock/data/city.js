import Mock from 'mockjs'; 

const cityList = () => {
  let json = {
    code: 100,
    data: [],
    message: "success"
  };

  for (let index = 0; index < 3; index++) {
    json.data.push(Mock.mock({
      value:'@natural',label:'@name'
    }))
  }
  return json;
}
export default {
  cityList
}