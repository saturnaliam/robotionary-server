const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

const messages = [];

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

app.listen(port, () => {
    console.log(`open at localhost:${port}`);
})