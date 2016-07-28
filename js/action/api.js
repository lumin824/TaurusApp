import { createAction } from 'redux-actions';

import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';

let httpServer = 'http://218.92.181.211:82/';
let httpApiList = {
  'smsCode': {url:'sms-code', jsonBody:true},
  'memberReg': {url:'member-reg', jsonBody:true},
  //'memberLogin': 'member-login',
  'memberAuth': 'member-auth',
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

      console.log(body);

      let headers = { ...defaultHeader };
      if(actionConfig.headers) headers = {...actionConfig.headers};

      return fetch(`${httpServer}${url}`, {body,method:'POST',headers})
      .then(response=>{console.log(response);return response;})
      .then(response=>response.status == '200' ? response.text(): Promise.reject(response.json()))
      .then(text=>{console.log(text);let json = JSON.parse(text); return json;})
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
