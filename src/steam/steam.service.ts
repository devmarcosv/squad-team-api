import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SteamService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getPlayerSummary(steamId: string) {
        const apiKey = this.configService.get<string>('STEAM_API_KEY');
        const apiUrl = this.configService.get<string>('STEAM_API_URL');

        const url = `${apiUrl}/ISteamUser/GetPlayerSummaries/v2/`;
        const params = {
            key: apiKey,
            steamids: steamId,
        };

        const { data } = await firstValueFrom(
            this.httpService.get(url, { params }),
        );

        return data.response.players[0] || null;
    }

    async getFriendList(steamId: string) {
        try {
            const apiKey = this.configService.get<string>('STEAM_API_KEY');
            const apiUrl = this.configService.get<string>('STEAM_API_URL');

            const url = `${apiUrl}/ISteamUser/GetFriendList/v1/`;
            const params = {
                key: apiKey,
                steamid: steamId,
                relationship: 'friend', // Tipo de relação (friend, all, etc.)
            };

            const response = await firstValueFrom(
                this.httpService.get(url, { params }),
            );

            if (!response.data.friendslist?.friends) {
                throw new Error('Lista de amigos não encontrada ou perfil privado');
            }

            return response.data.friendslist.friends;
        } catch (error) {
            throw new Error(`Erro ao buscar amigos: ${error.message}`);
        }
    }

    // steam.service.ts
    async getFriendListWithDetails(steamId: string) {
        const friends = await this.getFriendList(steamId);
        const friendIds = friends.map(friend => friend.steamid).join(',');

        // Busca detalhes dos amigos
        const url = `${this.configService.get('STEAM_API_URL')}/ISteamUser/GetPlayerSummaries/v2/`;
        const params = {
            key: this.configService.get('STEAM_API_KEY'),
            steamids: friendIds,
        };

        const response = await firstValueFrom(
            this.httpService.get(url, { params }),
        );

        return response.data.response.players;
    }
}