export type ICreateUser = {
  name: string
  email: string
  password: string
  role: string
  contactNo: string
  address: string
  profileImg: string
}

export type ILoginUser = {
  email: string
  password: string
}

export type IDecryptPassword = {
  userPassword: string
  storedPassword: string
}
