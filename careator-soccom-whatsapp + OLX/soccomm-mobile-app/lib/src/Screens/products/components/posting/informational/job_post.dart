import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class JobPosting extends StatefulWidget {
  static const routerName = '/postingproduct';

  const JobPosting({Key? key}) : super(key: key);

  @override
  _JobPostingState createState() => _JobPostingState();
}

class _JobPostingState extends State<JobPosting> {
  bool valuefirst = false;
  bool valuesecond = false;
  var company = "";
  var salary = "";
  var experiance = "";
  var descreption = "";
  var role = "";

  TextEditingController companyController = TextEditingController();
  TextEditingController salaryController = TextEditingController();
  TextEditingController experianceController = TextEditingController();
  TextEditingController descreptionController = TextEditingController();
  TextEditingController roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: const Text('Job Post'),
          backgroundColor: Colors.transparent,
        ),
        body: Container(
          decoration: BoxDecoration(
            color: Colors.deepPurple[600],
          ),
          child: Padding(
              padding: const EdgeInsets.all(15),
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: companyController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        fillColor: Colors.white,
                        filled: true,
                        labelText: 'Company  ',
                        hintText: 'Enter Company',
                        suffixIcon: Icon(Icons.title),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter Company';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: salaryController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: 'salary',
                          hintText: 'Enter Salary',
                          suffixIcon: Icon(Icons.money)),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter Salary';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.number,
                      controller: salaryController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: 'Experiance',
                          hintText: 'Enter Experiance',
                          suffixIcon: Icon(Icons.format_list_numbered)),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter Experiance';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.multiline,
                      maxLines: 4,
                      maxLength: 1000,
                      controller: descreptionController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: 'descreption',
                          hintText: 'Enter descreption ',
                          suffixIcon: Icon(Icons.description)),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter descreption';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: roleController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: 'Role',
                          hintText: 'Enter Role ',
                          suffixIcon: Icon(Icons.person)),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter Role';
                        }
                        return null;
                      },
                    ),
                  ),
                  Row(
                    children: <Widget>[
                      SizedBox(
                        width: 10,
                      ),
                      Text(
                        'Offering',
                        style: TextStyle(fontSize: 17.0),
                      ),
                      Checkbox(
                        checkColor: Colors.white,
                        activeColor: Colors.green,
                        value: this.valuefirst,
                        onChanged: (value) {
                          setState(() {
                            this.valuefirst = value!;
                          });
                        },
                      ),
                      Text(
                        'Looking For',
                        style: TextStyle(fontSize: 17.0),
                      ),
                      Checkbox(
                        checkColor: Colors.white,
                        activeColor: Colors.green,
                        value: this.valuesecond,
                        onChanged: (value) {
                          setState(() {
                            this.valuesecond = value!;
                          });
                        },
                      ),
                    ],
                  ),
                  RaisedButton(
                    textColor: Colors.white,
                    color: Colors.blue,
                    child: const Text('Post'),
                    onPressed: () {
                      setState(() {
                        company = companyController.text;
                        salary = salaryController.text;
                        descreption = descreptionController.text;
                        role = roleController.text;
                        experiance = experianceController.text;
                      });
                      Navigator.pushNamed(context, Products.routerName);
                    },
                  ),
                ],
              )),
        ));
  }
}
