import { Controller, Get } from "@nestjs/common";


@Controller('check')
export class CheckController {
  constructor() {}

  @Get()
  async check() {
    return 'Check route is working!';
  }
}