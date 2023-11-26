// routes/record.js
const express = require('express');
const router = express.Router();
const academicYearController = require('../controllers/AcademicYearController');
const departmentController = require('../controllers/DepartmentController');
const teacherController = require('../controllers/TeacherController');
const studentController = require('../controllers/StudentController');
const projectRegistrationPeriodController = require('../controllers/ProjectRegistrationPeriodController');
const userController = require('../controllers/UserController');

// Routes for 'academicYears'
router.post('/academicYears', academicYearController.addAcademicYear);
router.get('/academicYears', academicYearController.getAllAcademicYears);
router.get('/academicYears/:academicyearId', academicYearController.getAcademicYearById);
router.put('/academicYears/:academicyearId', academicYearController.editAcademicYear);
router.delete('/academicYears/:academicyearId', academicYearController.deleteAcademicYear);
// Routes for 'departments'
router.post('/departments', departmentController.addDepartment);
router.get('/departments', departmentController.getAllDepartments);
router.get('/departments/:departmentId', departmentController.getDepartmentById);
router.put('/departments/:departmentId', departmentController.editDepartment);
router.delete('/departments/:departmentId', departmentController.deleteDepartment);
// Routes for 'students'
router.post('/students', studentController.addStudent);
router.get('/students/:department/:academicyear', studentController.getAllStudents);
router.get('/students/:studentId', studentController.getStudentById);
router.put('/students/:studentId', studentController.editStudent);
router.delete('/students/:studentId', studentController.deleteStudent);
// Routes for 'teachers'
router.post('/teachers', teacherController.addTeacher);
router.get('/teachers/department/:departmentId', teacherController.getAllTeachers);
router.get('/teachers/:teacherId', teacherController.getTeacherById);
router.put('/teachers/:teacherId', teacherController.editTeacher);
router.delete('/teachers/:teacherId', teacherController.deleteTeacher);
// Routes for 'projectregistrationperiods'
router.post('/projectregistrationperiods', projectRegistrationPeriodController.addProjectRegistrationPeriod);
router.get('/projectregistrationperiods/academic/:academicyear', projectRegistrationPeriodController.getAllProjectRegistrationPeriods);
router.get('/projectregistrationperiods/:projectRegistrationPeriodId', projectRegistrationPeriodController.getProjectRegistrationPeriodById);
router.put('/projectregistrationperiods/:projectRegistrationPeriodId', projectRegistrationPeriodController.editProjectRegistrationPeriod);
router.delete('/projectregistrationperiods/:projectRegistrationPeriodId', projectRegistrationPeriodController.deleteProjectRegistrationPeriod);
// Routes for 'users'
router.post('/users/login', userController.login);

module.exports = router;