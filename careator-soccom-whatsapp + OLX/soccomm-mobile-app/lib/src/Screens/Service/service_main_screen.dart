import 'dart:math';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Profile/components/image_upload.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/Service/main_category.dart';
import 'package:new_project/src/Screens/Service/Service%20lists/service_list.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/products/components/posting/category_dropdown.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

import '../homepage.dart';
import 'groupimage/imageupload.dart';

class ServiceMainScreen extends StatefulWidget {
  static var routerName = "/servicemainscreen";

  const ServiceMainScreen({Key? key}) : super(key: key);

  @override
  State<ServiceMainScreen> createState() => _ServiceMainScreenState();
}

/// This is the private State class that goes with ServiceMainScreen.
class _ServiceMainScreenState extends State<ServiceMainScreen> {
  var rating = 3.0;
  int _selectedIndex = 0;

  bool _canShowButton = true;

  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static final List<Widget> _widgetOptions = <Widget>[
    ServiceProductList(),
    ServiceProductList(),
    ServiceProductList(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  void hideWidget() {
    setState(() {
      _canShowButton = !_canShowButton;
    });
  }

  @override
  Widget build(BuildContext context) {
    final data = ModalRoute.of(context)?.settings.arguments as Map;
    var grpname = Provider.of<LoginNotifire>(context, listen: false).groupname;
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("join:$userDetails");

    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpid:$groupId");
    print("join: $grpname");
    return Scaffold(
      appBar: AppBar(
        leading: InkWell(
          onTap: () => {Navigator.pushNamed(context, GroupImage.routerName)},
          child: const CircleAvatar(
            backgroundImage: ExactAssetImage('assets/images/bike.jpg'),
          ),
        ),
        backgroundColor: Colors.purple.shade400,
        title: Text(grpname),
        automaticallyImplyLeading: false,
        actions: <Widget>[
          Mutation(
              options: MutationOptions(
                document: gql("""
mutation createGroupUser(\$groupId: String!, \$userId: String!,\$isAdmin:Boolean!,\$isActive:Boolean!){
  createGroupUser(createGroupUserInput:{
  groupId: \$groupId
  userId: \$userId
  isAdmin:\$isAdmin
  isActive:\$isActive
  }){
    id
  }
}
"""),
                onCompleted: (dynamic resultData) {
                  var postIdData = resultData?['createGroupUser'];
                  Navigator.pushNamed(context, Homepage.routerName);

                  print("second$postIdData");
                },
              ),
              builder: (runMutation, result) {
                if (result!.hasException) {
                  return Text(result.exception.toString());
                }

                if (result.isLoading) {
                  return Center(
                    child: const CircularProgressIndicator(),
                  );
                }

                return !_canShowButton
                    ? const SizedBox.shrink()
                    : ElevatedButton(
                        onPressed: () {
                          runMutation({
                            'groupId': groupId,
                            'userId': userDetails,
                            'isAdmin': false,
                            'isActive': true,
                          });
                          print("adddone");
                          hideWidget();
                          // if(userId == listuser){

                          // }
                          // else{
                          //   hideWidget();
                          // }
                        },
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                Colors.purple.shade400)),
                        // child: const Text("JOIN"));
                        // child: const Text("JOIN")
                        child: const Icon(
                          Icons.call_merge_rounded,
                          size: 30,
                        ),
                      );
              }),
          // ElevatedButton(
          //   child: const Text("JOIN"),
          //   onPressed: () {
          //     Navigator.pushNamed(context, GroupMembers.routerName);
          //   },
          // ),
          ElevatedButton(
            child: const Icon(
              Icons.people_alt_rounded,
              size: 30,
            ),
            onPressed: () {
              Navigator.pushNamed(context, GroupMembers.routerName);
            },
            style: ButtonStyle(
                backgroundColor:
                    MaterialStateProperty.all<Color>(Colors.purple.shade400)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: SizedBox(
          child: Column(
            children: [
              const MainCategory(),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: SizedBox(
                        width: 60,
                        height: 60,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50.0),
                          ),
                          color: HexColor("#A96BFF"),
                          child: InkWell(
                              splashColor: Colors.purpleAccent.withAlpha(30),
                              onTap: () {
                                print('Phone Card tapped.');
                              },
                              child: Center(
                                child: RichText(
                                  text: const TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(
                                          Icons.phone_android_sharp,
                                          size: 25,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Container(
                        width: 60,
                        height: 60,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50.0),
                          ),
                          color: HexColor("#A96BFF"),
                          child: InkWell(
                              splashColor: Colors.purpleAccent.withAlpha(30),
                              onTap: () {
                                print('Laptop Card tapped.');
                              },
                              child: Center(
                                child: RichText(
                                  text: const TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(
                                          Icons.computer_sharp,
                                          size: 25,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Container(
                        width: 60,
                        height: 60,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50.0),
                          ),
                          color: HexColor("#A96BFF"),
                          child: InkWell(
                              splashColor: Colors.purpleAccent.withAlpha(30),
                              onTap: () {
                                print('Computer Card tapped.');
                              },
                              child: Center(
                                child: RichText(
                                  text: const TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(
                                          Icons.laptop_mac,
                                          size: 25,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Container(
                        width: 60,
                        height: 60,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50.0),
                          ),
                          color: HexColor("#A96BFF"),
                          child: InkWell(
                              splashColor: Colors.purpleAccent.withAlpha(30),
                              onTap: () {
                                print('Goods Card tapped.');
                              },
                              child: Center(
                                child: RichText(
                                  text: const TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(
                                          Icons.phone,
                                          size: 25,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(20),
                      child: Container(
                        width: 60,
                        height: 60,
                        child: Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(50.0),
                          ),
                          color: HexColor("#A96BFF"),
                          child: InkWell(
                              splashColor: Colors.purpleAccent.withAlpha(30),
                              onTap: () {
                                print('Goods Card tapped.');
                              },
                              child: Center(
                                child: RichText(
                                  text: const TextSpan(
                                    children: [
                                      WidgetSpan(
                                        child: Icon(
                                          Icons.domain,
                                          size: 25,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              )),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SingleChildScrollView(
                child: _widgetOptions.elementAt(_selectedIndex),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, CategoryDropDown.routerName);
        },
        child: Transform.rotate(
            angle: -45 * pi / 180, child: const Icon(Icons.send_sharp)),
        backgroundColor: Colors.purple.shade600,
        // child: Text('Join'),
      ),
      // child: Container(
      //   child: ProductList(),
      // ),
      bottomNavigationBar: BottomNavigationBar(
        //  backgroundColor:ColorToHex()
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(
              Icons.accessible_forward_sharp,
              size: 30,
            ),
            label: 'Yoga',
            // title: Text("Yoga"),
            backgroundColor: Colors.purple,
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.music_note_sharp,
              size: 30,
            ),
            label: 'Music',
            backgroundColor: Colors.purple,
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.accessibility_new_sharp,
              size: 30,
            ),
            label: 'Dance',
            backgroundColor: Colors.purple,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.white,
        backgroundColor: Colors.purpleAccent.shade400,
        // color: HexColor("#A96BFF"),
        onTap: _onItemTapped,
      ),
      // floatingActionButton: FloatingActionButton(

      //   child: Text('Join'),

      //   onPressed: () {
      //     print('group join');
      //   },
      // ),
    );
  }
}
