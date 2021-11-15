import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class HousePosting extends StatefulWidget {
  static const routerName = '/houseposting';

  const HousePosting({Key? key}) : super(key: key);

  @override
  _HousePostingState createState() => _HousePostingState();
}

class _HousePostingState extends State<HousePosting> {
  var housetype = "";
  var facilities = "";
  var description = "";
  var totalamount = "";
  var securitydeposit = "";
  bool isChecked = false;
  bool isChecked1 = false;

  TextEditingController housetypeController = TextEditingController();
  TextEditingController facilitiesController = TextEditingController();
  TextEditingController totalamountController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  TextEditingController securitydepositController = TextEditingController();
  // TextEditingController roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          backgroundColor: Colors.purple.shade800,
          title: const Text('House'),
        ),
        body: SingleChildScrollView(
          child: Padding(
              padding: const EdgeInsets.all(15),
              child: Column(
                children: <Widget>[
                  // Image.asset('assets/images/car.jpg',
                  // height:120, width:180,
                  // ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: housetypeController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'House Type  ',
                        hintText: 'House Type',
                        // suffixIcon: Icon(Icons.title),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter the type of the house';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: facilitiesController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Facilities',
                        hintText: 'Enter the Facilities',
                        // suffixIcon: Icon(Icons.money)
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter the Facilities';
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
                        labelText: 'Security Deposit Amount',
                        hintText: 'Enter the Security Deposit Amount',
                        // suffixIcon: Icon(Icons.format_list_numbered)
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please Enter Security Deposit Amount';
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
                        housetype = housetypeController.text;
                        facilities = facilitiesController.text;
                        securitydeposit = securitydepositController.text;
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
