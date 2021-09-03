import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
export declare class StudentResolver {
    private readonly studentService;
    constructor(studentService: StudentService);
    createStudent(createStudentInput: CreateStudentInput): Promise<any>;
    createStudents(createStudentInputs: CreateStudentInput[]): Promise<any>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<any>;
    updateStudent(updateStudentInput: UpdateStudentInput): Promise<any>;
    removeStudent(id: number): Promise<any>;
}
