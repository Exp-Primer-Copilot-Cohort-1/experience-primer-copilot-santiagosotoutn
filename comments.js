//create web server
//create express app
const express = require('express');
const app = express();
//create body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//create comments array
const comments = [];
//create comment counter
let commentCounter = 1;
//create post request
app.post('/comments', (req, res) => {
    const comment = {
        id: commentCounter++,
        text: req.body.text
    };
    comments.push(comment);
    res.json(comment);
});
//create get request by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
});

//create put request
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    comment.text = req.body.text;
    res.json(comment);
});

//create delete request
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    comments.splice(index, 1);
    res.json({ id: parseInt(req.params.id) });
});
//listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});