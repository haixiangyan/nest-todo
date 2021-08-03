import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipJwtAuth } from '../auth/constants';
import { lastValueFrom } from 'rxjs';
import { QuoteDto } from './dto/quote.dto';

const randomQuoteApi = 'http://api.quotable.io/random';

@ApiTags('名言名句')
@SkipJwtAuth()
@Controller('quote')
export class QuoteController {
  constructor(private httpService: HttpService) {}

  @ApiResponse({ type: QuoteDto })
  @Get('random')
  async getRandomQuote() {
    const response$ = this.httpService.get(randomQuoteApi);
    const response = await lastValueFrom(response$);
    return response.data;
  }
}
