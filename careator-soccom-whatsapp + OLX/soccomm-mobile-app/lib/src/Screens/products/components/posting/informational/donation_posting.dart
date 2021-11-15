import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';

import '../../../products_screens.dart';

class DonationPosting extends StatefulWidget {
  static const routerName = '/donation';
  const DonationPosting({Key? key}) : super(key: key);

  @override
  _DonationPostingState createState() => _DonationPostingState();
}

class _DonationPostingState extends State<DonationPosting> {
  bool valuefirst = false;
  bool valuesecond = false;
  final List<String> informationalItems = [
    'Informational',
    'Carpool',
    'Jobs',
    'Donations',
    'Events'
  ];
  var name = "";
  var amount = "";
  var descreption = "";
  TextEditingController nameController = TextEditingController();
  TextEditingController amountController = TextEditingController();
  TextEditingController descreptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: const Text('Donataion'),
          backgroundColor: Colors.transparent,
        ),
        // body: ListView.builder(
        //   itemCount: informationalItems.length,
        //   itemBuilder: (context, index) {
        //     return Padding(
        //       padding: const EdgeInsets.all(15),
        //       child: TextFormField(
        //         keyboardType: TextInputType.name,
        //         controller: amountController,
        //         decoration: InputDecoration(
        //             border: OutlineInputBorder(),

        //             // ignore: unnecessary_string_interpolations
        //             labelText: '${informationalItems[index]}',
        //             hintText: "${informationalItems[index]}",
        //             suffixIcon: Icon(Icons.money)),
        //         validator: (value) {
        //           if (value!.isEmpty) {
        //             return 'Please Enter Amount';
        //           }
        //           return null;
        //         },
        //       ),
        //     );

        //   },
        // ),
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
                      controller: nameController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        fillColor: Colors.white,
                        filled: true,
                        labelText: 'Name  ',
                        hintText: 'Enter Name',
                        suffixIcon: Icon(Icons.title),
                      ),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Please enter Name';
                        }
                        return null;
                      },
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15),
                    child: TextFormField(
                      keyboardType: TextInputType.name,
                      controller: amountController,
                      decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: 'Amount',
                          hintText: 'Enter Amount',
                          suffixIcon: Icon(Icons.money)),
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
                      textInputAction: TextInputAction.newline,
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
                  Row(
                    children: <Widget>[
                      SizedBox(
                        width: 10,
                      ),
                      Text(
                        'Offering ',
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
                    color: Colors.white,
                    child: const Text('Post'),
                    onPressed: () {
                      setState(() {
                        name = nameController.text;
                        amount = amountController.text;
                        descreption = descreptionController.text;
                      });
                      Navigator.pushNamed(context, Products.routerName);
                    },
                  ),
                ],
              )),
        ));
  }
}
