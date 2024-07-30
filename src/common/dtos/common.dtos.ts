export class SuccessResponseDto {
  constructor(
    public success: boolean = true,
    public message?: string,
  ) {}
}
