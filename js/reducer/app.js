import { Dimensions } from 'react-native';
import { handleActions } from 'redux-actions';

import _find from 'lodash/find';

export var loginForm = handleActions({
  'memberLoginResult': (state, action) => (action.error ? state : action.meta)
},{});

export var studentList = handleActions({
  'selectStudent': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1', name:'张三1', schoolId:'1'
  },{
    id:'2', name:'李四2', schoolId:'1'
  },{
    id:'3', name:'王五3', schoolId:'1'
  },{
    id:'4', name:'张三4', schoolId:'1'
  },{
    id:'5', name:'李四5', schoolId:'1'
  },{
    id:'6', name:'王五6', schoolId:'1'
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

export const messageList = handleActions({
  'selectMessageType': (state, action) => ({...state, selectedTypeId:action.payload})
},{
  stateList:[{
    id:'1', name:'已阅读', color:'#c7c7c7'
  },{
    id:'2', name:'最新', color:'#3d9679'
  }],
  typeList:[{
    id:'1', name:'学校通知', backgroundColor:'#f1e0ad', shortName:'校'
  },{
    id:'2', name:'班级通知', backgroundColor:'#cdf5e8', shortName:'班'
  },{
    id:'3', name:'家庭作业', backgroundColor:'#d4eef3', shortName:'作'
  },{
    id:'4', name:'考勤通知', backgroundColor:'#cfe3db', shortName:'勤'
  }],
  list:[{
    id:'1', typeId:'1', content:'学校 更正通知1', date:'07-10 11:54',stateId:'1'
  },{
    id:'2', typeId:'1', content:'学校 更正通知2', date:'07-10 11:54',stateId:'1'
  },{
    id:'3', typeId:'2', content:'班级 更正通知1', date:'07-10 11:54',stateId:'1'
  },{
    id:'4', typeId:'2', content:'班级 更正通知2', date:'07-10 11:54',stateId:'1'
  },{
    id:'5', typeId:'3', content:'今晚复习小橘灯...', date:'07-10 11:54',stateId:'1'
  },{
    id:'6', typeId:'3', content:'今晚需抄朱自清的...', date:'07-10 11:54',stateId:'2'
  },{
    id:'16', typeId:'3', content:'周末作业详细内容...', date:'07-10 11:54',stateId:'1'
  },{
    id:'7', typeId:'4', content:'考勤 更正通知4', date:'07-10 11:54',stateId:'1'
  },{
    id:'8', typeId:'4', content:'考勤 更正通知4', date:'07-10 11:54',stateId:'1'
  }]
});

export var contactList = handleActions({
  'selectContactType': (state, action) => ({...state, typeId:action.payload}),
  'selectContact': (state, action) => ({...state, selectedId:action.payload})
},{
  list:[{
    id:'1',name:'张晓霞',phone:'18862068855', title:'(三年级二班语文老师)', typeId:'1'
  },{
    id:'2',name:'叶子文',phone:'18862068855', title:'(三年级二班数学老师)', typeId:'1'
  },{
    id:'5',name:'陆民',phone:'18662019771', typeId:'2'
  },{
    id:'3',name:'匪警',phone:'110', typeId:'2'
  },{
    id:'4',name:'联通',phone:'10010', typeId:'2'
  }],
  typeList:[{
    id:'1', name:'教师',
  },{
    id:'2', name:'家长'
  }],
  typeId:'1'
});

export const noticeList = handleActions({},{
  typeList:[{
    id:'1', shortName:'校', backgroundColor:'#f1dfad'
  },{
    id:'2', shortName:'班', backgroundColor:'#cdf5e9'
  }],
  stateList:[{
    id:'1', name:'已阅读', color:'#c7c7c7'
  },{
    id:'2', name:'最新', color:'#3d9679'
  }],
  list:[{
    id:'1', content:'关于学校家长会通知...', date:'2016.6.12 12:10', stateId:'1', typeId:'1'
  },{
    id:'2', content:'全班开会通知...', date:'2016.6.12 11:10', stateId:'2', typeId:'2'
  },{
    id:'3', content:'关于学校考核通知...', date:'2016.6.12 12:10', stateId:'1', typeId:'1'
  },{
    id:'4', content:'班干部会议通知...', date:'2016.6.12 11:10', stateId:'2', typeId:'2'
  }]
});

export const schoolList = handleActions({},{
  list: [{
    id: '1', name:'盐城⋅第一中学', updateDate:'2016.6.12 12.10',
    content: '学校在办学早期就恪守学必成功\n并积极倡导四个盐中精神'
  }]
});

const {height, width} = Dimensions.get('window');

export var env = handleActions({
},{
  maxWidth:width,
  width,height,
});
