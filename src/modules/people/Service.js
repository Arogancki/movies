module.exports = class PeopleService {
    constructor({ peopleRepository }) {
        this.repository = peopleRepository;
    }
    getId(name) {
        return this.repository.getId(name);
    }
};
