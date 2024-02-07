export interface Vehicle {
    id: number,
    name: string,
    status: number,
    image: string,
    description: string,
    category: string
    amount: string,
    price: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Order {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    passege_date: string,
    person_count: number
}

export interface Option {
    id: number,
    name: string
}