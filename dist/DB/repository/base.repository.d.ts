import { HydratedDocument, Model, ProjectionType, QueryFilter, QueryOptions, Types, UpdateQuery } from "mongoose";
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
    findByIdAndReplace({ id, update, options, }: {
        id: Types.ObjectId;
        update: UpdateQuery<TDocument>;
        options: QueryOptions<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    find({ filter, projection, }: {
        filter: QueryFilter<TDocument>;
        projection?: ProjectionType<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
    findByIdAndDelete({ id, options, }: {
        id: Types.ObjectId;
        options: QueryOptions<TDocument>;
    }): Promise<HydratedDocument<TDocument> | null>;
}
export default BaseRepository;
//# sourceMappingURL=base.repository.d.ts.map