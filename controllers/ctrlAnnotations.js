const db = require('../db/dbConnector.js');


const ctrlAnnotationsGET = async (req, res) => {
    const { rows } = await db.getAnnotations()
    res.send(rows)
}

const ctrlAnnotationGET = async (req, res) => {
    const { id } = req.params
    console.log("annotation id GET: " + id)
    const annotation = await db.getAnnotationById(id)
    res.send(annotation)
}

const ctrlAnnotationPOST = async (req, res) => {
    console.log(req.body)
    const annotation = await db.insertAnnotation(req.body)
    res.send(annotation)
}
const ctrlSearchAnnotationsGET = async (req, res) => {
    const annotations = await db.getSearchAnnotations()
    let toRtn = {
        rows: annotations,
        total: annotations.length
    }
    res.send(toRtn)
}


module.exports = {
    ctrlSearchAnnotationsGET,
    ctrlAnnotationsGET,
    ctrlAnnotationGET,
    ctrlAnnotationPOST,
}