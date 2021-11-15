import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class CarPosting extends StatefulWidget {
  static const routerName = '/carposting';

  const CarPosting({Key? key}) : super(key: key);

  @override
  _CarPostingState createState() => _CarPostingState();
}
enum SingingCharacter { lafayette, jefferson }
class _CarPostingState extends State<CarPosting> {
  var brand = "";
  var facilities = "";
  var description = "";
  var totalamount = "";
  var role = "";
  bool isChecked = false;
  bool isChecked1 = false;
  bool _value = false;
 int val = -1;

  TextEditingController brandController = TextEditingController();
  TextEditingController facilitiesController = TextEditingController();
  TextEditingController totalamountController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  // TextEditingController roleController = TextEditingController();
SingingCharacter? _character = SingingCharacter.lafayette;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          backgroundColor: Colors.purple.shade900,
          title: const Text('Car'),
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
                      controller: brandController,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Brand  ',
                        hintText: 'Brand Name',
                        // suffixIcon: Icon(Icons.title),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter the Car Brand Name';
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
                          return 'Please Enter the Security Deposit Amount';
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
                    child:
                   ListTile(
          title: const Text('Looking For'),
          leading: Radio<SingingCharacter>(
            value: SingingCharacter.lafayette,
            groupValue: _character,
            onChanged: (SingingCharacter? value) {
              setState(() {
                _character = value;
              });
            },
          ),
          
          
        ),

        ),
             Container(
                    child:
                  ListTile(
          title: const Text('Offering'),
          leading: Radio<SingingCharacter>(
            value: SingingCharacter.jefferson,
            groupValue: _character,
            onChanged: (SingingCharacter? value) {
              setState(() {
                _character = value;
              });
            },
          ),
        ),
             ),



                  // CheckboxListTile(
                  //     title: const Text('Looking For',
                  //     style:TextStyle(color:Colors.black54

                  //     ),
                  //     ),
                  //     // decoration: const InputDecoration(
                  //     //   border: OutlineInputBorder(),

                  //     value: isChecked,

                  //     onChanged: (bool? value) {
                  //       // This is where we update the state when the checkbox is tapped
                  //       setState(() {
                  //         isChecked = value!;
                  //       });
                  //     },
                  //   ),
                  // ),
                  // Padding(
                  //     padding: const EdgeInsets.all(14),
                  // Container(
                  //   margin: const EdgeInsets.all(15.0),
                  //   padding:const EdgeInsets.all(3.0),
                  //   decoration:BoxDecoration(border:Border.all(color:Colors.black26)),
                  //     child: CheckboxListTile(
                  //       title: Text('Offering', style:TextStyle(color:Colors.black54)),
                  //       value: isChecked1,
                  //       onChanged: (bool? value) {
                  //         // This is where we update the state when the checkbox is tapped
                  //         setState(() {
                  //           isChecked1 = value!;
                  //         });
                  //       },

                  //     )
                  //     ),

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
                        brand = brandController.text;
                        facilities = facilitiesController.text;
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
