export class ResponseDto {
    constructor(
        public message: string,
        public error: boolean,
        public auto: any
        ){
    }
}