const http = require('http');
const fs = require('fs');
const os = require('os');

fs.writeFileSync('visitors.log', '', { flag: 'a' });

http.createServer((req, res) => {

    if (req.url == '/updateuser') {
        fs.appendFileSync('visitors.log', new Date() + "\n");
        res.end("updated");
    }

    else if (req.url == '/savelog') {
        res.end(fs.readFileSync('visitors.log'));
    }

    else if (req.url == '/backup' && req.method == 'POST') {
        fs.copyFileSync('visitors.log', 'backup.log');
        res.end("backup done");
    }

    else if (req.url == '/clearlog') {
        fs.writeFileSync('visitors.log', '');
        res.end("cleared");
    }

    else if (req.url == '/serverinfo') {
        res.end(JSON.stringify({
            host: os.hostname(),
            os: os.platform()
        }));
    }

    else {
        res.end("wrong route");
    }

}).listen(3000, () => {
    console.log("Server running on port 3000");
});