const connectToDatabase = require("../models/db");

router.get('/', async (req, res) => {
    try {
        const db = connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

router.get('/:id', async (req, res) => {
    try {
        
        const db = connectToDatabase();
        const collection = db.collection("gifts");

        const id = req.params.id;

        const gift=db.collection.findOne({id:id});

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.status(200).json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        res.status(201).json(gift.ops[0]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
