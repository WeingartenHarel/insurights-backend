const logger = require('../../services/logger.service')
const categoryService = require('./category.service')

// TODO: needs error handling! try, catch

async function getItems(req, res) {
    try {
        //console.log()
        const categoryes = await categoryService.query(req.query)
        ////console.log('categoryes',categoryes)
        res.send(categoryes)
    } catch (err) {
        logger.error('Cannot get categoryes controller', err);
        res.status(500).send({ error: 'cannot get categoryes controller' })

    }
}

async function getItem(req, res) {
    ////console.log('category controller',req.params.id)
    const category = await categoryService.getById(req.params.id)
    ////console.log('category controller',category)
    res.send(category)
}

async function deleteItem(req, res) {
    //console.log('category controller delete',req.params.id)
    try {
        await categoryService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete category', err);
        res.status(500).send({ error: 'cannot delete category' })
    }
}

async function addItem(req, res) {
    try {
        var category = req.body;
        category = await categoryService.add(category)
    } catch (err) {
        logger.error('Cannot add category', err);

    }
   
    //category.byUser = req.session.category;
    // TODO - need to find aboutUser
    //category.aboutUser = {}
    res.send(category)
}

async function updateItem(req, res) {
    try{
        const category = req.body;
        //console.log('controlller updateItem',category)
        
        await categoryService.update(category)
        res.send(category)
    }catch(err){
        //console.log(' CUS AMAK ERORR IN UPDATEING BLYAT !!!!!!!!!!!!! :',err);
    }
}

module.exports = {
    getItems,
    getItem,
    deleteItem,
    addItem,
    updateItem
}