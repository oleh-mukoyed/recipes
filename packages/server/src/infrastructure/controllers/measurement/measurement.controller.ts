import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/infrastructure/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from 'src/infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { getMeasurementsUseCases } from 'src/usecases/measurement/getMeasurements.usecases';

import { MeasurementPresenter } from './measurement.presenter';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ResponseInterceptor)
@Controller('measurement')
@ApiTags('measurement')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(MeasurementPresenter)
export class MeasurementController {
  constructor(
    @Inject(UseCasesProxyModule.GET_MEASUREMENTS_USE_CASES_PROXY)
    private readonly getMeasurementsUseCasesProxy: UseCaseProxy<getMeasurementsUseCases>,
  ) {}

  @Get('measurements')
  @ApiResponseType(MeasurementPresenter, true)
  async getMeasurements() {
    const result = await this.getMeasurementsUseCasesProxy
      .getInstance()
      .execute();

    return result.map(
      (measurementModel) => new MeasurementPresenter(measurementModel),
    );
  }
}
