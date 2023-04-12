import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "../utils/classValidator.utils";

export class TokenRequestDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  refreshToken: string;
}
