export class Weather{
    constructor(
        public temp: number,
        public summary: string,
        public wind: number,
        public humiditiy: number,
        public icon: string
    ){}
}