import { CACHE_MANAGER, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class CacheMiddleware implements NestMiddleware {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.method !== 'GET') {
            await this.cacheManager.reset()
        }
        
        next();
    }
}