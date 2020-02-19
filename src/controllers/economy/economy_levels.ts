import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";
import LevelUtils from "../../utils/LevelUtils";
import EconomyLevelPlayer from "../../utils/interfaces/EconomyLevelPlayer";

const con = getConnection();

namespace EconomyTopLevels {

	const calcPercentage = (first: number, second: number) => {
		return first / (second / 100);
	};

	export async function getTopGlobalLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, global_level, groups FROM player_profile ORDER BY global_level DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
				index++;
				finalResults.push({
					"index": index,
					"nick": player.nick,
					"uuid": player.uuid,
					"level": player.global_level,
					"groups": JSON.parse(player.groups)
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopCreativeLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, creative_level, creative_experience, groups FROM player_profile ORDER BY creative_level DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: EconomyLevelPlayer, index: number) => {
				index++;
				const levelPercentage = calcPercentage(player.creative_experience, LevelUtils.getExpFromLevelToNext(player.creative_level));
				finalResults.push({
					"index": index,
					"nick": player.nick,
					"uuid": player.uuid,
					"level": player.creative_level,
					"experience": player.creative_experience,
					"toNextLevel": LevelUtils.getExpFromLevelToNext(player.creative_level),
					"percentage": levelPercentage,
					"groups": JSON.parse(player.groups)
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopSurvivalLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, survival_level, survival_experience, groups FROM player_profile ORDER BY survival_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: EconomyLevelPlayer, index: number) => {
					index++;
					const levelPercentage = calcPercentage(player.survival_experience, LevelUtils.getExpFromLevelToNext(player.survival_level));
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.survival_level,
						"experience": player.survival_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.survival_level),
						"percentage": levelPercentage,
						"groups": JSON.parse(player.groups)
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopSkyblockLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, skyblock_level, skyblock_experience, groups FROM player_profile ORDER BY skyblock_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: EconomyLevelPlayer, index: number) => {
					index++;
					const levelPercentage = calcPercentage(player.skyblock_experience, LevelUtils.getExpFromLevelToNext(player.skyblock_level));
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.skyblock_level,
						"experience": player.skyblock_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skyblock_level),
						"percentage": levelPercentage,
						"groups": JSON.parse(player.groups)
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopVanillaLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, vanilla_level, vanilla_experience, groups FROM player_profile ORDER BY vanilla_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: EconomyLevelPlayer, index: number) => {
					index++;
					const levelPercentage = calcPercentage(player.vanilla_experience, LevelUtils.getExpFromLevelToNext(player.vanilla_level));
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.vanilla_level,
						"experience": player.vanilla_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.vanilla_level),
						"percentage": levelPercentage,
						"groups": JSON.parse(player.groups)
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

	export async function getTopSkycloudLevels(_req: any, res: any) {
		await con.query('SELECT nick, uuid, skycloud_level, skycloud_experience, groups FROM player_profile ORDER BY skycloud_level DESC LIMIT 50;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((player: EconomyLevelPlayer, index: number) => {
					index++;
					const levelPercentage = calcPercentage(player.skycloud_experience, LevelUtils.getExpFromLevelToNext(player.skycloud_level));
					finalResults.push({
						"index": index,
						"nick": player.nick,
						"uuid": player.uuid,
						"level": player.skycloud_level,
						"experience": player.skycloud_experience,
						"toNextLevel": LevelUtils.getExpFromLevelToNext(player.skycloud_level),
						"percentage": levelPercentage,
						"groups": JSON.parse(player.groups)
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

}

export default EconomyTopLevels;
