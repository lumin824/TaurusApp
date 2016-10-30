import { Dimensions } from 'react-native';
import { handleActions } from 'redux-actions';

import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';
import _forEach from 'lodash/forEach';
import _remove from 'lodash/remove';
import _merge from 'lodash/merge';
import _reject from 'lodash/reject';
import _unionWith from 'lodash/unionWith';

const resultDetail = (data, id, newData) => {
  console.log(data);
  let {list, ...oth} = data;
  list = list.map(o=>o.id == id ? {...o, ...newData} : o);
  return { list, ...oth};
}

const requestPageList = (data, page_no) => {
  return {
    ...data,
    page: page_no,
    loading: true,
  }
};

const resultPageList = (data, newList, page_no, page_size) => {
  let list = null;
  if(page_no == 1){
    list = [];
  }else{
    list = [...data.list];
  }

  _forEach(newList, o=>{
    let {id, ...data} = o
    let m = _find(list, {id});
    if(m) _merge(m, data)
    else list.push({
      id, ...data
    })
  })

  let over = page_size > newList.length;

  return {
    ...data,
    list, loading:false, over
  }
}

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
  },
  'noticesListRequest': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.payload.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.noticeList = requestPageList(student.noticeList, action.payload.page_no);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'noticesListResult': (state, action) => {
      if(action.error) return state;
      let idx = _findIndex(state.list, {id:action.meta.sid});
      if(idx == -1) return state;

      let list = [...state.list];
      let student = list[idx];
      student.noticeList = resultPageList(student.noticeList, action.payload.records, action.meta.page_no, action.meta.page_size);
      list[idx] = {
        ...student
      }
      return {...state, list};
  },
  'noticesResult': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id: state.selectedId});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    if(!student.noticeList) return state;

    let {id, ...data} = action.payload;
    student.noticeList = resultDetail(student.noticeList, id, data);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'homeworkListRequest':(state, action)=>{
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.payload.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.homeworkList = requestPageList(student.homeworkList, action.payload.page_no);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'homeworkListResult':(state, action)=>{
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.meta.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.homeworkList = resultPageList(student.homeworkList, action.payload.records, action.meta.page_no, action.meta.page_size);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'homeworkResult': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id: state.selectedId});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    if(!student.homeworkList) return state;

    let {id, ...data} = action.payload;
    student.homeworkList = resultDetail(student.homeworkList, id, data);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'monitorListRequest': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.payload.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.monitorList = requestPageList(student.monitorList, action.payload.page_no);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'monitorListResult': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.meta.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.monitorList = resultPageList(student.monitorList, action.payload.records, action.meta.page_no, action.meta.page_size);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'monitorResult': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id: state.selectedId});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    if(!student.monitorList) return state;

    let {id, ...data} = action.payload;
    student.monitorList = resultDetail(student.monitorList, id, data);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'videoListRequest':(state, action)=>{
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.payload.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.videoList = requestPageList(student.videoList, action.payload.page_no);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'videoListResult':(state, action)=>{
    if(action.error) return state;
    let idx = _findIndex(state.list, {id:action.meta.sid});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    student.videoList = resultPageList(student.videoList, action.payload.cameras, action.meta.page_no, action.meta.page_size);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },
  'videoResult': (state, action) => {
    if(action.error) return state;
    let idx = _findIndex(state.list, {id: state.selectedId});
    if(idx == -1) return state;

    let list = [...state.list];
    let student = list[idx];
    if(!student.videoList) return state;

    let {id, ...data} = action.payload;
    student.videoList = resultDetail(student.videoList, id, data);
    list[idx] = {
      ...student
    }
    return {...state, list};
  },


},{
  list:[],
  selectedId:'1',
  relatedList:[],appliedList:[]
})

export var homeworkList = handleActions({
  'selectHomework': (state, action) => ({...state, selectedId:action.payload}),
  'homeworkListResult': (state, action) => (action.error? state : {...state, list:action.payload.records})
},{
  list:[],
  selectedId:'1'
});

export var videoList = handleActions({
  'selectVideo': (state, action) => ({...state, selectedId:action.payload.id, dataset:action.payload.dataset})
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
    { id: '-1', name: '-1', color:'#f00'},
    { id: '0', name: '未知', color:'#f00' },
    { id: '1', name: '进', color:'#ffe1b2' },
    { id: '2', name: '出', color:'#ffd4cd' },
  ],
  list:[]
});

export const messageList = handleActions({
  'selectMessageType': (state, action) => ({...state, selectedTypeId:action.payload}),
  'homeworkNoficeListResult': (state, action) => (action.error ? state : {...state, homeworkList: action.payload.records}),
  'monitorNoficeListResult': (state, action) => (action.error ? state : {...state, monitorList: action.payload.records}),
  'selectMessageSchool': (state, action) => ({...state, schoolId:action.payload.id, dataset:action.payload.dataset}),
  'selectMessageClass': (state, action) => ({...state, classId:action.payload.id, dataset:action.payload.dataset}),
  'selectMessageHomework': (state, action) => ({...state, homeworkId:action.payload.id, dataset:action.payload.dataset}),
  'selectMessageMonitor': (state, action) => ({...state, monitorId:action.payload.id, dataset:action.payload.dataset}),
  'schoolNoficeListRequest': (state, action) => {
    return {...state, schoolPage:action.payload.page_no, schoolLoading: true};
  },
  'schoolNoficeListResult': (state, action) => {
    if(action.error) return state;

    let list = [...state.list];
    if(action.meta.page_no == 1){
      _remove(list, {type:'1'});
    }

    _forEach(action.payload.records, o=>{
      let {id, ...data} = o
      let m = _find(list, {id});
      if(m) _merge(m, data)
      else list.push({
        id, ...data, type:'1'
      })
    })

    let over = false
    if(action.meta.page_size > action.payload.records.length){
      over = true;
    }

    return {...state, list, schoolLoading: false, schoolOver:over};
  },
  'classNoficeListRequest': (state, action) => {
    return {...state, classPage:action.payload.page_no, classLoading: true};
  },
  'classNoficeListResult': (state, action) => {
    if(action.error) return state;

    let list = [...state.list];
    if(action.meta.page_no == 1){
      _remove(list, {type:'2'});
    }

    _forEach(action.payload.records, o=>{
      let {id, ...data} = o
      let m = _find(list, {id});
      if(m) _merge(m, data)
      else list.push({
        id, ...data, type:'2'
      })
    })

    let over = false
    if(action.meta.page_size > action.payload.records.length){
      over = true;
    }

    return {...state, list, classLoading: false, classOver:over};
  },
  'homeworkNoficeListRequest': (state, action) => {
    return {...state, homeworkPage:action.payload.page_no, homeworkLoading: true};
  },
  'homeworkNoficeListResult': (state, action) => {
    if(action.error) return state;

    let list = [...state.homeworkList];
    if(action.meta.page_no == 1){
      list = [];
    }

    _forEach(action.payload.records, o=>{
      let {id, ...data} = o
      let m = _find(list, {id});
      if(m) _merge(m, data)
      else list.push({
        id, ...data
      })
    })

    let over = false
    if(action.meta.page_size > action.payload.records.length){
      over = true;
    }

    return {...state, homeworkList:list, homeworkLoading: false, homeworkOver:over};
  },
  'monitorNoficeListRequest': (state, action) => {
    return {...state, monitorPage:action.payload.page_no, monitorLoading: true};
  },
  'monitorNoficeListResult': (state, action) => {
    if(action.error) return state;

    let list = [...state.monitorList];
    if(action.meta.page_no == 1){
      list = [];
    }

    _forEach(action.payload.records, o=>{
      let {id, ...data} = o
      let m = _find(list, {id});
      if(m) _merge(m, data)
      else list.push({
        id, ...data
      })
    })

    let over = false
    if(action.meta.page_size > action.payload.records.length){
      over = true;
    }

    return {...state, monitorList:list, monitorLoading: false, monitorOver:over};
  },
  'noticesResult': (state, action) => {

    if(action.error) return state;
    let {id, ...data} = action.payload;
    let list = resultDetail({list:state.list}, id, data);
    return {...state, list:list.list};
  },
  'homeworkResult': (state, action) => {
    if(action.error) return state;
    let {id, ...data} = action.payload;
    let homeworkList = resultDetail({list:state.homeworkList}, id, data);
    return {...state, homeworkList:homeworkList.list};
  },
  'monitorResult': (state, action) => {
    if(action.error) return state;
    let {id, ...data} = action.payload;
    return { ...state, monitorList:state.monitorList.map(o=>o.id == id ? {...o, ...data} : o)};
  }
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
  list:[],schoolList:[],classList:[],homeworkList:[],monitorList:[],
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
  'selectMessageSchool': (state, action) => ({...state, schoolId:action.payload.id, dataset:action.payload.dataset}),
  'selectMessageClass': (state, action) => ({...state, classId:action.payload.id, dataset:action.payload.dataset}),
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
