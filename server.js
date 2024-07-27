const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;

let messages = [];

app.get('/messages', (res) => {
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
app.delete('/messages', () => {
    messages = [];
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`open at localhost:${port}`);
})