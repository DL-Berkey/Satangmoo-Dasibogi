import { Request as ExpressRequest, Response } from "express";

declare module "express" {
    interface Request extends ExpressRequest {
        // ...
    }

    type SS = "string";
}
