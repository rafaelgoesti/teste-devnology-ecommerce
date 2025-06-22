import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [HttpModule],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule {}
