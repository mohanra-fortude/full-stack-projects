import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

import '../../../products_screens.dart';

class EventPosting extends StatefulWidget {
  static const routerName = '/event';
  const EventPosting({Key? key}) : super(key: key);

  @override
  _EventPostingState createState() => _EventPostingState();
}

class _EventPostingState extends State<EventPosting> {
  bool valuefirst = false;
  bool valuesecond = false;
  var name = "";
  var amount = "";
  var location = "";
  var descreption = "";

  final List<String> eventsAttributs = [];

  TextEditingController nameController = TextEditingController();
  TextEditingController amountController = TextEditingController();
  TextEditingController locationController = TextEditingController();
  TextEditingController descreptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var userDetails =
        Provider.of<LoginNotifire>(context, listen: false).subCategId;
    print("pp$userDetails");
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Events'),
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: BoxDecoration(
          color: Colors.deepPurple[600],
        ),
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Query(
              options: QueryOptions(document: gql("""
                   query category(\$id:String!){
                   category(id:\$id){
                    attribute{
                     name
                     id
                    }
                   }
                  }
                    """), variables: {'id': userDetails}),
              builder: (QueryResult result, {fetchMore, refetch}) {
                if (result.hasException) {
                  return Text(result.exception.toString());
                }
                if (result.isLoading) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                }
                final List listData = result.data!['category']['attribute'];
                print("data$listData");

                final mapList = listData.map((items) => {
                      print(items['name']),
                      eventsAttributs.add(items['name']),
                    });

                print("maped$eventsAttributs");
                print("database$mapList");

                return ListView.builder(
                  itemCount: eventsAttributs.toSet().length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(15),
                      child: TextFormField(
                        keyboardType: TextInputType.name,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          fillColor: Colors.white,
                          filled: true,
                          labelText: '${eventsAttributs[index]}',
                          hintText: "${eventsAttributs[index]}",
                        ),
                      ),
                    );
                  },
                );
              }),
          // RaisedButton(
          //   textColor: Colors.white,
          //   color: Colors.blue,
          //   child: const Text('Post'),
          //   onPressed: () {
          //     Navigator.pushNamed(context, Products.routerName);
          //   },
          // ),
        ),
      ),
    );
  }
}
