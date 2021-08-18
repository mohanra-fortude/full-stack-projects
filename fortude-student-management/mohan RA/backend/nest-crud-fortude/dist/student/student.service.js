"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
let StudentService = class StudentService {
    constructor() {
        this.endpoint = 'http://localhost:5000/graphql';
    }
    create(createStudentInput) {
        console.log('student data', createStudentInput);
        let date = new Date();
        let currentDate = date.getFullYear();
        let userBirthYear = parseInt(createStudentInput.dob.substring(0, 4));
        let age = currentDate - userBirthYear;
        console.log(userBirthYear, currentDate, age, 'dobb');
        createStudentInput.age = age;
        console.log(createStudentInput);
        const mutation = graphql_request_1.gql `
      mutation CreateStudent($createStudent: StudentInput!) {
        createStudent(input: { student: $createStudent }) {
          __typename
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, mutation, {
            createStudent: createStudentInput,
        }).then((data) => {
            console.log;
            return data;
        });
    }
    createStudents(createStudentInputs) {
        createStudentInputs.forEach((val, key) => {
            let date = new Date();
            let currentDate = date.getFullYear();
            let userBirthYear = parseInt(val.dob.substring(0, 4));
            let age = currentDate - userBirthYear;
            val.age = age;
        });
        console.log(createStudentInputs);
        const mutation = graphql_request_1.gql `
      mutation CreateStudents($createStudents: [StudentInput!]!) {
        createStudents(input: { createMultiple: $createStudents }) {
          __typename
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, mutation, {
            createStudents: createStudentInputs,
        }).then((data) => {
            console.log;
            return data;
        });
    }
    findAll() {
        const query = graphql_request_1.gql `
      query {
        allStudents {
          nodes {
            id
            name
            age
            email
            dob
          }
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, query).then((data) => {
            return data.allStudents.nodes;
        });
    }
    findOne(id) {
        const query = graphql_request_1.gql `
      query {
        studentById(id: ${id}) {
          id
          name
          email
          dob
          age
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, query).then((data) => {
            return data.studentById;
        });
    }
    update(id, updateStudentInput) {
        let date = new Date();
        let currentDate = date.getFullYear();
        let userBirthYear = parseInt(updateStudentInput.dob.substring(0, 4));
        let age = currentDate - userBirthYear;
        console.log(userBirthYear, currentDate, age, updateStudentInput);
        updateStudentInput.age = age;
        const mutation = graphql_request_1.gql `
      mutation updateStudentById($id: Int!, $updateStudent: StudentPatch!) {
        updateStudentById(input: { studentPatch: $updateStudent, id: $id }) {
          __typename
          query {
            allStudents {
              nodes {
                id
                name
                age
                email
                dob
              }
            }
          }
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, mutation, {
            id: id,
            updateStudent: updateStudentInput,
        }).then((data) => {
            console.log('uploaded', data);
            return data;
        });
    }
    remove(id) {
        const mutation = graphql_request_1.gql `
      mutation{
        deleteStudentById(input:{id:${id}}) {
          __typename
        }
      }
    `;
        return graphql_request_1.request(this.endpoint, mutation).then((data) => {
            return data;
        });
    }
};
StudentService = __decorate([
    common_1.Injectable()
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map