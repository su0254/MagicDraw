export type UserLogin = {
    user: {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    },
    token: string
}