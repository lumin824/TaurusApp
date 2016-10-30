import { createAction } from 'redux-actions';

import ImagePicker from 'react-native-image-picker';

export var selectStudent = createAction('selectStudent');

export var selectHomework = createAction('selectHomework');

export var selectVideo = createAction('selectVideo');

export var selectAttence = createAction('selectAttence');

export var selectMessageType = createAction('selectMessageType');

export const selectContactType = createAction('selectContactType');

export var selectContact = createAction('selectContact');

export var setAppWidth = createAction('setAppWidth');

export var selectSchool = createAction('selectSchool');
export var selectGrade = createAction('selectGrade');
export var selectClass = createAction('selectClass');


export var selectMessageSchool = createAction('selectMessageSchool');
export var selectMessageClass = createAction('selectMessageClass');
export var selectMessageHomework = createAction('selectMessageHomework');
export var selectMessageMonitor = createAction('selectMessageMonitor');


export var imagePicker = createAction('imagePicker', params=>new Promise((resolve, reject)=>{
  ImagePicker.showImagePicker({
    title:'请选择',
    takePhotoButtonTitle:'用照相机拍照',
    chooseFromLibraryButtonTitle:'1111',
    cancelButtonTitle:'取消'
  },(e)=>{console.log(e);e.uri?resolve({uri:e.uri,fileSize:e.fileSize}):reject('cancel')});
}));

import { info } from 'react-native-hik';
info().then(console.log);
