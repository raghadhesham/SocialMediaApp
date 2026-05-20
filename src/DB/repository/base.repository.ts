import { UpdateOptions } from "mongodb";
import {
  ModifyResult,
  MongooseUpdateQueryOptions,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from "mongoose";
import {
  HydratedDocument,
  Model,
  PopulatePathToRawDocType,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  Types,
  UpdateQuery,
  Query,
  AnyObject,
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
    _id,
    projection,
  }: {
    _id: Types.ObjectId;
    projection?: ProjectionType<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findById(_id, projection);
  }

  async find({
    filter,
    projection,
  }: {
    filter: QueryFilter<TDocument>;
    projection?: ProjectionType<TDocument>;
  }): Promise<HydratedDocument<TDocument>[]> {
    return this.model.find(filter, projection);
  }

  async findByIdAndDelete({
    id,
    options,
  }: {
    id: Types.ObjectId;
    options: QueryOptions<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    return this.model.findByIdAndDelete(id, options);
  }
  async findByIdAndUpdate({
    id,
    options,
  }: {
    id: Types.ObjectId;
    options: QueryOptions<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    let query = this.model.findByIdAndUpdate(id, options);
    // if (select) {
    //     query = query.select(select);
    // }
    return await query;
  }
  async findOneAndUpdate({
    filter = {},
    update = {},
    options,
  }: {
    filter: QueryFilter<TDocument>;
    update: UpdateQuery<TDocument>;
    options: QueryOptions<TDocument>;
  }): Promise<HydratedDocument<TDocument> | null> {
    let query = this.model.findOneAndUpdate(filter, update, options);
    if (options.select) {
      query = query.select(options.select);
    }
    return await query;
  }

  async findByIdAndReplace({
    filter,
    replacement,
    options,
  }: {
    filter: Query<any, any>;
    replacement: TDocument | AnyObject;
    options: QueryOptions<TDocument> | null;
  }): Promise<HydratedDocument<TDocument> | null> {
    return await this.model.findOneAndReplace(filter, replacement, options);
  }

  async updateMany({
    filter,
    update,
    options,
  }: {
    filter: QueryFilter<TDocument>;
    update: UpdateQuery<TDocument> | UpdateWithAggregationPipeline;
    options?: (UpdateOptions & MongooseUpdateQueryOptions<TDocument>) | null;
  }): Promise<UpdateWriteOpResult> {
    return await this.model.updateMany(filter, update, options);
  }
  async updateOne({
    filter,
    update,
    options,
  }: {
    filter: QueryFilter<TDocument>;
    update: UpdateQuery<TDocument> | UpdateWithAggregationPipeline;
    options: (UpdateOptions & MongooseUpdateQueryOptions<TDocument>) | null;
  }): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(filter, update, options);
  }
}

export default BaseRepository;
