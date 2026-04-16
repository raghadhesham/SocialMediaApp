import { NextFunction } from "express";
import { ZodType } from "zod";
type reqType = keyof Request;
type schemaType = Partial<Record<reqType, ZodType>>;
export declare const Validation: (schema: schemaType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=validation.d.ts.map