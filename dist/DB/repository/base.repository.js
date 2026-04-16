"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne({ filter, projection, }) {
        return this.model.findOne(filter, projection);
    }
    async findById({ id, projection, }) {
        return this.model.findById(id, projection);
    }
    async findByIdAndReplace({ id, update, options, }) {
        return this.model.findByIdAndUpdate(id, update, options);
    }
    async find({ filter, projection, }) {
        return this.model.findById(filter, projection);
    }
    async findByIdAndDelete({ id, options, }) {
        return this.model.findByIdAndDelete(id, options);
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map