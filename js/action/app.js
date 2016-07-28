import { createAction } from 'redux-actions';

export var login = createAction('memberLoginResult', params=>Promise.resolve(params), params=>params);

export var selectStudent = createAction('selectStudent');

export var selectHomework = createAction('selectHomework');

export var selectVideo = createAction('selectVideo');

export var selectAttence = createAction('selectAttence');

export var selectMessageType = createAction('selectMessageType');

export var selectContact = createAction('selectContact');
