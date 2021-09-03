import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}
  @Mutation((returns) => Student)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Mutation((returns) => Student)
  createStudents(
    @Args({ name: 'createStudentInput', type: () => [CreateStudentInput] })
    createStudentInputs: CreateStudentInput[],
  ) {
    return this.studentService.createStudents(createStudentInputs);
  }

  @Query((returns) => [Student], { name: 'student' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query((returns) => Student, { name: 'studentOne' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation((returns) => Student)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation((returns) => Student)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentService.remove(id);
  }
}
