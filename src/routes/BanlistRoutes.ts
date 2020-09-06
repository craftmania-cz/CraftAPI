import {NextFunction, Request, Response, Router} from 'express';
import * as Res from "../services/response";
import Banlist from "../controllers/banlist/banlist";

export class BanlistRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public unknownRoute(_req: Request, res: Response, _next: NextFunction) {
        res.status(200).json(Res.property_required(res, 'Unknown route').json);
    }

    public init() {

        // Name routes
        this.router.get('/', this.unknownRoute);
        this.router.get('/:type', Banlist.getPunishments);
        this.router.get('/:type/:id', Banlist.getPunishment)

    }
}

const banlistRoutes = new BanlistRoutes();
banlistRoutes.init();

export default banlistRoutes.router;
