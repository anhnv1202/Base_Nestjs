import { ApiProperty } from '@nestjs/swagger';

export interface Twofa {
  enable: boolean;
  secret: string;
}

export class TwofaDto {
  @ApiProperty({ default: false })
  enable: boolean = false;

  @ApiProperty()
  secret: string;
}
