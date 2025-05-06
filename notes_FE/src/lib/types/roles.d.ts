import { PaginatedResponse } from ".";


export type roleType={
    id:number;
    createdAt:string;
    updatedAt:string;
    title:string;
}

export type fetchAllRolesApiResponse=PaginatedResponse<roleType[]>