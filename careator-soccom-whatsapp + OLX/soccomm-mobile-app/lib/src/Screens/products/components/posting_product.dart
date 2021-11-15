import 'package:flutter/material.dart';

class PostingProduct extends StatefulWidget {
  static const routerName = '/postingproduct';
  const PostingProduct({Key? key}) : super(key: key);

  @override
  _PostingProductState createState() => _PostingProductState();
}

class _PostingProductState extends State<PostingProduct> {
  var title = "";
  var summery = "";
  var descreption = "";
  TextEditingController titleController = TextEditingController();
  TextEditingController summeryController = TextEditingController();
  TextEditingController descreptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: const Text('Posting'),
        ),
        body: Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(15),
                  child: TextFormField(
                    keyboardType: TextInputType.name,
                    controller: titleController,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Title  ',
                      hintText: 'Enter Title',
                      suffixIcon: Icon(Icons.title),
                    ),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please enter title';
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
                    controller: summeryController,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Summery',
                        hintText: 'Enter summery',
                        suffixIcon: Icon(Icons.description)),
                    validator: (value) {
                      if (value!.isEmpty) {
                        return 'Please Enter summery';
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
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
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
                RaisedButton(
                  textColor: Colors.white,
                  color: Colors.blue,
                  child: const Text('Post'),
                  onPressed: () {
                    setState(() {
                      title = titleController.text;
                      summery = summeryController.text;
                      descreption = descreptionController.text;
                    });
                    // ignore: avoid_print
                    print(titleController.text);
                    // ignore: avoid_print
                    print(summeryController.text);
                    // ignore: avoid_print
                    print(descreptionController.text);
                  },
                ),
                Column(
                  children: <Widget>[
                    const Padding(
                      padding: EdgeInsets.all(25),
                    ),
                    Text(
                      title,
                      style: const TextStyle(fontSize: 25),
                    ),
                    Text(
                      summery,
                      style: const TextStyle(fontSize: 25),
                    ),
                    Text(
                      descreption,
                      style: const TextStyle(fontSize: 20),
                    ),
                  ],
                )
              ],
            )));
  }
}
