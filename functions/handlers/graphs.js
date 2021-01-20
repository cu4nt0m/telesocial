const { db } = require('../util/admin');

exports.getAllGraphs = (req, res) => {
    db.collection('graphs').orderBy('createdAt','desc').get()
    .then(data => {
        let graphs = [];
        data.forEach(doc => {
            graphs.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount
            });
        });
        return res.json(graphs);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.code})
    });
}

exports.postOneGraph = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty'});
    }
    
    const newGraph = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db.collection('graphs').add(newGraph)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully.`})
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong!'});
            console.error(err);
        })
}