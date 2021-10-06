const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
 
 
async function query(filterBy = {}) {
    // TODO: Build the criteria with $regex
     const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('category')

    try {
         const categoryes = await collection.find().toArray();
       // var categoryes = await collection.aggregate([
       //     {
       //         $match: filterBy
       //     }
       // ]).toArray()
        console.log('categoryes',categoryes)
        return categoryes
    } catch (err) {
        //console.log('ERROR: cannot find categoryes')
        throw err;
    }
}


async function getById(categoryId) {
    const collection = await dbService.getCollection('category')
    try {
        const category = await collection.findOne({ '_id': ObjectId(categoryId) })
        //delete category.password

       // category.givenReviews = await reviewService.query({ byUserId: ObjectId(category._id) })
       // category.givenReviews = category.givenReviews.map(review => {
       //     delete review.byUser
       //     return review
       // })

    //    //console.log('finding category' ,category)
        return category
    } catch (err) {
        //console.log(`ERROR: while finding category ${categoryId}`)
        throw err;
    }
}
 
async function remove(categoryId) {
    const collection = await dbService.getCollection('category')
    try {
        //bjectId(categoryId)
        await collection.deleteOne({ "_id": ObjectId(categoryId) })
    } catch (err) {
        //console.log(`ERROR: cannot remove category ${categoryId}`)
        throw err;
    }
}


async function add(category) {
    const collection = await dbService.getCollection('category')
    try {
        await collection.insertOne(category);
        return category;
    } catch (err) {
        //console.log(`ERROR: cannot insert category`)
        throw err;
    }
}

async function update(category) {
    //console.log('MIX BACK SERVICE : ',category);
    const collection = await dbService.getCollection('category')
    category._id = ObjectId(category._id);
    try {
        await collection.updateOne({ _id: category._id }, { $set: category })
        return category
    } catch (err) {
        //console.log(`ERROR: cannot update category ${category._id}`)
        throw err;
    }
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = filterBy.name
    }
    
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


