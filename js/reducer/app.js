import { Dimensions } from 'react-native';
import { handleActions } from 'redux-actions';

import _find from 'lodash/find';
import _reject from 'lodash/reject';
import _unionWith from 'lodash/unionWith';

export var loginForm = handleActions({
  'loginResult': (state, action) => (action.error ? state : action.meta)
},{});

export var loginUser = handleActions({
  'loginResult': (state, action) => (action.error ? state : {...state, ...action.meta, ...action.payload}),
  'profileResult': (state, action) => (action.error ? state : {...state, ...action.payload}),
  'profilePostRequest': (state, action) => (action.error ? state : {...state, ...action.payload})
},{});

export var studentList = handleActions({
  'selectStudent': (state, action) => ({...state, selectedId:action.payload}),
  'studentListResult': (state, action) => {
    if(action.error) return state;
    let list = action.payload.students;
    let selectedId = list.length && list[0].id;
    return {...state, list, selectedId};
  },
  'studentRelatedListResult': (state, action) => ({...state, relatedList:action.payload.students}),
  'studentAppliedListResult': (state, action) => ({...state, appliedList:action.payload.requests}),
  'schoolSummaryResult': (state, action) => {
    let newList = [...state.list];
    let student = _find(newList, {id:action.meta.sid});
    if(student){
      student.school = {
        ...student.school,
        ...action.payload
      }
    }
    return {...state, list:newList};
  },
  'schoolProfileResult': (state, action) => {
    let newList = [...state.list];
    let student = _find(newList, {id:action.meta.sid});
    if(student){
      student.school = {
        ...student.school,
        ...action.payload
      }
    }
    return {...state, list:newList};
  },
  'studentAssociateResult': (state, action) => {
    if(action.error) return state;

    let id = action.meta.student_id;
    let student = _find(state.relatedList, {id})
    let relatedList = _reject(state.relatedList, {id});

    return {...state, relatedList, list:[...state.list, student]};
  }

},{
  list:[],
  selectedId:'1',
  relatedList:[],appliedList:[]
})

export var homeworkList = handleActions({
  'selectHomework': (state, action) => ({...state, selectedId:action.payload}),
  'homeworkListResult': (state, action) => ({...state, list:action.payload.records})
},{
  list:[],
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
  'selectAttence': (state, action) => ({...state, selectedId:action.payload}),
  'attenceListResult': (state, action) => ({...state, list:action.payload.records}),
},{
  directionList:[
    { id: '-1', name: '' },
    { id: '0', name: '未知' },
    { id: '1', name: '进' },
    { id: '2', name: '出' },
  ],
  list:[]
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
  'selectContact': (state, action) => ({...state, selectedId:action.payload}),
  'contactListResult': (state, action) => (action.error ? state : {...state, list:action.payload.contacts}),
},{
  list:[],
  typeList:[{
    id:'T', name:'教师',
  },{
    id:'G', name:'家长'
  }],
  typeId:'T'
});

export const noticeList = handleActions({
  'noticesListResult': (state, action) => (action.error ? state : {
    ...state,
    list: action.payload.records
  })
},{
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
  list:[]
});

export const schoolList = handleActions({
  'schoolListResult': (state, action) => (action.error ? state : {...state, list:action.payload.schools})
},{
  list: []
});
export const gradeList = handleActions({
  'gradeListResult': (state, action) => (action.error ? state : {...state, list:action.payload.grades})
},{
  list: []
});

export const classList = handleActions({
  'classListResult': (state, action) => (action.error ? state : {...state, list:action.payload.classes})
},{
  list: []
});

export const bindStudentForm = handleActions({
  'selectSchool': (state, action) => ({...state, schoolId:action.payload}),
  'selectGrade': (state, action) => ({...state, gradeId:action.payload}),
  'selectClass': (state, action) => ({...state, classId:action.payload}),
},{})

const {height, width} = Dimensions.get('window');

export var env = handleActions({
},{
  maxWidth:width,
  width,height,
});
