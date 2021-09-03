"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const student_service_1 = require("./student.service");
const student_entity_1 = require("./entities/student.entity");
const create_student_input_1 = require("./dto/create-student.input");
const update_student_input_1 = require("./dto/update-student.input");
let StudentResolver = class StudentResolver {
    constructor(studentService) {
        this.studentService = studentService;
    }
    createStudent(createStudentInput) {
        return this.studentService.create(createStudentInput);
    }
    createStudents(createStudentInputs) {
        return this.studentService.createStudents(createStudentInputs);
    }
    findAll() {
        return this.studentService.findAll();
    }
    findOne(id) {
        return this.studentService.findOne(id);
    }
    updateStudent(updateStudentInput) {
        return this.studentService.update(updateStudentInput.id, updateStudentInput);
    }
    removeStudent(id) {
        return this.studentService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation((returns) => student_entity_1.Student),
    __param(0, graphql_1.Args('createStudentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_input_1.CreateStudentInput]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "createStudent", null);
__decorate([
    graphql_1.Mutation((returns) => student_entity_1.Student),
    __param(0, graphql_1.Args({ name: 'createStudentInput', type: () => [create_student_input_1.CreateStudentInput] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "createStudents", null);
__decorate([
    graphql_1.Query((returns) => [student_entity_1.Student], { name: 'student' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query((returns) => student_entity_1.Student, { name: 'studentOne' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation((returns) => student_entity_1.Student),
    __param(0, graphql_1.Args('updateStudentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_student_input_1.UpdateStudentInput]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "updateStudent", null);
__decorate([
    graphql_1.Mutation((returns) => student_entity_1.Student),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentResolver.prototype, "removeStudent", null);
StudentResolver = __decorate([
    graphql_1.Resolver((of) => student_entity_1.Student),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentResolver);
exports.StudentResolver = StudentResolver;
//# sourceMappingURL=student.resolver.js.map