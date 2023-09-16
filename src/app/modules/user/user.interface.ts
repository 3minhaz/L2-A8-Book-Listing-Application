export type IUserFilterRequest = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
}

export type ILoginUser = {
  email: string
  password: string
}

export type IDecryptPassword = {
  userPassword: string
  storedPassword: string
}
