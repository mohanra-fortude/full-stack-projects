import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class VehiclePosting extends StatefulWidget {
  static const routerName = '/vehicleposting';

  const VehiclePosting({Key? key}) : super(key: key);

  @override
  _VehiclePostingState createState() => _VehiclePostingState();
}


class _VehiclePostingState extends State<VehiclePosting> {
  bool value = false;
  var brand = "";
  var facilities = "";
  var description = "";
  var totalamount = "";
  var securitydeposit = "";

  TextEditingController brandController = TextEditingController();
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
          title: const Text('Vehicle'),
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
                          return 'Please enter the Vehicle Brand Name';
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
                  RaisedButton(
                    textColor: Colors.white,
                    color: Colors.purple.shade900,
                    child: const Text('Post'),
                    onPressed: () {
                      setState(() {
                        brand = brandController.text;
                        facilities = facilitiesController.text;
                        securitydeposit =securitydepositController.text;
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
