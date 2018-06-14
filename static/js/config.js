// 通用接口
// host
var host = 'http://192.168.1.34:8080';

// 获取验证码
var yzcodeUrl = host + '/kyp/app/currencyController/getYzCode';

// 登录接口
var loginUrl = host + '/kyp/app/userController/login';

// 上传照片
var uploadImgUrl = host + '/kyp/api/image/upload';

// 获取号码牌种类
var getCarTypeUrl = host + '/kyp/app/currencyController/getCarType';

// 获取保险公司信息
var getInsuranceUrl = host + '/kyp/app/currencyController/getInsurance';

// 获取天气信息
var getWeatherUrl = host + '/kyp/app/currencyController/getWeather';

// 获取事故责任信息
var getAccidentDutyUrl = host + '/kyp/app/currencyController/getAccidentDuty'

// 获取事故车损信息
var getAccidentDamageUrl = host + '/kyp/app/currencyController/getAccidentDamage';

// 获取事故情形信息
var getAccidentTypeUrl = host + '/kyp/app/currencyController/getAccidentType';

// 获取车牌简称
var getCarNoUrl = host + '/kyp/app/currencyController/getCarNo';

//图片识别
// 身份证、驾驶证识别
var AnalysisUrl = host + '/kyp/app/image/Analysis';

// 添加驾驶证绑定
var addBindingDriverUrl = host + 'kyp/applogin/currencyController/addBindingDriver';

// 修改绑定驾驶证信息
var editBindingDriverUrl = host + 'kyp/applogin/currencyController/editBindingDriver';

// 获取绑定驾驶证信息
var getBindingDriverUrl = host + 'kyp/applogin/currencyController/getBindingDriver';

// 删除绑定驾驶证
var removeBindingDriverUrl = host + 'kyp/applogin/currencyController/removeBindingDriver';

// 获取绑定机动车信息
var getBindingCarUrl = host + 'kyp/applogin/currencyController/getBindingCar';

// 添加绑定机动车信息
var addBindingCarUrl = host + 'kyp/applogin/currencyController/addBindingCar';

// 修改绑定机动车信息
var editBindingCarUrl = host + 'kyp/applogin/currencyController/editBindingCar';

// 删除绑定机动车信息
var removeBindingCarUrl = host + 'kyp/applogin/currencyController/removeBindingCar';

/*------------------------------*/

// 事故
// 创建事故
var createAccidentUrl = host + '/kyp/applogin/accidentController/createAccident';

// 上传事故照片
var accidentImgUrl = host + '/kyp/applogin/accidentController/accidentImg';

// 选择处理方式
var choseHandleTypeUrl = host + '/kyp/applogin/accidentController/choseHandleType';

// 添加当事人信息
var addAccidentUserUrl = host + '/kyp/applogin/accidentController/addAccidentUser';


// 添加当事人信息结束
var addAccidentUserFinishUrl = host + '/kyp/applogin/accidentController/addAccidentUserFinish';

// 添加证件信息
var addFourInOneUrl = host + '/kyp/applogin/accidentController/addFourInOne';
// 选择事故情形
var choseAccidentType = host + '/kyp/applogin/accidentController/choseAccidentType';
// 获取事故人信息
var getAccidentUserInfoUrl = host + '/kyp/applogin/accidentController/getAccidentUserInfo';
// 自行协商事故定责
var choseAccidentDutyUrl = host + '/kyp/applogin/accidentController/choseAccidentDuty';
// 获取事故信息
var getAccidentInfoUrl = host + '/kyp/applogin/accidentController/getAccidentInfo';
// 事故认证
var accidentAuthUrl = host + '/kyp/applogin/accidentController/accidentAuth';
// 获取事故照片审核结果
var getAccidentStatusUrl = host + '/kyp/applogin/accidentController/getAccidentStatus';
// 获取四合一证件审核状态
var getFourInOneStatusUrl = host + '/kyp/applogin/accidentController/getFourInOneStatus';
// 获取证件四合一照片
var getFourInOnePicUrl = host + '/kyp/applogin/accidentController/getFourInOnePic';
// 获取事故认证状态
var accidentAuthStatusUrl = host + '/kyp/applogin/accidentController/accidentAuthStatus';



// 信息查询
// 信息查询主页面
var accidentsDealInfoUrl = host + 'kyp/applogin/userController/accidentsDealInfo';

// 事故信息及当事人列表
var accidentAuthStatusUrl = host + '/kyp/applogin/accidentController/accidentAuthStatus';

