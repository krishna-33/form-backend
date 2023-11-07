const { sendSuccessRespose, sendErrorResponse } = require("../utils/response");
const formServices = require('../services/form.service');
const { FORM_CREATED, SOMTHING_WENT_WRONG, FORM_FOUND, FORM_NOT_FOUND, RESPONSE_SAVED, FORM_RETRIVED } = require("../utils/message");
const { SUCCESS, ERROR, NOT_FOUND } = require("../utils/status");
const { sequelize } = require('../models');

module.exports = {
    getAllForms: async(req, res, next) => {
        const t = await sequelize.transaction();
        try{
            const forms = await formServices.getAllForms(t);
            sendSuccessRespose(res, forms, FORM_RETRIVED, SUCCESS);
            await t.commit();
         }
        catch(error){
            console.log('error',error)
            sendErrorResponse(res, SOMTHING_WENT_WRONG, ERROR);
            await t.rollback();
        }
    },
    createForm: async(req, res, next) => {
        const t = await sequelize.transaction();
        try{
            let formObj = req.body
            const createdForm = await formServices.createForm(formObj,t);
            sendSuccessRespose(res, createdForm, FORM_CREATED, SUCCESS);
            await t.commit();
        }
        catch(error){
            console.log('error',error)
            sendErrorResponse(res, SOMTHING_WENT_WRONG, ERROR);
            await t.rollback();
        }
        
    },
    getFormDetails: async(req, res, next) => {
        const t = await sequelize.transaction();
        try{
            const { id } = req.params;
            const form = await formServices.getFormById(id,t);
            if (!form) {
                return sendErrorResponse(res, {}, FORM_NOT_FOUND, NOT_FOUND);
                await t.commit();
             }
            sendSuccessRespose(res, form, FORM_FOUND, SUCCESS );
            await t.commit();
        }
        catch(error){
            console.log(error)
            sendErrorResponse(res, SOMTHING_WENT_WRONG, ERROR );
            await t.rollback();
        }
        
    },
    saveFormResponse: async(req, res, next) => {
        const t = await sequelize.transaction();
        try{
            let responseObj = req.body
            const response = await formServices.saveResponse(responseObj);
            sendSuccessRespose(res, response, RESPONSE_SAVED, SUCCESS );
            await t.commit();
        }
        catch(error){
            console.log(error)
            sendErrorResponse(res, SOMTHING_WENT_WRONG, ERROR );
            await t.rollback();
        }
    }
}