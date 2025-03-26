/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { SteamService } from './steam.service';

//take

@Controller('steam')
export class SteamController {
    constructor(private readonly steamService: SteamService) { }

    @Get('player/:steamId')
    async getPlayer(@Param('steamId') steamId: string) {
        return await this.steamService.getPlayerSummary(steamId);
    }

    @Get('player/:steamId/friends')
    async getFriends(@Param('steamId') steamId: string) {
        return this.steamService.getFriendList(steamId);
    }

    @Get('player/:steamId/friends/details')
    async getFriendsWithDetails(@Param('steamId') steamId: string) {
        return this.steamService.getFriendListWithDetails(steamId);
    }
}
