export interface Post{
    title:string;
    description:string;
    tecnologias_fk:number[];
    url:string;
    image: File | string;
}