import { Injectable } from "@nestjs/common";
import { Prisma, Team } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class TeamRepository {
    constructor(private prisma: PrismaService) { }

    async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
        return this.prisma.team.create({ data });

    }

    async findById(id: number): Promise<Team | null> {
        return this.prisma.team.findUnique({ where: { id } });
    }

    async findAll(): Promise<Team[]> {
        return this.prisma.team.findMany();
    }

}