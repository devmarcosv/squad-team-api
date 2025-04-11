import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamController } from "./http/controllers/team.controller";
import { TeamRepository } from "./database/repositories/team.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { TeamService } from "./team.service";


@Module({
    imports: [PrismaModule],
    controllers: [TeamController],
    providers: [TeamRepository, TeamService, PrismaService],
    exports: [TeamService],
})
export class TeamModule { }