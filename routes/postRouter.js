import express from 'express'

let postRouter = express.Router();


postRouter.get('/', (req, res) => {

    return res.status(200).send("Post Responding for the GET");

});

postRouter.post('/', (req, res) => {

    return res.status(200).send("Post Responding for the POST");

});

postRouter.put('/', (req, res) => {
    return res.status(200).send("Post Responding for the PUT");
});

postRouter.delete('/', (req, res) => {

    return res.status(200).send("Post Responding for the DELETE");

});


export default postRouter;