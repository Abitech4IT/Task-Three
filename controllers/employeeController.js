const employee = require("../db/models/employee");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employee.findAll();

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "employees not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "employees fetch successfully",
      data: employees,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;

    const employeeData = await employee.findOne({ where: { id: id } });

    if (!employeeData) {
      return res.status(404).json({
        success: false,
        message: "invalid employee",
      });
    }

    res.status(200).json({
      success: true,
      message: "employee retrieved successfully",
      data: employeeData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res, next) => {
  const employeeEmail = req.body.email;

  try {
    // Check if the employee exists before creating
    const isExist = await employee.findOne({ where: { email: employeeEmail } });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "employee already exist",
      });
    }

    const { firstName, lastName, email, address, gender, mobile } = req.body;

    const newEmployee = await employee.create({
      firstName,
      lastName,
      email,
      address,
      gender,
      mobile,
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully!",
      data: newEmployee,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    const { firstName, lastName, email, address, gender, mobile } = req.body;

    const updatedEmployee = {};

    if (firstName) updatedEmployee.firstName = firstName;
    if (lastName) updatedEmployee.lastName = lastName;
    if (email) updatedEmployee.email = email;
    if (address) updatedEmployee.address = address;
    if (gender) updatedEmployee.gender = gender;
    if (mobile) updatedEmployee.mobile = mobile;

    // Check if the employee exists before updating
    const isExist = await employee.findOne({ where: { id: id } });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "invalid employee",
      });
    }

    // Update the employee data
    await employee.update(updatedEmployee, {
      where: { id: id },
    });

    // Fetch the updated employee data
    const updatedEmployeeData = await employee.findOne({
      where: { id: id },
    });

    res.status(200).json({
      success: true,
      message: "Employee updated successfully!",
      data: updatedEmployeeData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "invalid employee",
      });
    }
    await employee.destroy({
      where: {
        id: id,
      },
    });

    res.status(204).json({
      success: true,
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
