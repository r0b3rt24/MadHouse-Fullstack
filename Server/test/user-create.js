const assert = require("assert");
const User = require("../models/user");

describe('Creating documents', () => {
    it('creates a new user', (done) => {
        const user = new User({ 
            username: 'TestUser-001',
            firstname: 'TestFirstName',
            lastname: 'TestLastName',
            phone: '6084403075',
            email: 'hcao29@wisc.edu',
        });
        user.save() //takes some time and returns a promise
            .then(() => {
                assert(!user.isNew); //if poke is saved to db it is not new
                done();
            });
    });
});