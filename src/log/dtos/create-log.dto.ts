import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLogDto {
    @IsString()
    readonly type: string;

    @IsNumber()
    readonly status_code: number;

    @IsString()
    readonly message: string;

    @IsOptional()
    readonly ip: string;

    @IsOptional()
    readonly user_agent: string;

    @IsOptional()
    readonly full_request?: any;

    @IsOptional()
    readonly full_response?: any;

    @IsOptional()
    readonly stacks?: any;
}