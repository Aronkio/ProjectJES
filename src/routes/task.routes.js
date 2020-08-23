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
    const { NodeFiscalia, NombreFiscalia, DireccionFiscalia, TelefonoFiscalia } = req.body;
    const task = new Task({ NodeFiscalia, NombreFiscalia, DireccionFiscalia, TelefonoFiscalia })
    await task.save();
    res.json({ status: 'Fiscalia Guardada' });
});

router.put('/:id', async(req, res) => {

    const { NodeFiscalia, NombreFiscalia, DireccionFiscalia, TelefonoFiscalia } = req.body;
    let datosForm = { NodeFiscalia, NombreFiscalia, DireccionFiscalia, TelefonoFiscalia };
    let id = req.params.id;
    await Task.findByIdAndUpdate({ _id: id }, datosForm, { useFindAndModify: false })
        .then(() => {
            res.json({ status: 'Fiscalia Actualizada' });
        })
        .catch(err => {
            res.json({ status: 'Problema al Actualizar la Fiscalia' + err });
        });
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({ status: 'Fiscalia Eliminada' })
})


module.exports = router