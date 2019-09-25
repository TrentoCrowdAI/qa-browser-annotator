require('dotenv').config()
const uuid = require('uuid/v1');


const Pool = require('pg').Pool
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const TABLE_NAME_ANNOTATIONS = "annotations"

const getSearchAnnotations = async function(webpageurl) {
    let annotations = await pool.query('SELECT * FROM ' + TABLE_NAME_ANNOTATIONS + ' WHERE webpageurl = $1;', [webpageurl]);    
    if (annotations.rows && annotations.rows.length) {
        return annotations.rows[0]
    } else {
        return {}
    }
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
const insertAnnotation = async function(pageurl, annotation) {
    annotation.annotation_id = uuid()

    let webpageEntry = await getSearchAnnotations(pageurl);

    if (webpageEntry && webpageEntry.data) {
        let allAnnotations = webpageEntry.data
        allAnnotations.push(annotation)
        await pool.query('UPDATE ' + TABLE_NAME_ANNOTATIONS + ' SET data = $1 WHERE id = $2;', [JSON.stringify(allAnnotations), webpageEntry.id]);
    } else {
        await pool.query('INSERT INTO ' + TABLE_NAME_ANNOTATIONS + '(webpageurl, data) VALUES($1, $2);', [pageurl, JSON.stringify([annotation])]);
    }
    return true;
}

module.exports = {
    getSearchAnnotations,
    getAnnotations,
    getAnnotationById,
    insertAnnotation,
}