import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Login/login.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';
import 'homepage.dart';

var tokenRemove;
var idRemove;

class AppDrawer extends StatefulWidget {
  const AppDrawer({Key? key}) : super(key: key);

  @override
  State<AppDrawer> createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  var reload = false;
  @override
  Widget build(BuildContext context) {
    var emailDetails = Provider.of<LoginNotifire>(context, listen: false).email;
    print("email:$emailDetails");
    var usernameData = Provider.of<LoginNotifire>(context, listen: false).name;
    print("usernameData:$usernameData");
    var imageData =
        Provider.of<LoginNotifire>(context, listen: false).updatedImage;

    print("imageData:$imageData");
    return Drawer(
      child: Container(
        decoration: BoxDecoration(
          color: HexColor("#A96BFF"),
          //  borderRadius: const BorderRadius.only(
          //       topRight: Radius.circular(60.0),
          //       bottomRight: Radius.circular(60.0))
        ),
        padding: const EdgeInsets.only(top: 50),
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              // is_logged_in.value == true
              ListTile(
                leading: imageData == "" || imageData == null
                    ? CircleAvatar(
                        backgroundImage:
                            AssetImage('assets/images/default.jpg'))
                    : ClipRRect(
                        borderRadius: BorderRadius.circular(100),
                        child: Image.file(File(imageData))),
                title: Text(usernameData,
                    style: TextStyle(color: Colors.white, fontSize: 20)),
                subtitle: Text(emailDetails,
                    style: TextStyle(color: Colors.white, fontSize: 17)),
              ),
              const Divider(),
              ListTile(
                  visualDensity:
                      const VisualDensity(horizontal: -4, vertical: -4),
                  leading: Image.asset("assets/images/home.png",
                      height: 20, color: Colors.white),
                  title: const Text('Home',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) {
                      return const Homepage(
                        value: '',
                      );
                    }));
                  }),

              ListTile(
                  visualDensity:
                      const VisualDensity(horizontal: -4, vertical: -4),
                  leading: Image.asset("assets/images/profile.png",
                      height: 20, color: Colors.white),
                  title: const Text('Profile',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  onTap: () {
                    setState(() {
                      reload = true;
                      print(reload);
                    });
                    Navigator.pushNamed(context, Profile.routerName);
                  }),

              ListTile(
                  visualDensity:
                      const VisualDensity(horizontal: -4, vertical: -4),
                  leading: Image.asset("assets/images/order.png",
                      height: 20, color: Colors.white),
                  title: const Text('Orders',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  onTap: () {
                    // Navigator.push(context,
                    //     MaterialPageRoute(builder: (context) {
                    //   return OrderList(from_checkout: false);
                    // }));
                  }),

              ListTile(
                  visualDensity:
                      const VisualDensity(horizontal: -4, vertical: -4),
                  leading: Image.asset("assets/images/chat.png",
                      height: 20, color: Colors.white),
                  title: const Text('Messages',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  onTap: () {
                    // Navigator.pushNamed(context, GraphqlConfig.routerName);
                  }),

              ListTile(
                  visualDensity:
                      const VisualDensity(horizontal: -4, vertical: -4),
                  leading: Image.asset("assets/images/logout.png",
                      height: 20, color: Colors.white),
                  title: const Text('Logout',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                  onTap: () {
                    // onTapLogout(context);
                    remove() async {
                      SharedPreferences _prefs =
                          await SharedPreferences.getInstance();
                      var _removeId = _prefs.remove('userId');
                      var _removeToken = _prefs.remove('token');
                      idRemove = _removeId;
                      tokenRemove = _removeToken;
                      Navigator.pushNamed(context, loginScreen.routeName);
                    }
                  })
            ],
          ),
        ),
      ),
    );
  }
}
