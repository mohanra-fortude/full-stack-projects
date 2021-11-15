import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/group/AvtarCard.dart';
import 'package:new_project/src/Screens/group/ChatModel.dart';
import 'package:new_project/src/Screens/group/ContactCard.dart';
import 'package:new_project/src/Screens/group/addmember.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:new_project/src/widget/search.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';

var phonenumber = """
 query phonenumber{
   phonenumber(phone:"9921862523"){
   id
  }
}
  """;

class CreateGroup extends StatefulWidget {
  static const routerName = "/creategroup";
  const CreateGroup({Key? key}) : super(key: key);

  @override
  _CreateGroupState createState() => _CreateGroupState();
}

class _CreateGroupState extends State<CreateGroup> {
  Map<String, bool> values = {
    "8830658970 ": false,
    "9637898105": false,
    "9921862523 ": false,
  };
  var tmpArray = [];

  void mapnumber() {
    // var arr = tmpArray.map((title) => Tab(text: title)).toList();
    var dataToSend = tmpArray.toString();
    print("arraypass $dataToSend");
  }

  var toggle = false;

  getCheckboxItems() {
    values.forEach((key, value) {
      if (value == true) {
        tmpArray.add(key);
      }
    });

    // Printing all selected items on Terminal screen.
    print('slect111 $tmpArray');
    // Here you will get all your selected Checkbox items.

    // Clear array after use.
    tmpArray.clear();
  }

  void _popupDialog(BuildContext context) {
    print(tmpArray);
    Widget cancelButton = FlatButton(
      child: const Text("Cancel"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget createButton = FlatButton(
      child: const Text("Create"),
      onPressed: () async {
        Navigator.pushNamed(context, Homepage.routerName);
      },
    );

    AlertDialog alert = AlertDialog(
      title: const Text("Create a group"),
      content: TextField(
          onChanged: (val) {
            // _groupName = val;
          },
          style: const TextStyle(
              fontSize: 15.0, height: 2.0, color: Colors.black)),
      actions: [
        cancelButton,
        createButton,
      ],
    );

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    Provider.of<LoginNotifire>(context, listen: false).getPhoneId(tmpArray);
    return Scaffold(
        appBar: AppBar(
          title: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                "New Group",
                style: TextStyle(
                  fontSize: 19,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                "Add participants",
                style: TextStyle(
                  fontSize: 13,
                ),
              )
            ],
          ),
          actions: [
            IconButton(
                icon: const Icon(
                  Icons.search,
                  size: 26,
                ),
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => const SearchPage()));
                }),
          ],
        ),
        floatingActionButton: FloatingActionButton(
            backgroundColor: const Color(0xFF128C7E),
            onPressed: () async {
              //  Navigator.of(context).pushNamed(MaterialPageRoute(
              //     builder: (context) => const AddMember(
              //           membersList: [],
              //         )));

              getCheckboxItems();

              await Navigator.of(context)
                  .pushNamed(AddMember.routerName, arguments: values);

              // await Navigator.of(context)
              //     .pushNamed(Products.routerName, arguments: values);
            },
            child: const Icon(Icons.arrow_forward)),
        body: Query(
            options: QueryOptions(
              document: gql("""
 query phonenumber(\$tmparray:String!){
   phonenumber(phone:\$tmparray){
   id
  }
}
  """),
              variables: {'tmparray': "8830658970"},
            ),
            builder: (QueryResult result, {fetchMore, refetch}) {
              if (result.hasException) {
                return Text(result.exception.toString());
              }
              if (result.isLoading) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
              final listuser = result.data!['phonenumber'];
              final contactuserid = result.data!['phonenumber']['id'];
              Provider.of<LoginNotifire>(context, listen: false)
                  .getMembersuserId(contactuserid);

              // print('usrrrr  $contactuserid');

              // contactuserid.map((val)=>{ (val))

              print(listuser);

              return ListView(
                children: values.keys.map((String key) {
                  return CheckboxListTile(
                    secondary: const CircleAvatar(
                      backgroundImage: NetworkImage(
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
                    ),
                    title: Text(key),
                    subtitle: const Text(""),
                    isThreeLine: false,
                    value: values[key],
                    onChanged: (value) {
                      getCheckboxItems();
                      setState(() {
                        values[key] = value!;
                      });
                    },
                  );
                }).toList(),
              );
            }));
  }
}
