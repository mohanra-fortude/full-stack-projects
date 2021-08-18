import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
export declare class StudentService {
    endpoint: string;
    create(createStudentInput: CreateStudentInput): Promise<any>;
    createStudents(createStudentInputs: CreateStudentInput[]): Promise<any>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateStudentInput: UpdateStudentInput): Promise<any>;
    remove(id: number): Promise<any>;
}
