import { Controller, Get, Post } from "@nestjs/common";

@Controller('team')
export class TeamController {
    constructor() { }

    @Post('create')
    async createTeam() { }

    @Get('get')
    async getTeam() { }
}