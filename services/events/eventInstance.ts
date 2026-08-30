import EventEmitter from 'events';
import { registrationNotificationService } from '../notifications/registrationNotificationService.js';
import newAssignmentNotificationService from '../notifications/newAssignmentNotificationService.js';
const emitter: EventEmitter = new EventEmitter();
emitter.on('userRegistered', registrationNotificationService);
emitter.on('newAssignment',newAssignmentNotificationService);
emitter.on('newResult',);
export default emitter ;