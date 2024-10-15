import { SORT_DIRECTION } from '@common/constants/global.const';
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from '@common/validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  size?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsIn(SORT_DIRECTION)
  @IsOptional()
  sortType?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  onlyDeleted?: boolean;

  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dateTo?: string;
}

export class ChangeActiveDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  code?: string;
}

export class ChangePermissionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  id: string;
}

export class UtmQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  utm_source: string;

  @ApiPropertyOptional()
  @IsOptional()
  utm_medium: string;

  @ApiPropertyOptional()
  @IsOptional()
  utm_content: string;

  @ApiPropertyOptional()
  @IsOptional()
  utm_campaign: string;
}

export class ViewUtmQuery extends UtmQueryDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sessionId: string;
}

export class checkoutCustomerQuery {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sessionId: string;
}
export class CommonCheckAll {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAll: boolean;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  @IsNotEmpty({ each: true })
  listId?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsNotEmpty({ each: true })
  id?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  query?: any;
}
