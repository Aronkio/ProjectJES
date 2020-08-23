const mongoose = require('mongoose')
const { Schema } = mongoose;

const TaskSchema = new Schema({
    NodeFiscalia: { type: String, required: true },
    NombreFiscalia: { type: String, required: true },
    DireccionFiscalia: { type: String, required: true },
    TelefonoFiscalia: { type: String, required: true },




})

module.exports = mongoose.model('Task', TaskSchema);