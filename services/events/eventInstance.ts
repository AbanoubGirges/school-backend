import EventEmitter from 'events';
import { registrationNotificationService } from '../notifications/registrationNotificationService.js';
const emitter: EventEmitter = new EventEmitter();
emitter.on('userRegistered', registrationNotificationService);
emitter.on('newAssignment',)
export default emitter ;