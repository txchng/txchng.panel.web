var gulp = require("gulp");
var sftp = require('gulp-sftp-up4');

var distFolder = './dist/';

function publish(){
    return gulp
      .src([distFolder + '**/*'])
      .pipe(sftp({
          host: '116.203.75.73',
          user: 'root',
          pass: '2542mohsen56',
          remotePath:'/projects/exchange/panelSite/'
      }));
  }

exports.publish = publish;
