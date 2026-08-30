import EventEmitter from 'events';
import { registrationNotificationService } from '../notifications/registrationNotificationService.js';
import newAssignmentNotificationService from '../notifications/newAssignmentNotificationService.js';
import resultNotificationService from '../notifications/resultNotificationService.js';
const emitter: EventEmitter = new EventEmitter();
emitter.on('userRegistered', registrationNotificationService);
emitter.on('newAssignment',newAssignmentNotificationService);
emitter.on('newResult',resultNotificationService);
export default emitter ;