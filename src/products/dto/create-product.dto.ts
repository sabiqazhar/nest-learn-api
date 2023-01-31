import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsInt()
  price: number;
}
