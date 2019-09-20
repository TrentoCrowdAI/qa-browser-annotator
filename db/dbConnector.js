require('dotenv').config()

const Pool = require('pg').Pool
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const TABLE_NAME_ANNOTATIONS = "annotations"

const getSearchAnnotations = async function() {
    let annotations = await pool.query('SELECT annotation FROM ' + TABLE_NAME_ANNOTATIONS + ';');    
    return annotations.rows.map(element => element.annotation)
}
const getAnnotations = async function() {
    return await pool.query('SELECT * FROM ' + TABLE_NAME_ANNOTATIONS + ';');
}
const getAnnotationById = async function(id) {
    const annotations = await pool.query('SELECT * FROM ' + TABLE_NAME_ANNOTATIONS + ' WHERE id = $1;', [id]);
    if (!annotations.rows) {
        return {};
    }
    return annotations.rows[0];
}
const insertAnnotation = async function(annotation) {
    const annotationRtn = await pool.query('INSERT INTO ' + TABLE_NAME_ANNOTATIONS + '(username, webpageurl, annotation) VALUES($1, $2, $3) RETURNING *;', ["test", "testUrl", annotation]);
    return annotationRtn;
}

module.exports = {
    getSearchAnnotations,
    getAnnotations,
    getAnnotationById,
    insertAnnotation,
}