import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/components/chat_scree.dart';
import 'package:new_project/src/Screens/products/components/product_list.dart';

class Body extends StatefulWidget {
  const Body({Key? key}) : super(key: key);

  @override
  _BodyState createState() => _BodyState();
}

class _BodyState extends State<Body> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Container(
            height: MediaQuery.of(context).size.height * 1,
            child: Column(children: <Widget>[
              // Expanded(child: SizedBox(child: Filter())),
              Expanded(
                  child: Column(
                children: [
                  SizedBox(
                    height: 680,
                    width: double.infinity,
                    child: SizedBox(child: ProductList()),
                  ),
                  // SizedBox(
                  //   height: 60,
                  //   width: double.infinity,
                  //   child: SizedBox(child: ChatScreen()),
                  // ),
                ],
              )),
            ])));
  }
}
