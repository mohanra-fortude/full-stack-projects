import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class BookPosting extends StatefulWidget {
  static const routerName = '/bookposting';

  const BookPosting({Key? key}) : super(key: key);

  @override
  _BookPostingState createState() => _BookPostingState();
}

class _BookPostingState extends State<BookPosting> {
  bool valuefirst = false;  
  bool valuesecond = false;  
  
 var bookname = "";
  var booktype = "";
  var  description = "";
  var totalamount = "";
  var role = "";
  bool isChecked = false;
  bool isChecked1 = false;

  TextEditingController booknameController = TextEditingController();
  TextEditingController booktypeController = TextEditingController();
  TextEditingController totalamountController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  // TextEditingController roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
        backgroundColor:Colors.purple.shade800,
          title: const Text('Book'),
        ),
        body: SingleChildScrollView(
          child: Padding(
              padding: const EdgeInsets.all(15),
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: booknameController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Book Name ',
                        hintText: 'Book Name',
                        // suffixIcon: Icon(Icons.title),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter Book Name';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: booktypeController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Type of the Book',
                          hintText: 'Enter type of the book',
                          // suffixIcon: Icon(Icons.money)
                          ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter type of the book';
                        }
                        return null;
                      },
                    ),
                  ),
                   Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.number,
                      controller: totalamountController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Total Amount',
                          hintText: 'Enter Amount',
                          // suffixIcon: Icon(Icons.format_list_numbered)
                          ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter Amount';
                        }
                        return null;
                      },
                    ),
                  ),
                  Container(
                      margin:const EdgeInsets.all(15.0),
                      padding: const EdgeInsets.all(3.0),
                      decoration:BoxDecoration(border:Border.all(color:Colors.black26)),
                      child: CheckboxListTile(
                        title: const Text('Looking For',
                        style:TextStyle(color:Colors.black54
        
                        ),
                        ),
                        // decoration: const InputDecoration(
                        //   border: OutlineInputBorder(),
                       
                        value: isChecked,
        
                        onChanged: (bool? value) {
                          // This is where we update the state when the checkbox is tapped
                          setState(() {
                            isChecked = value!;
                          });
                        },
                      ),
                    ),
                     Container(
                      margin: const EdgeInsets.all(15.0),
                      padding:const EdgeInsets.all(3.0),
                      decoration:BoxDecoration(border:Border.all(color:Colors.black26)),
                        child: CheckboxListTile(
                          title: Text('Offering', style:TextStyle(color:Colors.black54)),
                          value: isChecked1,
                          onChanged: (bool? value) {
                            // This is where we update the state when the checkbox is tapped
                            setState(() {
                              isChecked1 = value!;
                            });
                          },
                     
                        )
                        ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.multiline,
                      maxLines: 4,
                      maxLength: 1000,
                      controller: descriptionController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Description',
                          hintText: 'Enter description ',
                          // suffixIcon: Icon(Icons.description)
                          ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter description';
                        }
                        return null;
                      },
                    ),
                  ),
                  // Padding(
                  //   padding: const EdgeInsets.all(15),
                  //   child: TextFormField(
                  //     keyboardType: TextInputType.name,
                  //     controller: roleController,
                  //     decoration: const InputDecoration(
                  //         border: OutlineInputBorder(),
                  //         labelText: 'Role',
                  //         hintText: 'Enter Role ',
                  //         suffixIcon: Icon(Icons.person)),
                  //     validator: (value) {
                  //       if (value!.isEmpty) {
                  //         return 'Please Enter Role';
                  //       }
                  //       return null;
                  //     },
                  //   ),
                  // ),
                  RaisedButton(
                    textColor: Colors.white,
                    color: Colors.purple.shade900,
                    child: const Text('Post'),
                    onPressed: () {
                      setState(() {
                        bookname = booknameController.text;
                        booktype = booktypeController.text;
                        totalamount = totalamountController.text;
                        // role = roleController.text;
                        // experiance = experianceController.text;
                      });
                      Navigator.pushNamed(context, Products.routerName);
                    },
                  ),
                  
                ],
              )),
        ));
  }
}
