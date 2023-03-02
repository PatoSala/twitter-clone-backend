const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Temporary
const twitts = JSON.parse(fs.readFileSync(__dirname + '/../db/twitts.json'));

const twittsController = {
    
    store: (req, res) => {
        let newTwitt = {
            twittId: uuidv4(),
            owner: {
                id: req.body.ownerId,
                tag: req.body.ownerTag,
                name: req.body.ownerName,
            },
            content: req.body.content,
            likes: []
        }
        console.log(newTwitt);

        // Temporary
        twitts.unshift(newTwitt);
        twittsJSON = JSON.stringify(twitts);
        fs.writeFileSync(__dirname + '/../db/twitts.json', twittsJSON);

        res.send({
            code: 200,
            status: 'success',
            data: newTwitt
        })
    },

    like: (req, res) => {
        
        let index = twitts.findIndex(twitt => twitt.twittId === req.body.twittId);

        if (index !== -1) {
            twitts[index].likes.push({
                userId: req.body.userId,
            })
        } else {
            res.send({
                code: 400,
                status: 'error',
                msg: 'Twitt not found'
            })
        }

        twittsJSON = JSON.stringify(twitts);
        fs.writeFileSync(__dirname + '/../db/twitts.json', twittsJSON);

        res.send({
            code: 200,
            status: 'success',
            msg: 'Twitt liked succesfully',
            data: twitts[index]
        });
    },

    unlike: (req, res) => {
        let index = twitts.findIndex(twitt => twitt.twittId === req.body.twittId);

        if (index !== -1) {
            let secondIndex = twitts[index].likes.findIndex(like => like.userId === req.body.userId);

            if (secondIndex !== -1) {
                let updatedLikes = twitts[index].likes;
                console.log(updatedLikes);
                updatedLikes.splice(secondIndex, 1);

                twitts[index].likes = updatedLikes;
                twittsJSON = JSON.stringify(twitts);
                fs.writeFileSync(__dirname + '/../db/twitts.json', twittsJSON);

                res.send({
                    code: 200,
                    status: 'success',
                    msg: 'Twitt like removed',
                    data: twitts[index]
                })
            } else {
                res.send({
                    code: 400,
                    status: 'error',
                    msg: 'Couldn\'t remove like'
                })
            }
        } else {
            res.send({
                code: 400,
                status: 'error',
                msg: 'Twitt not found'
            })
        }
    },

    delete: (req, res) => {
        let index = twitts.findIndex(twitt => twitt.twittId === req.body.twittId);

        if (index !== -1) {
            twitts.splice(index, 1);
            twittsJSON = JSON.stringify(twitts);
            fs.writeFileSync(__dirname + '/../db/twitts.json', twittsJSON);

            res.send({
                code: 200,
                status: 'success',
                msg: 'Twitt deleted successfully'
            });
        } else {
            res.send({
                code: 400,
                status: 'error',
                msg: 'Twitt not found'
            });
        }
    },

    list: (req, res) => {
        res.send(twitts)
    },

    getTwittById: (req, res) => {
        let index = twitts.findIndex(twitt => twitt.twittId === req.params.twittId);

        if (index !== -1) {
            res.send({
                code: 200,
                status: 'success',
                data: twitts[index]
            })
        } else {
            res.send({
                code: 404,
                status: 'error',
                msg: 'Twitt not found'
            })
        }
    },

    getUserTwitts: (req, res) => {
        let userTwitts = [];

        twitts.forEach(twitt => {
            if (twitt.owner.id === req.params.userId) {
                userTwitts.push(twitt);
            }
        })

        res.send({
            code: 200,
            status: 'success',
            data: userTwitts
        })
    }
}

module.exports = twittsController;