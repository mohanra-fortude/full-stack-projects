import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/group/app-contact.class.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

var phonenumber = """
 query phonenumber(\$number:String!){
   phonenumber(phone:"\$number"){
   id
  }
}
  """;

class ContactsList extends StatefulWidget {
  final List<AppContact> contacts;
  static const routerName = "/contactlist";

  Function() reloadContacts;
  ContactsList({Key? key, required this.contacts, required this.reloadContacts})
      : super(key: key);

  @override
  State<ContactsList> createState() => _ContactsListState();
}

class _ContactsListState extends State<ContactsList> {
  bool _isChecked = false;
  Map<String, dynamic> number = <String, dynamic>{};
  var holder_1 = [];

  getItems() {
    number.forEach((key, value) {
      if (value == true) {
        holder_1.add(key);
      }
    });

    // Printing all selected items on Terminal screen.
    print(holder_1);
    // Here you will get all your selected Checkbox items.

    // Clear array after use.
    holder_1.clear();
  }

  @override
  Widget build(BuildContext context) {
    print('arrayyy $number');
    return Expanded(
        child: ListView.builder(
            shrinkWrap: true,
            itemCount: widget.contacts.length,
            itemBuilder: (context, index) {
              AppContact contact = widget.contacts[index];
              // print(contact.info.phones.elementAt(0).value);
              var number = contact.info.phones.elementAt(0).value;

              print('contactttt $number');

              return Query(
                options: QueryOptions(
                  document: gql(phonenumber),
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

                  print('usr  $contactuserid');

                  print(listuser);

                  return Container(
                    decoration:
                        BoxDecoration(border: Border.all(color: Colors.teal)),
                    margin: const EdgeInsets.only(top: 20.0),
                    child: Builder(builder: (context) {
                      return CheckboxListTile(
                        title: Text(contact.info.displayName),
                        subtitle: Text(contact.info.phones.isNotEmpty
                            ? contact.info.phones.elementAt(0).value
                            : ''),
                        secondary: const CircleAvatar(
                          backgroundImage: NetworkImage(
                              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
                        ),
                        value: _isChecked,
                        onChanged: (bool? value) {
                          setState(() {
                            _isChecked = value!;
                          });
                        },
                      );
                    }),
                  );
                },
              );
            }));
  }
}
