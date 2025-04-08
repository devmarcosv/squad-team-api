import { Injectable } from "@nestjs/common";
import { TeamRepository } from "./database/repositories/team.repository";


@Injectable()
export class TeamService {
    constructor(private repository: TeamRepository) { }

    async createTeam(data: [{}]) {
        return this.repository.createTeam(data);
    }
}