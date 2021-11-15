import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';

class DressPosting extends StatefulWidget {
  static const routerName = '/dressposting';

  const DressPosting({Key? key}) : super(key: key);

  @override
  _DressPostingState createState() => _DressPostingState();
}

class _DressPostingState extends State<DressPosting> {
//  var bookname = "";
  var dresstype = "";
  var  description = "";
  var totalamount = "";
  // var role = "";

  // TextEditingController booknameController = TextEditingController();
  TextEditingController dresstypeController = TextEditingController();
  TextEditingController totalamountController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  // TextEditingController roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: const Text('Dresses'),
        ),
        body: Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(15),
                  child: TextFormField(
                    keyboardType: TextInputType.name,
                    controller: dresstypeController,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Dress Type ',
                      hintText: 'Dress Type',
                      // suffixIcon: Icon(Icons.title),
                    ),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter Dress type';
                      }
                      return null;
                    },
                  ),
                ),
                // Padding(
                //   padding: const EdgeInsets.all(15),
                //   child: TextFormField(
                //     keyboardType: TextInputType.name,
                //     controller: booktypeController,
                //     decoration: const InputDecoration(
                //         border: OutlineInputBorder(),
                //         labelText: 'Type of the type',
                //         hintText: 'Enter type of the book',
                //         // suffixIcon: Icon(Icons.money)
                //         ),
                //     validator: (value) {
                //       if (value!.isEmpty) {
                //         return 'Please Enter type of the book';
                //       }
                //       return null;
                //     },
                //   ),
                // ),
                 Padding(
                  padding: const EdgeInsets.all(15),
                  child: TextFormField(
                    keyboardType: TextInputType.number,
                    controller: totalamountController,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Total Amount in Rs',
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
                  color: Colors.blue,
                  child: const Text('Post'),
                  onPressed: () {
                    setState(() {
                      // bookname = booknameController.text;
                      dresstype = dresstypeController.text;
                      totalamount = totalamountController.text;
                      // role = roleController.text;
                      // experiance = experianceController.text;
                    });
                    Navigator.pushNamed(context, Products.routerName);
                  },
                ),
              ],
            )));
  }
}
