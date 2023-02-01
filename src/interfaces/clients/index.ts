export interface IPerson{
    nome: string,
    email: string,
    telefone: string
}

export interface ICreateRequest{
    nome: string,
    email: string,
    telefone: string
}

export interface IUpdateRequest{
    nome?: string,
    email?: string,
    telefone?: string
}
