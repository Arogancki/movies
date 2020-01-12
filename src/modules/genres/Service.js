module.exports = class GenresService {
    constructor({ genresRepository }) {
        this.repository = genresRepository;
    }
    getId(name) {
        return this.repository.getId(name);
    }
};
