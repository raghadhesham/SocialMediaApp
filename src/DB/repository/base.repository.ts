import {
  HydratedDocument,
  Model,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  Types,
  UpdateQuery,
} from "mongoose";

abstract class BaseRepository<TDocument> {
  constructor(protected readonly model: Model<TDocument>) {}
  async create(data: Partial<TDocument>): Promise<HydratedDocument<TDocument>> {
    return this.model.create(data);
  }

  async findOne({
    filter,
    projection,
  }: {
    filter?: QueryFilter<TDocument>;
    projection?: ProjectionType<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findOne(filter, projection);
  }

  async findById({
    id,
    projection,
  }: {
    id: Types.ObjectId;
    projection?: ProjectionType<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findById(id, projection);
    }
    
  async findByIdAndReplace({
      id,
      update,
    options,
  }: {
    id: Types.ObjectId,
    update: UpdateQuery<TDocument>,
      options: QueryOptions<TDocument>
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async find({
    filter,
    projection,
  }: {
    filter: QueryFilter<TDocument>;
    projection?: ProjectionType<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findById(filter, projection);
  }

  async findByIdAndDelete({
    id,
    options,
  }: {
    id: Types.ObjectId;
    options: QueryOptions<TDocument>
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findByIdAndDelete(id, options);
  }
}

export default BaseRepository;
