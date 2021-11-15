import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/Profile/components/profile_form.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/products/components/body.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/job_post.dart';
import 'package:new_project/src/Screens/products/components/posting_product.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'components/posting/component/category_dropdown.dart';

class Products extends StatefulWidget {
  static const routerName = "/products";

  Products({Key? key}) : super(key: key);

  @override
  State<Products> createState() => _ProductsState();
}

class _ProductsState extends State<Products> {
  @override
  Widget build(BuildContext context) {
    var grpname = Provider.of<LoginNotifire>(context, listen: false).groupname;
    print("join: $grpname");
    return Scaffold(
      appBar: AppBar(
        title: Text(grpname),
        automaticallyImplyLeading: false,
        actions: <Widget>[
          ElevatedButton(
            child: const Text(
              "Members",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onPressed: () {
              Navigator.pushNamed(context, GroupMembers.routerName);
            },
          ),
          ElevatedButton(
            child: const Text(
              "Posting",
              style: TextStyle(color: Colors.white, fontSize: 20),
            ),
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      // backgroundColor: Colors.transparent,
                      title: const Text('Select Category'),
                      content: SizedBox(
                          width: 250, height: 250, child: CategoryDropDown()),
                      actions: <Widget>[
                        // ignore: deprecated_member_use
                        FlatButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          textColor: Theme.of(context).primaryColor,
                          child: const Text('Close'),
                        ),
                      ],
                    );
                  });
              // Navigator.pushNamed(context, JobsPublic.routerName);
            },
          )
        ],
      ),
      body: Body(),
    );
  }
}
