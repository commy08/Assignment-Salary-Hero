import { ModelType } from ".";

export default (Models: ModelType) => {
  Models.Company.hasMany(Models.UserCompanyRole);

  Models.Role.hasMany(Models.UserCompanyRole);

  Models.User.hasMany(Models.UserCompanyRole);

  Models.UserCompanyRole.belongsTo(Models.User);
  Models.UserCompanyRole.belongsTo(Models.Company);
  Models.UserCompanyRole.belongsTo(Models.Role);
};
