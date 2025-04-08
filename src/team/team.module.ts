import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamController } from "./http/controllers/team.controller";
import { TeamRepository } from "./database/repositories/team.repository";
import { PrismaService } from "src/prisma/prisma.service";


@Module({
    imports: [PrismaModule],
    controllers: [TeamController],
    providers: [TeamRepository, PrismaService],
    exports: [],
})
export class TeamModule { }