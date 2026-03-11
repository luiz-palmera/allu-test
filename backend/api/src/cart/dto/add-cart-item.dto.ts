import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID do produto que será adicionado ao carrinho',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  productId: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Quantidade do produto a ser adicionada',
    default: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number = 1;
}
