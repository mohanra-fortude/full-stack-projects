import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { request, gql } from 'graphql-request';
import axios from 'axios';
import { create } from 'domain';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class StudentService {
  endpoint = 'http://localhost:5000/graphql';
  create(createStudentInput: CreateStudentInput) {
    console.log('student data', createStudentInput);
    let date = new Date();
    let currentDate: number = date.getFullYear();
    let userBirthYear = parseInt(createStudentInput.dob.substring(0, 4));
    let age: number = currentDate - userBirthYear;
    console.log(userBirthYear, currentDate, age, 'dobb');
    createStudentInput.age = age;
    console.log(createStudentInput);
    const mutation = gql`
      mutation CreateStudent($createStudent: StudentInput!) {
        createStudent(input: { student: $createStudent }) {
          __typename
        }
      }
    `;
    return request(this.endpoint, mutation, {
      createStudent: createStudentInput,
    }).then((data) => {
      console.log;
      return data;
    });
  }

  createStudents(createStudentInputs: CreateStudentInput[]) {
    createStudentInputs.forEach((val: any, key: any) => {
      let date = new Date();
      let currentDate: number = date.getFullYear();
      let userBirthYear = parseInt(val.dob.substring(0, 4));
      let age: number = currentDate - userBirthYear;
      val.age = age;
    });
    console.log(createStudentInputs);
    const mutation = gql`
      mutation CreateStudents($createStudents: [StudentInput!]!) {
        createStudents(input: { createMultiple: $createStudents }) {
          __typename
        }
      }
    `;
    return request(this.endpoint, mutation, {
      createStudents: createStudentInputs,
    }).then((data) => {
      console.log;
      return data;
    });
  }

  findAll(): Promise<Student[]> {
    const query = gql`
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
    return request(this.endpoint, query).then((data) => {
      return data.allStudents.nodes;
    });
  }

  findOne(id: number) {
    const query = gql`
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
    return request(this.endpoint, query).then((data) => {
      return data.studentById;
    });
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    let date = new Date();
    let currentDate: number = date.getFullYear();
    let userBirthYear = parseInt(updateStudentInput.dob.substring(0, 4));
    let age: number = currentDate - userBirthYear;
    console.log(userBirthYear, currentDate, age, updateStudentInput);
    updateStudentInput.age = age;
    const mutation = gql`
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
    return request(this.endpoint, mutation, {
      id: id,
      updateStudent: updateStudentInput,
    }).then((data) => {
      console.log('uploaded', data);
      return data;
    });
  }

  remove(id: number) {
    const mutation = gql`
      mutation{
        deleteStudentById(input:{id:${id}}) {
          __typename
        }
      }
    `;
    return request(this.endpoint, mutation).then((data) => {
      return data;
    });
  }
}
