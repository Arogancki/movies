const NotFoundError = require("../../common/NotFoundError");
const CommentsFacade = require("./Facade");

module.exports = class CommentsService {
    constructor({ moviesService, commentsRepository }) {
        Object.assign(this, {
            moviesService,
            repository: commentsRepository,
        });
    }

    async _getMovie(query) {
        const [movie] = await this.moviesService.get(query);
        if (!movie) {
            throw new NotFoundError();
        }
        return movie;
    }

    async get(query) {
        let comments = [];
        if (query.id || query.title) {
            const { id } = await this._getMovie(query);
            comments = [await this.repository.getByMovieId(id)];
        } else {
            comments = await this.repository.getAll();
        }
        return comments.filter(Boolean).map(comment => new CommentsFacade(comment));
    }

    async post(body) {
        const { id } = await this._getMovie(body);
        await this.repository.add(id, body.comment);
        return { movieId: id };
    }
};
