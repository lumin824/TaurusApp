import { createAction } from 'redux-actions';

import mapValues from 'lodash/mapValues';
import _forEach from 'lodash/forEach';
import _template from 'lodash/template';
import _flatten from 'lodash/flatten';
import _sortBy from 'lodash/sortBy';
import _reduce from 'lodash/reduce';
import md5 from 'md5';

import moment from 'moment';

let errorMap = {
  'C0001':'未知错误、系统内部错误',
  'C0002':'接口请求参数错误',
  'C0003':'调用了需要用户身份认证的接口，但是TOKEN不存在或者无效',
  'C0004':'用户试图操作不属于自己的数据',
  'C0005':'用户试图操作某条不存在的记录',
  'G0101':'注册-注册手机号已经存在',
  'G0102':'注册-注册手机号不在学生监护人档案列表中，暂不开放注册',
  'G0201':'登陆-用户名或密码错误',
  'G0202':'登陆-用户已经被禁用',
  'G0301':'修改密码-旧密码不正确',
  'G0401':'执行绑定操作失败，家长和待绑定的学生不匹配',
  'G0402':'提交绑定申请失败，提交的学校或者班级不存在',
  'G0501':'学生档案数据异常'
};

let ACCESS_KEY = 'BpzizaXiZGnbdBOcOVgdblbhpcusUlvc';
let SECRET_KEY = 'mkVyOeMKwMWeKElruyfktyGKmhbFrnRa'

let httpServer = 'http://service.sxxat.com/';
let httpApiList = {

  'schoolList': {url:'c/schools', jsonBody:true},
  'gradeList': {url:'c/schools/${sid}/grades', jsonBody:true, useTemplate: true},
  'classList': {url:'c/schools/${sid}/grades/${gid}/classes', jsonBody:true, useTemplate: true},

  'register': {url:'g/register', jsonBody:true},
  'login': {url:'g/login', jsonBody:true, obtainToken:true},
  'profile': {url:'g/profile', jsonBody:true, withToken:true, method:'GET'},
  'profilePost': {url:'g/profile', jsonBody:true, withToken:true, method:'POST'},
  'passwordModify': {url:'g/password', jsonBody:true, withToken:true},
  'studentRelatedList': {url:'g/related_students', jsonBody:true, withToken:true},
  'studentAppliedList': {url:'g/applied_associate_requests', jsonBody:true, withToken:true},
  'studentApply': {url:'g/associate_apply', jsonBody:true, withToken:true},
  'studentAssociate': {url:'g/associate', jsonBody:true, withToken:true},
  'studentList': {url:'g/associated_students', jsonBody:true, withToken:true},

  'schoolSummary': {url:'g/s/${sid}/school/summary', useTemplate: true, jsonBody:true},
  'schoolProfile': {url:'g/s/${sid}/school/profile', useTemplate: true, jsonBody:true},
  //'contactGroupList': {url:'g/contacts/group', jsonBody:true, withToken:true},
  'contactList': {url:'g/contacts', jsonBody:true, withToken:true},
  //'contact': {url:'g/contacts/${id}', useTemplate: true, jsonBody:true},
  'noticesList': {url:'g/s/${sid}/notices', useTemplate: true, jsonBody:true},

  'homeworkList': {url:'g/s/${sid}/homeworks', useTemplate: true, jsonBody:true, withToken:true},
  'cameraList': {url:'g/s/${sid}/cameras', useTemplate: true, jsonBody:true},
  'monitorList': {url:'g/s/${sid}/monitor/records', useTemplate: true, jsonBody:true},
  'videoList': {url:'g/s/${sid}/cameras', useTemplate: true, jsonBody:true},

  'schoolNoficeList': {url:'g/school_notices', withToken:true, jsonBody:true},
  'classNoficeList': {url:'g/class_notices', withToken:true, jsonBody:true},
  'homeworkNoficeList': {url:'g/homeworks', withToken:true, jsonBody:true},
  'monitorNoficeList': {url:'g/monitor_records', withToken:true, jsonBody:true},

  'notices': {url:'c/notices/${id}', useTemplate: true, jsonBody:true},
  'homework': {url:'c/homeworks/${id}', useTemplate: true, jsonBody:true},
  'monitor': {url:'c/monitor/records/${id}', useTemplate: true, jsonBody:true},
  'video': {url:'c/cameras/${id}', useTemplate: true, jsonBody:true, sign:'id',withToken:true},

  'uploadImage': {url:'g/portrait', withToken: true,sign:'size',signTo:'signature'}
};

let defaultHeader = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

var httpActions = mapValues(httpApiList, (actionConfig, actionName) => {
  if(typeof(actionConfig) === 'string') actionConfig = {url:actionConfig};
  let requestAction = createAction(actionName + 'Request');
  let resultAction = createAction(actionName + 'Result',
    params => {
      let url = actionConfig.url;

      if(actionConfig.sign){
        let [access_key,timestamp] = [ACCESS_KEY,moment().format('x')];
        let arr = [
          ['access_key',access_key],
          ['timestamp',timestamp]
        ];
        _forEach(actionConfig.sign.split(','), (o)=>{
          arr.push([o,params[o]||'']);
        });

        let obj = _reduce(arr,(r,o)=>{r[o[0]]=o[1];return r;}, {});

        arr = _sortBy(arr, o=>o[0]);
        arr.push(SECRET_KEY);

        let sign = md5(_flatten(arr).join('')).toUpperCase();
        obj.sign = sign;
        if(actionConfig.signTo){
          params[actionConfig.signTo] = JSON.stringify(obj);
        }else{
          params = {...params, ...obj};
        }

        console.log(arr);
      }
      let body;
      if(actionConfig.jsonBody){
        body = JSON.stringify(params);
      }else{
        body = new FormData();
        params = {...params, developer:'lumin824@163.com'};
        _forEach(params, (o, k)=>{ body.append(k,o || '')});
      }

      if(actionConfig.useTemplate){
        url = _template(url)(params);
      }
      console.log([url,params]);

      let headers = { ...defaultHeader };
      if(actionConfig.headers) headers = {...actionConfig.headers};

      if(actionConfig.withToken) headers['X-Auth-Token'] = accessToken;
      let method = actionConfig.method || 'POST';
      return fetch(`${httpServer}${url}`, {body,method,headers})
      .then(response => response.text())
      .then(text => {
        console.log(text||'text空');
        return JSON.parse(text || '{}');
      })
      .then(json=>{
        console.log(json);
        if(json.error_code){
          //if(json.status == 200) Actions.login();
          return Promise.reject(new Error(errorMap[json.error_code]||json.error_code));
        }
        let {token, ...info} = json;
        if(actionConfig.obtainToken) accessToken = token;

        return info;
      });
    }, params=>params
  );

  return params => dispatch => {
    dispatch(requestAction(params));
    return dispatch(resultAction(params));
  }
});


export default {
  ...httpActions
}
