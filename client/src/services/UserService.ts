import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import $api from "../http/index.ts";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/users');
    }
}