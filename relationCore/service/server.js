const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')
const childProcess = require('child_process');
const { actionsMap } = require('./controller');

const DIR_NAME = path.join(__dirname, '../');
const WEB_DIR = path.join(DIR_NAME, '/web/dist');

//映射到web路径
const webFileResolve = (filePath) => {
    //资源合法性检查
    if (!/^[a-z|A-Z|\d|\/|=?&]+$/.test) {
        return path.join(WEB_DIR, '');
    }
    return path.join(WEB_DIR, filePath);
}

//创建服务器
http.createServer(function(request, response) {
    const reqName = url.parse(request.url).pathname;

    console.log("Request for " + reqName + "  received.");

    //判断是否为接口路径
    if (actionsMap[reqName]) {
        actionsMap[reqName](request, response);
        response.end();
        return;
    }
    //解析请求，包括文件名
    let pathname = webFileResolve(reqName);

    //从文件系统中都去请求的文件内容
    fs.readFile(pathname, function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data.toString());
        }
        response.end();
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

childProcess.exec('start http://127.0.0.1:8081/index.html')