import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';
import { SkipJwtAuth } from '../auth/constants';

const uploadDistDir = join(__dirname, '../../', 'upload_dist');

@Controller('static')
export class StaticController {
  @SkipJwtAuth()
  @Get(':subPath')
  render(@Param('subPath') subPath, @Res() res) {
    const filePath = join(uploadDistDir, subPath);
    return res.sendFile(filePath);
  }
}
