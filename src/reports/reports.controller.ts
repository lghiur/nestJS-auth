import {
  Controller,
  Post,
  Patch,
  Get,
  Query,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() currentUser: User
  ) {
    return this.reportsService.create(
      body, currentUser
    );
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto
  ) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Get()
  getEstimate(
    @Query() query: GetEstimateDto
  ) {
    return this.reportsService.createEstimate(query);
  }
}
