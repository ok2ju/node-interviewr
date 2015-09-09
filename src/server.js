import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import api from './routes/api';

const app = express();

app.set('port', process.env.PORT || config.get('port'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
api(app);

app.use(function(err, req, res) {
  console.error(err.stack);
  res.send(500, {message: err.message});
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
