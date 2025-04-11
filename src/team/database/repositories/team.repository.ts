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

    async addMembers(teamId: number, membersIds: number[]) {
        const membersTeam = membersIds.map((userId) => ({
            userId,
            teamId
        }));

        return this.prisma.teamMember.createMany({
            data: membersTeam
        });
    }

    async usersExist(userIds: number[]): Promise<boolean> {
        const isFound = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true },
        });

        return isFound.length === userIds.length;
    }

    async findByIdWithMembers(teamId: number) {
        return this.prisma.team.findUnique({
            where: { id: teamId },
            include: {
                members: {
                    include: {
                        user: true, // Isso traz os dados do usuário vinculado
                    },
                },
            },
        });
    }

}