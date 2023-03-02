const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Temporary
const users = JSON.parse(fs.readFileSync(__dirname + '/../db/users.json'));

const usersController = {
    
    store: (req, res) => {
        let newUser = {
            userId: uuidv4(),
            name: req.body.name,
            tag: '#' + Math.floor(1000 + Math.random() * 9000),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        // Temporary
        users.push(newUser);
        usersJSON = JSON.stringify(users);
        fs.writeFileSync(__dirname + '/../db/users.json', usersJSON);

        res.send({
            code: 200,
            status: 'success',
            data: newUser
        })
    },

    login: (req, res) => {
        users.map(user => {
            if (user.email === req.body.email) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({
                        code: 200,
                        status: 'success',
                        data: user
                    });
                } else {
                    res.send({
                        code: 400,
                        status: 'error',
                        msg: 'Incorrect email or password',
                    })
                }
            }
        })

        res.send({
            code: 400,
            status: 'error',
            msg: 'Incorrect email or password',
        })

    },

    list: (req, res) => {
        res.send(users);
    },

    delete: (req, res) => {
        let index = users.findIndex(user => user.userId === req.body.userId);

        if (index !== -1) {
            users.splice(index, 1);
            usersJSON = JSON.stringify(users);
            fs.writeFileSync(__dirname + '/../db/users.json', usersJSON);

            res.send({
                code: 200,
                status: 'success',
                msg: 'User deleted successfully'
            });
        } else {
            res.send({
                code: 400,
                status: 'error',
                msg: 'User not found'
            });
        }
    },

    getUserById: (req, res) => {
        let index = users.findIndex(user => user.userId === req.params.userId);

        if (index !== -1) {
            res.send({
                code: 200,
                status: 'success',
                data: users[index],
            })
        } else {
            res.send({
                code: 400,
                status: 'error',
                msg: 'User not found'
            })
        }
    }
}

module.exports = usersController;