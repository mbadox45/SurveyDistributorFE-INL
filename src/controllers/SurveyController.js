import SurveyService from '@/api/SurveyService';
import {msg_success, msg_warning, msg_error} from '@/controllers/FunctionDummy';

export const loadAll_SurveyController = async() => {
    try {
        const response = await SurveyService.getSurvey();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const loadAvailable_SurveyController = async() => {
    try {
        const response = await SurveyService.getSurveyAvailable();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const loadAnswared_SurveyController = async() => {
    try {
        const response = await SurveyService.getSurveyAnswered();
        const load = response.data;
        const data = load.data;
        return data;
    } catch (error) {
        return null;
    }
}

export const loadAnsware_SurveyController = async(id,user_id) => {
    try {
        const response = await SurveyService.getAnswerSurveyByUserAndID(id,user_id);
        const load = response.data;
        return load;
    } catch (error) {
        return null;
    }
}

export const loadByID_SurveyController = async(id) => {
    try {
        const response = await SurveyService.getSurveyID(id);
        const load = response.data;
        const data = load.survey;
        return data;
    } catch (error) {
        return null;
    }
}

export const addPost_SurveyController = async(form) => {
    try {
        const response = await SurveyService.addSurvey(form);
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

export const updatePost_SurveyController = async(id,form) => {
    try {
        const response = await SurveyService.updateSurvey(id,form);
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

export const answerPost_SurveyController = async(id,form) => {
    try {
        const response = await SurveyService.postAnswerSurvey(id,form);
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

export const postSubmit_SurveyController = async (cond, post) => { // Removed 'cond' as it's not used
    try {
        let kondisi = true;  // Default as true
        let msg;

        for (let i = 0; i < post.length; i++) {
            const { question } = post[i]; // Destructuring to simplify
            console.log(post[i]);

            for (let j = 0; j < question.length; j++) {
                const { model, question: pertanyaan } = question[j]; // No need to destruct unused vars
                const textWithoutHtml = pertanyaan.replace(/<[^>]*>/g, ''); // Remove HTML tags
                
                // Split the question text and format it
                const textWithoutHtml2 = post[i].value.replace(/<[^>]*>/g, '');
                // Check if model is empty
                if (!model) {
                    kondisi = false;
                    msg = { severity: "warn", summary:"Perhatian !", finish: '-', message: `Bagian : ${textWithoutHtml2} >> ${textWithoutHtml}` };
                    break; // Exit inner loop
                }
            }
            if (!kondisi) break; // Exit outer loop if invalid condition is found
        }

        // If all conditions are true
        if (kondisi) {
            const pertanyaans = post;
            let answare = '{"answer": {';
            for (let i = 0; i < pertanyaans.length; i++) {
                answare += `"sp-${pertanyaans[i].id}":{`;
                const question = pertanyaans[i].question;
                answare += '"jawaban":"'
                let jawaban = '';
                for (let a = 0; a < question.length; a++) {
                    // Jawaban string
                    jawaban += question[a].id+'|';
                    if (question[a].type == 'checkbox') {
                        const model = question[a].model;
                        for (let b = 0; b < model.length; b++) {
                            jawaban += model[b]
                            if (b < (model.length-1)) {
                                jawaban +='~';
                            }
                        }
                    } else {
                        jawaban += question[a].model
                    }
                    if (a < (question.length - 1)) {
                        jawaban += ';';
                    } else {
                        jawaban += '",';
                    }
                }

                // Extra string
                jawaban += '"extra":';
                let ext = '';
                let firstIndexWithData = true;
                for (let a = 0; a < question.length; a++) {
                    const options = question[a].options;
                    const model = question[a].model;
                    for (let b = 0; b < options.length; b++) {
                        if (options[b].extra_answer != "0" && model == options[b].id) {
                            if (!firstIndexWithData) {
                                ext += ', '; // Add a comma if it's not the first index with data
                            } else {
                                ext += '{'; // Add "{" for the first index with data
                                firstIndexWithData = false; // Set the flag to false after adding "{"
                            }
                            ext += `"ext-${options[b].id}":"${question[a].model_extra}"`
                        }
                    }
                }
                if (!firstIndexWithData) {
                    ext += '}'; // Add "}" if there was data in the options
                }

                if (ext == '') {
                    ext += 'null'
                }
                jawaban += ext
                answare += jawaban;
                if (i >= (pertanyaans.length - 1)) {
                    answare += '}';
                } else {
                    answare += '},';
                }
            }
            answare +='}}';
            const postAnswer = JSON.parse(answare)
            await answerPost_SurveyController(cond,postAnswer)
            msg = { severity: "success", summary:"Berhasil", finish: 'sukses', message: 'Data Berhasil disimpan' };
            // msg = { severity: "success", summary:"Berhasil", message: 'Data Berhasil disimpan' };
        }

        return msg;
    } catch (error) {
        // Return error message with error details
        return { severity: 'error', summary:"Error !", finish: 'error', message: `Terjadi kesalahan sistem, mohon dicoba beberapa saat lagi. Error: ${error.message}` };
    }
}
