import { createAction } from 'redux-actions';

import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import _template from 'lodash/template';

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

  'homeworkList': {url:'/g/s/${sid}/homeworks', useTemplate: true, jsonBody:true},
  'cameraList': {url:'/g/s/${sid}/cameras', useTemplate: true, jsonBody:true},
  'attenceList': {url:'/g/s/${sid}/monitor/records', useTemplate: true, jsonBody:true},

  'memberAuthList': 'member-auth-list',
  'productList': 'product-list',
  'productBuy': 'product-buy',
  'productBuyList': 'product-buy-list',
  'productPay': 'product-pay'
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

      let body;
      if(actionConfig.jsonBody){
        body = JSON.stringify(params);
      }else{
        body = new FormData();
        params = {...params, developer:'lumin824@163.com'};
        forEach(params, (o, k)=>{ body.append(k,o || '')});
      }

      if(actionConfig.useTemplate){
        url = _template(url)(params);
      }
      console.log([url], params);

      let headers = { ...defaultHeader };
      if(actionConfig.headers) headers = {...actionConfig.headers};

      if(actionConfig.withToken) headers['X-Auth-Token'] = accessToken;
      let method = actionConfig.method || 'POST';
      return fetch(`${httpServer}${url}`, {body,method,headers})
      .then(response => response.text())
      .then(text => {
        console.log(text);
        return JSON.parse(text || '{}');
      })
      .then(json=>{
        console.log(json);
        if(json.error_code){
          //if(json.status == 200) Actions.login();
          return Promise.reject(new Error(json.error_code));
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
