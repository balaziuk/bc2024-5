const { program } = require('commander');
const express = require('express');
const path = require('path'); 
const app = express();

program
    .requiredOption('-h, --host <host>', 'server address')
    .requiredOption('-p, --port <port>', 'server port')
    .requiredOption('-c, --cache <cache>', 'path to the cache');

program.parse(process.argv);

const { host, port, cache } = program.opts(); 

if (!host || !port || !cache) {
    console.error('All options -h, -p, -c are necessary!');
    process.exit(1);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'UploadForm.html'));
});

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
