import UserService from '@/api/UserService';
import {msg_success, msg_warning, msg_error} from '@/controllers/FunctionDummy';

export const loadAll_UserController = async() => {
    try {
        const response = await UserService.getUsers();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const addPost_UserController = async(form) => {
    try {
        const response = await UserService.addUser(form);
        const load = response.data;
        if (load.success == true) {
            return msg_success;
        } else {
            return msg_warning
        }
    } catch (error) {
        // console.log(error)
        return {
            status: false,
            code: error.response.data.code,
            msg: error.response.data.message,
        }
    }
}

export const updatePost_UserController = async(id,form) => {
    try {
        const response = await UserService.updateUser(id,form);
        const load = response.data;
        if (load.success == true) {
            return msg_success;
        } else {
            return msg_warning
        }
    } catch (error) {
        return {
            status: false,
            code: error.response.data.code,
            msg: error.response.data.message,
        }
    }
}