const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const db_end="Proyecto"

async function mongo_find(coleccion_querry,query){
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
    
        try {
            const db = client.db(db_end);
            let collection = db.collection(coleccion_querry);
            // let query = { name: 'Volkswagen' }             let res = await collection.findOne(query);
          
            let res = await collection.find(query);

            return res;
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }


    async function mongo_inserty(coleccion_insersion,insert){
        const client = await MongoClient.connect(url, { useNewUrlParser: true })
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
    
        try {
            const db = client.db(db_end);

            let collection = db.collection(coleccion_insersion);
            // let query = { name: 'Volkswagen' }             let res = await collection.findOne(query);
          
            let res = await collection.insertMany(insert);

            return res;
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }

module.exports = {

    mongo_find:mongo_find,
    mongo_inserty:mongo_inserty
    
};
