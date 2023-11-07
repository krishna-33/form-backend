const { forms: Forms, responses: Responses } = require("../models");

module.exports = {
  getAllForms: async(t) => {
    const forms = await Forms.findAll({
      include: [
        { model: Responses }
    ]
    });

    return forms

  },
  createForm: async (formObj, t) => {
    const formCreated = await Forms.create(formObj, {
      transaction: t,
    });

    return formCreated;
  },

  getFormById: async (formId, t) => {
    const formObj = await Forms.findOne(
      {
        raw: true,
        where: {
          id: Number(formId),
        },
      },
      { transaction: t }
    );

    return formObj;
  },

  saveResponse: async(responseObj, t) => {
    const responseSaved = await Responses.create(responseObj, {
      transaction: t
    });
    return responseSaved
  }
};
