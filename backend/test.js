import http from 'http';
const server = http.createServer((req, res) => {
    res.end('ok');
});
server.listen(5001, () => {
    console.log('Server running on 5001');
});
