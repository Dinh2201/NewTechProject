const Department = require('../models/DepartmentModel');

// Lấy tất cả chuyên ngành
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy chuyên ngành' });
  }
};
// Thêm mới chuyên ngành
exports.addDepartment = async (req, res) => {
  try {
    const { DepartmentName, Description } = req.body;

    const existingDepartment = await Department.findOne({ DepartmentName: DepartmentName });

    if (existingDepartment) {
      res.status(401).json({ message: 'Chuyên ngành đã tồn tại!' });
    } else {
      const newDepartment = new Department({
        DepartmentName,
        Description,
      });

      await newDepartment.save();
      res.status(200).json({ message: 'Chuyên ngành đã được thêm thành công!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm chuyên ngành: ' + error.message });
  }
};

// Lấy thông tin chuyên ngành bằng ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Chuyên ngành không tồn tại' });
    }
    res.json({
      department: department,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin chuyên ngành' });
  }
};

// Cập nhật thông tin chuyên ngành bằng ID
exports.editDepartment = async (req, res) => {
  try {
    const { DepartmentName, Description } = req.body;

    // Kiểm tra xem chuyên ngành có tồn tại không
    const department = await Department.findById(req.params.departmentId);

    if (!department) {
      res.status(404).json({ message: 'Chuyên ngành không tồn tại!' });
      return;
    }

    // Cập nhật thông tin chuyên ngành
    department.DepartmentName = DepartmentName;
    department.Description = Description;

    // Lưu các thay đổi
    await department.save();

    res.status(200).json({ message: 'Thông tin chuyên ngành đã được cập nhật thành công!' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật thông tin chuyên ngành: ' + error.message });
  }
};

// Xóa chuyên ngành bằng ID
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Chuyên ngành không tồn tại' });
    }

    await Department.findByIdAndDelete(req.params.departmentId);

    res.json({ message: 'Chuyên ngành đã bị xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa chuyên ngành' });
  }
};
