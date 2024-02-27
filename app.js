const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const { method, url: reqUrl } = req;
    const parsedUrl = url.parse(reqUrl, true);

    // Extracting the pathname from the request URL
    const { pathname } = parsedUrl;

    // Handling GET requests to create a file
    if (method === 'GET' && pathname === '/create') {
        const content = 'This is the content of the file to be created.';
        fs.writeFile('./file.txt', content, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('File created successfully');
        });
    }

    // Handling POST requests to update a file
    else if (method === 'POST' && pathname === '/update') {
        const content = 'This is the updated content of the file.';
        fs.writeFile('./file.txt', content, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File updated successfully');
        });
    }
    

    // Handling DELETE requests to delete a file
    else if (method === 'DELETE' && pathname === '/delete') {
        fs.unlink('./file.txt', (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });
    }

    // Handling GET requests to read a file
    else if (method === 'GET' && pathname === '/read') {
        fs.readFile('./file.txt', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    // Handling unsupported methods or routes
    else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
