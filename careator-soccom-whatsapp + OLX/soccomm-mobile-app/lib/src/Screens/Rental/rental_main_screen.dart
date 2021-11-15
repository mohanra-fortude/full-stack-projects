import 'dart:math';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Rental/rental_category.dart';
import 'package:new_project/src/Screens/Rental/rental_list.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/products/components/posting/category_dropdown.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

class RentalMainScreen extends StatefulWidget {
  static var routerName = "/rentalmainscreen";

  const RentalMainScreen({Key? key}) : super(key: key);

  @override
  State<RentalMainScreen> createState() => _RentalMainScreenState();
}

/// This is the private State class that goes with ServiceMainScreen.
class _RentalMainScreenState extends State<RentalMainScreen> {
  var rating = 3.0;
  int _selectedIndex = 0;

  bool _canShowButton = true;

  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static final List<Widget> _widgetOptions = <Widget>[
    RentalProductList(),
    RentalProductList(),
    RentalProductList(),
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
        backgroundColor: Colors.purple.shade400,
        
        title: Text(grpname),
        automaticallyImplyLeading: false,
        actions: <Widget>[
          Mutation(
            options: MutationOptions(document: gql("""
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
""")),
            builder: (RunMutation runMutation, QueryResult) {
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
                      },
                      style:ButtonStyle(backgroundColor: MaterialStateProperty.all<Color>(Colors.purple.shade400)),
                      // child: const Text("JOIN")
                               child: const Icon(
              Icons.call_merge_rounded,
              size: 30,
            ),
                      
                      );
            },
          ),
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
             style:ButtonStyle(backgroundColor: MaterialStateProperty.all<Color>(Colors.purple.shade400)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: SizedBox(
          child: Column(
            children: [
              const RentalCategory(),
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
                child: Padding(
                  padding: const EdgeInsets.all(0),
                  child: _widgetOptions.elementAt(_selectedIndex),
                ),
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
              Icons.menu_book,
              size: 30,
            ),
            label: 'Books',
            // title: Text("Yoga"),
            backgroundColor: Colors.purple,
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.house_sharp,
              size: 30,
            ),
            label: 'House',
            backgroundColor: Colors.purple,
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.car_rental,
              size: 30,
            ),
            label: 'Vehicle',
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
