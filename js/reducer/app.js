import { handleActions } from 'redux-actions';

import _find from 'lodash/find';

export var loginForm = handleActions({
  'memberLoginResult': (state, action) => (action.error ? state : action.meta)
},{});

export var studentList = handleActions({
  'selectStudent': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1', name:'张三', schoolName:'一小'
  },{
    id:'2', name:'李四', schoolName:'二小'
  },{
    id:'3', name:'王五', schoolName:'三小'
  }],
  selectedId:'1'
})

export var homeworkList = handleActions({
  'selectHomework': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1', name:'07-07家庭作业', content:'背影抄10便'
  },{
    id:'2', name:'07-06家庭作业', content:'背诵全文'
  },{
    id:'3', name:'07-05家庭作业', content:'写篇游记'
  }],
  selectedId:'1'
});

export var videoList = handleActions({
  'selectVideo': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1', name:'三年级二班-教室摄像头',content:'摄像头1 content'
  },{
    id:'2', name:'西门摄像头',content:'摄像头2 content'
  },{
    id:'3', name:'操场东摄像头',content:'摄像头3 content'
  },{
    id:'4', name:'食堂摄像头',content:'摄像头4 content'
  }]
});

export var attenceList = handleActions({
  'selectAttence': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1', type:'进校', place:'西门', date:'2015-07-10 08:20:26'
  },{
    id:'2', type:'出校', place:'西门', date:'2015-07-10 08:20:26'
  }]
});

export var messageList = handleActions({
  'selectMessageType': (state, action) => ({...state, selectedTypeId:action.payload})
},{
  typeList:[{
    id:'1', name:'学校通知'
  },{
    id:'2', name:'班级通知'
  },{
    id:'3', name:'作业通知'
  },{
    id:'4', name:'考勤通知'
  }],
  list:[{
    id:'1', typeId:'1', content:'学校 更正通知1', date:'07-10 11:54'
  },{
    id:'2', typeId:'1', content:'学校 更正通知2', date:'07-10 11:54'
  },{
    id:'3', typeId:'2', content:'班级 更正通知1', date:'07-10 11:54'
  },{
    id:'4', typeId:'2', content:'班级 更正通知2', date:'07-10 11:54'
  },{
    id:'5', typeId:'3', content:'作业 更正通知3', date:'07-10 11:54'
  },{
    id:'6', typeId:'3', content:'作业 更正通知3', date:'07-10 11:54'
  },{
    id:'7', typeId:'4', content:'考勤 更正通知4', date:'07-10 11:54'
  },{
    id:'8', typeId:'4', content:'考勤 更正通知4', date:'07-10 11:54'
  }]
});

export var contactList = handleActions({
  'selectContact': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1',name:'张晓霞',phone:'18862068855'
  },{
    id:'2',name:'陆民',phone:'18662019771'
  },{
    id:'3',name:'匪警',phone:'110'
  },{
    id:'4',name:'联通',phone:'10010'
  }]
});
