const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json({limit: '75mb'}))
app.use(cors())
const port = 5000;

let messages = [];
let imageData;

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    const { user, message } = req.body;

    if (!user || !message) {
        res.sendStatus(400);
        return;
    }
    
    const newMessage = `${user}: ${message}`;
    messages.push(newMessage);
    res.sendStatus(200);
})

// is this stupid? yes. is this insecure? yes. do i care? not in the slightest
app.delete('/messages', (req, res) => {
    messages = [];
    res.sendStatus(200);
})

app.get('/drawing', (req, res) => {
    res.send(imageData);
});

app.post('/drawing', (req, res) => {
    if (!req.body) {
        res.sendStatus(400);
        return;
    }
    
    imageData = req.body;
\    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`open at http://localhost:${port}`);
})