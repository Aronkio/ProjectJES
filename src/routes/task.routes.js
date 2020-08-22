const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.get('/', async(req, res) => {
    const tasks = await Task.find();
    console.log(tasks)
    res.json(tasks)

});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)

})

router.post('/', async(req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description })
    await task.save();
    res.json({ status: 'Task Guardada' });
});

router.put('/:id', async(req, res) => {

    const { title, description } = req.body;
    let datosForm = { title, description };
    let id = req.params.id;
    await Task.findByIdAndUpdate({ _id: id }, datosForm, { useFindAndModify: false })
        .then(() => {
            res.json({ status: 'updated.' });
        })
        .catch(err => {
            res.json({ status: 'Problem when try update one Task.' + err });
        });
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({ status: 'Eliminado' })
})


module.exports = router