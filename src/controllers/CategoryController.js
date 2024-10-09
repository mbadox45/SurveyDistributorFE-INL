import CategoryService from '@/api/CategoryService';

export const loadAll_CategoryController = async() => {
    try {
        const response = await CategoryService.getCategories();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const addPost_CategoryController = async(form) => {
    try {
        const response = await CategoryService.addCategory(form);
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

export const updatePost_CategoryController = async(id,form) => {
    try {
        const response = await CategoryService.updateCategory(id,form);
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