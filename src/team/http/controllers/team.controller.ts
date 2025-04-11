import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTeamDto } from "src/team/database/dto/team.dto";
import { TeamService } from "src/team/team.service";

@Controller('team')
export class TeamController {
    constructor(private service: TeamService) { }

    //@UseGuards(AuthGuard('jwt')) // Protege a rota com JWT


    @Post('create')
    async createTeam(@Body(ValidationPipe) dto: CreateTeamDto) {
        return this.service.createTeam(dto);

    }

    @Get('list')
    async getTeam() {

    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findTeamWithMembers(id);
    }

    // src/team/team.controller.ts

    @Get()
    async findAll() {
        return this.service.findAllTeamsWithMembers();
    }

}