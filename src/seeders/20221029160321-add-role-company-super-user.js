const uuid = require("uuid");

module.exports = {
  async up(queryInterface) {
    const superUserRoleId = uuid.v4();
    const companyId = uuid.v4();
    const userId = uuid.v4();

    await queryInterface.bulkInsert("roles", [
      {
        id: superUserRoleId,
        role: "super-admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        role: "employee",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("companies", [
      {
        id: companyId,

        name: "Salary Hero",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("users", [
      {
        id: userId,
        national_id: "1234567890",
        first_name: "Salary Hero",
        last_name: "Super User",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("users_companies_roles", [
      {
        id: uuid.v4(),
        user_id: userId,
        company_id: companyId,
        role_id: superUserRoleId,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("companies", null, {});
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("users_companies_roles", null, {});
  },
};
