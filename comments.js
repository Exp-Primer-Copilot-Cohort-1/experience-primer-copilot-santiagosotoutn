//create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get comments
app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'comments.json'));
});

//add comments
app.post('/comments', (req, res) => {
    const comments = require('./comments.json');
    comments.push(req.body);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(req.body);
});

//update comments
app.put('/comments', (req, res) => {
    const comments = require('./comments.json');
    const { id, text } = req.body;
    const comment = comments.find(comment => comment.id === id);
    comment.text = text;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(comment);
});

//delete comments
app.delete('/comments', (req, res) => {
    const comments = require('./comments.json');
    const { id } = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send('Comment deleted');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

// Path: comments.json
[
    {
        "id": 1,
        "text": "This is a comment"
    }
]