module.exports = function(request, response){
  var fs = require('fs');
  console.log('client request URL: ', request.url);
  if (request.url === '/'){
    fs.readFile('./views/index.html', 'utf8', function (errors, contents){
      if(errors){
        response.end('File not found!!!');
      }
      else{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(contents);
        response.end();
      }
    });
  }
  else{
    extension = request.url.split('.').pop();
    // console.log(extension);
    if (extension === 'html'){
      fs.readFile('./views/'+request.url, 'utf8', function (errors, contents){
        if(errors){
          response.end('File not found!!!');
        }
        else{
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.write(contents);
          response.end();
        }
      });
    }
    else if (extension === 'css'){
      fs.readFile('.'+request.url, 'utf8', function (errors, contents){
        if(errors){
          response.end('File not found!!!');
        }
        else{
          response.writeHead(200, {'Content-Type': 'text/css'});
          response.write(contents);
          response.end();
        }
      });
    }
    else if (extension === 'jpg' || extension === 'png' || extension === 'gif'){
      fs.readFile('.'+request.url, function (errors, contents){
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.write(contents);
        response.end();
      });
    }
  }
};

// var fs = require('fs');
// var path = require('path');
//
// module.exports = function (request, response){
//   console.log(request.url);
//   console.log('./views'+path.basename(request.url));
// 	fs.exists('./views/'+request.url, function(exists) {
// 		if(exists) {
// 			if(request.url === '/') {
// 				fs.readFile('./views/index.html', 'utf8', function(errors, contents) {
// 					response.write(contents);
// 					response.end();
// 				})
// 			} else {
// 				fs.readFile('./views/'+path.basename(request.url), function(errors, contents) {
// 					response.write(contents);
// 					response.end();
// 				})
// 			}
// 		} else {
// 			response.end('File not Found!!!');
// 		}
// 	})
// };
