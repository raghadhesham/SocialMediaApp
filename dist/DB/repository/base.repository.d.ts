import { UpdateOptions } from "mongodb";
import { MongooseUpdateQueryOptions, UpdateWithAggregationPipeline, UpdateWriteOpResult } from "mongoose";
import { HydratedDocument, Model, ProjectionType, QueryFilter, QueryOptions, Types, UpdateQuery, Query, AnyObject } from "mongoose";
declare abstract class BaseRepository<TDocument> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
    create(data: Partial<TDocument>): Promise<HydratedDocument<TDocument>>;
    findOne({ filter, projection, }: {
        filter?: QueryFilter<TDocument>;
        projection?: ProjectionType<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findById({ id, projection, }: {
        id: Types.ObjectId;
        projection?: ProjectionType<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    find({ filter, projection, }: {
        filter: QueryFilter<TDocument>;
        projection?: ProjectionType<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndDelete({ id, options, }: {
        id: Types.ObjectId;
        options: QueryOptions<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndUpdate({ id, options, }: {
        id: Types.ObjectId;
        options: QueryOptions<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findOneAndUpdate({ filter, update, options, }: {
        filter: QueryFilter<TDocument>;
        update: UpdateQuery<TDocument>;
        options: QueryOptions<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndReplace({ filter, replacement, options, }: {
        filter: Query<any, any>;
        replacement: TDocument | AnyObject;
        options: QueryOptions<TDocument> | null;
    }): Promise<HydratedDocument<TDocument> | null>;
    updateMany({ filter, update, options, }: {
        filter: QueryFilter<TDocument>;
        update: UpdateQuery<TDocument> | UpdateWithAggregationPipeline;
        options?: (UpdateOptions & MongooseUpdateQueryOptions<TDocument>) | null;
    }): Promise<UpdateWriteOpResult>;
    updateOne({ filter, update, options, }: {
        filter: QueryFilter<TDocument>;
        update: UpdateQuery<TDocument> | UpdateWithAggregationPipeline;
        options: (UpdateOptions & MongooseUpdateQueryOptions<TDocument>) | null;
    }): Promise<UpdateWriteOpResult>;
}
export default BaseRepository;
//# sourceMappingURL=base.repository.d.ts.map