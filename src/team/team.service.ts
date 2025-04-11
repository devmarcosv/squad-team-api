import { Injectable, NotFoundException } from "@nestjs/common";
import { TeamRepository } from "./database/repositories/team.repository";
import { CreateTeamDto } from "./database/dto/team.dto";
import { Team } from "@prisma/client";


@Injectable()
export class TeamService {
    constructor(private repository: TeamRepository) { }

    async createTeam(data: CreateTeamDto): Promise<Team> {
        const { name, description, memberIds } = data;
        // Perform any additional logic or validation here if needed

        if (memberIds.length < 1) {
            throw new Error("Team must have at least one member");
        }

        const exist = await this.repository.usersExist(memberIds);

        if (!exist) {
            throw new Error("Some users do not exist");
        }

        const team = await this.repository.createTeam({
            name,
            description,
            members: {
                create: memberIds.map((userId) => ({
                    userId
                }))
            }
        });

        return team
    }

    async findTeamWithMembers(teamId: number) {
        const team = await this.repository.findByIdWithMembers(teamId);

        if (!team) {
            throw new NotFoundException('Team not found');
        }

        return team;
    }
}