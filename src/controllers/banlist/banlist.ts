import * as Res from "../../services/response";
import * as log from "signale";
import {SQLManager} from "../../managers/SQLManager";

namespace Banlist {

    const types = ['bans', 'mutes', 'kicks', 'warnings'];

    export async function getPunishments(_req: any, res: any) {
        const page: number = +_req.query.page || 1;

        const type = _req.params.type;

        if (types.indexOf(type) <= -1) {
            return Res.not_found(res)
        }

        const result = await SQLManager.knex(`bungeecord.litebans_${type} as punishment`)
            .innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
            .select(getSelectFields(type))
            .orderBy('punishment.id', 'desc')
            .paginate({perPage: 15, currentPage: page})
            .on('query-error', (error: any) => {
                log.error(error);
                return Res.error(res, error);
            });
        if (result.data.length <= 0) {
            return Res.not_found(res);
        }

        Res.success(res, result);
        return;
    }

    export async function getPunishment(_req: any, res: any) {
        const id = _req.params.id;
        const type = _req.params.type;

        if (types.indexOf(type) <= -1) {
            return Res.not_found(res)
        }

        const result = await SQLManager.knex(`bungeecord.litebans_${type} as punishment`)
            .innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
            .select(getSelectFields(type))
            .where('punishment.id', id)
            .on('query-error', (error: any) => {
                log.error(error);
                return Res.error(res, error);
            });
        if (result.length <= 0) {
            return Res.not_found(res);
        }

        Res.success(res, result);
        return;
    }

    export function getSelectFields(type: string): Array<string> {
        const selectFieldsArray = [
            'punishment.id', 'history.name', 'punishment.reason', 'punishment.banned_by_name',
            'punishment.time', 'punishment.until'
        ];
        if (type != 'kicks') {
            selectFieldsArray.push('punishment.removed_by_date', 'punishment.removed_by_name')
        }

        return selectFieldsArray;
    }

    export async function getStats(_req: any, res: any) {
        const data = await SQLManager.knex.raw('SELECT ')
            .on('query-error', (error: any) => {
                log.error(error);
                return Res.error(res, error);
            });
        if (data.length <= 0) {
            return Res.not_found(res);
        }
// SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'test';
        Res.success(res, data);
        return;
    }

}

export default Banlist;
