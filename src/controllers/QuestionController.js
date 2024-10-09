import QuestionService from '@/api/QuestionService';
import {msg_success, msg_warning, msg_error} from '@/controllers/FunctionDummy';

export const loadAll_QuestionController = async() => {
    try {
        const response = await QuestionService.getQuestions();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const loadByID_QuestionController = async(id) => {
    try {
        const response = await QuestionService.getQuestionsID(id);
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const addPost_QuestionController = async(form) => {
    try {
        const response = await QuestionService.addQuestion(form);
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

export const updatePost_QuestionController = async(id,form) => {
    try {
        const response = await QuestionService.updateQuestion(id,form);
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

export const postData_QuestionController = async(type, input, form, cond) => {
    try {
        const opt_id = [];
        const desc = [];
        const value = [];
        const extra = [];
        const form_ans = [];
        let kondisi;
        let msg = {severity: '', msg: ''}
        let post = {
            id: null,
            category_id: null,
            question: null,
            require: null,
            type: null,
            desc: [],
            value: [],
            extra: [],
        };
        if (type != null && form.question != null && form.require != null) {
            if (type == 'text') {
                const ans = input;
                desc[0] = ans[0].desc;
                value[0] = ans[0].value;
                extra[0] = ans[0].extra == false ? '0' : '1';
                form_ans[0] = {
                    desc: ans[0].desc,
                    value: ans[0].value,
                    extra: ans[0].extra,
                };
                post = {
                    id: form.id,
                    category_id: form.category_id,
                    question: form.question,
                    require: form.require,
                    type: type,
                    desc: desc,
                    value: value,
                    extra: extra,
                }
                // Post Data
                // msg = {severity: 'success', msg: 'Data Berhasil di simpan'};
                kondisi = true
                // console.log(post, msg)
            } else if (type == 'number') {
                const ans = input;
                for (let i = 0; i < ans.end; i++) {
                    desc[i]=(i+ans.start).toString();
                    value[i]=(i+ans.start).toString();
                    extra[i]='0';
                    form_ans[0] = {desc:(i+ans.start).toString(), value:(i+ans.start).toString()};
                }
                post = {
                    id: form.id,
                    category_id: form.category_id,
                    question: form.question,
                    require: form.require,
                    type: type,
                    desc: desc,
                    value: value,
                    extra: extra,
                }
                // Post Data
                // msg = {severity: 'success', msg: 'Data Berhasil di simpan'};
                kondisi = true
                // console.log(post, msg)
            } else {
                const ans = input;
                for (let i = 0; i < ans.length; i++) {
                    if (ans[i].desc != null && ans[i].desc != '' && ans[i].value != null && ans[i].value != '') {
                        if (i < (ans.length - 1)) {
                            continue;
                        }
                        kondisi = true
                    } else {
                        kondisi = false
                        // msg = {severity: 'warn', msg: 'Mohon data dilengkapi pada bagian list jawaban. !'};
                        break;
                    }
                }
                if (kondisi == true) {
                    for (let i = 0; i < ans.length; i++) {
                        opt_id[i]=ans[i].option_id;
                        desc[i]=ans[i].desc;
                        value[i]=ans[i].value;
                        extra[i]=ans[i].extra == false ? '0' : '1';
                    }
                    post = {
                        id: form.id,
                        category_id: form.category_id,
                        question: form.question,
                        require: form.require,
                        type: type,
                        desc: desc,
                        value: value,
                        extra: extra,
                    }
                    // Post Data
                    // msg = {severity: 'success', msg: 'Data Berhasil di simpan'};
                    // console.log(post, msg)
                }
            }

            if (kondisi == true) {
                if (cond == 'add') {
                    const response = await addPost_QuestionController(post)
                    if (response.status == true) {
                        msg = {severity: 'success', msg: 'Data Berhasil di simpan'};
                    } else {
                        msg = {severity: 'warn', msg: 'Terjadi Kesalahan'};
                    }
                } else {
                    const response = await updatePost_QuestionController(post.id, post)
                    if (response.status == true) {
                        msg = {severity: 'success', msg: 'Data Berhasil di simpan'};
                    } else {
                        msg = {severity: 'warn', msg: 'Terjadi Kesalahan'};
                    }
                }
            } else {
                msg = {severity: 'warn', msg: 'Mohon data dilengkapi pada bagian list jawaban. !'};
            }
            return msg;
        } else {
            return {severity: 'warn', msg: 'Mohon data dilengkapi. !'};
        }
    } catch (error) {
        return {severity: 'error', msg: 'Terjadi kejalahan sistem, mohon di coba beberapa saat lagi.'};
    }
}