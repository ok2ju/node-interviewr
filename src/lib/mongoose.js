import mongoose from 'mongoose';
import config from '../config';

console.log('CONNECT');
mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

export default mongoose;
