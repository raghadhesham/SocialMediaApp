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
    async find({ filter, projection, }) {
        return this.model.findById(filter, projection);
    }
    async findByIdAndDelete({ id, options, }) {
        return this.model.findByIdAndDelete(id, options);
    }
    async findByIdAndUpdate({ id, options, }) {
        let query = this.model.findByIdAndUpdate(id, options);
        // if (select) {
        //     query = query.select(select);
        // }
        return await query;
    }
    async findOneAndUpdate({ filter = {}, update = {}, options, }) {
        let query = this.model.findOneAndUpdate(filter, update, options);
        if (options.select) {
            query = query.select(options.select);
        }
        return await query;
    }
    async findByIdAndReplace({ filter, replacement, options, }) {
        return await this.model.findOneAndReplace(filter, replacement, options);
    }
    async updateMany({ filter, update, options, }) {
        return await this.model.updateMany(filter, update, options);
    }
    async updateOne({ filter, update, options, }) {
        return await this.model.updateOne(filter, update, options);
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=base.repository.js.map