import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/main.dart';
import 'package:new_project/src/Screens/homepage.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

var userId;
var auth;

checkPrefsForUser() async {
  SharedPreferences _prefs = await SharedPreferences.getInstance();
  var sharedToken = _prefs.getString('token');
  var sharedId = _prefs.getString('userId');
  userId = sharedId;
  auth = sharedToken;
}

// var phonenumber = """
//  query phonenumber{
//    phonenumber(phone:"9921862523"){
//    id
//   }
// }
//   """;

const creategroup = """
mutation createGroup(\$name: String!, \$type: String! , \$createruserId:String!){
  createGroup(createGroupInput:{
  name: \$name
  type: \$type
  createruserId: \$createruserId
  }){
    name
  }
}
""";

class AddMember extends StatefulWidget {
  static var routerName = '/addmember';
  final List<Map<String, dynamic>> membersList;
  const AddMember({required this.membersList, Key? key}) : super(key: key);

  @override
  State<AddMember> createState() => _AddMemberState();
}

class _AddMemberState extends State<AddMember> {
  TextEditingController name = TextEditingController();
  TextEditingController type = TextEditingController();
  MyApp configuration = MyApp();
  String? dropdownValue = 'Public';
  bool isLoading = false;

  void createGroup() async {
    setState(() {
      isLoading = true;
    });

    Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(
            builder: (_) => const Homepage(
                  value: '',
                )),
        (route) => false);
  }

  @override
  void initState() {
    super.initState();
    checkPrefsForUser();
  }

  String holder = '';

  void getDropDownItem() {
    setState(() {
      holder = dropdownValue!;
    });
  }

  @override
  Widget build(BuildContext context) {
    var userDetails = Provider.of<LoginNotifire>(context, listen: false).userId;
    print("ff:$userDetails");
    var phonenumber = Provider.of<LoginNotifire>(context, listen: false).phone;
    print("gettig phone:$phonenumber");
    var userToken = Provider.of<LoginNotifire>(context, listen: false).token;
    print('123423 $userToken');
    Mutation(
      options: MutationOptions(document: gql("""
mutation createGroup(\$name: String!, \$type: String! , \$createruserId:String!){
  createGroup(createGroupInput:{
  name: \$name
  type: \$type
  createruserId: \$createruserId
  }){
    name
  }
}
""")),
      builder: (RunMutation runMutation, QueryResult) {
        return ElevatedButton(
            onPressed: () {
              print(name.text);
              print(type.text);

              runMutation({
                'name': name.text,
                'type': type.text,
                'createruserId': userDetails,
              });
              Navigator.pushNamed(context, Homepage.routerName);
            },
            child: const Text("Create"));
      },
    );

    var authUserId = Provider.of<LoginNotifire>(context, listen: false).userId;

    print(userId);
    print(auth);
    print('hola $holder');
    final data =
        ModalRoute.of(context)?.settings.arguments as Map<String, bool>;
    final Size size = MediaQuery.of(context).size;

    return Scaffold(
        appBar: AppBar(
          title: Text(
            "Create Group",
            style: TextStyle(
                color: HexColor("#A96BFF"),
                fontWeight: FontWeight.bold,
                fontSize: 25),
          ),
          backgroundColor: Colors.transparent,
          elevation: 0,
          iconTheme: IconThemeData(color: HexColor("#A96BFF")),
        ),
        body: AlertDialog(
          title: Text("Create"),
          content: Container(
            child: SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  maxWidth: MediaQuery.of(context).size.width,
                ),
                child: Stack(
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.only(top: 10.0),
                      child: TextField(
                        maxLength: 40,
                        controller: name,
                        decoration: const InputDecoration(
                          icon: Icon(Icons.person),
                          labelText: "name",
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.only(top: 90.0),
                      child: TextFormField(
                        initialValue: 'Public',
                        // enabled: false,
                        maxLength: 40,
                        // controller: type,
                        decoration: const InputDecoration(
                          icon: Icon(Icons.public),
                          labelText: "type",
                        ),
                      ),
                    ),
                    // Container(
                    //   padding: EdgeInsets.only(top: 90.0, left: 50),
                    //   child: TextField(
                    //     maxLength: 40,
                    //     controller: type,
                    //     decoration: const InputDecoration(
                    //       icon: Icon(Icons.toys),
                    //       labelText: "type",
                    //     ),
                    //   ),
                    // child: DropdownButton<String>(
                    //   value: dropdownValue,
                    //   icon: const Icon(Icons.arrow_downward),
                    //   iconSize: 24,
                    //   elevation: 16,
                    //   style: const TextStyle(color: Colors.deepPurple),
                    //   underline: Container(
                    //     height: 2,
                    //     color: Colors.deepPurpleAccent,
                    //   ),
                    //   onChanged: (String? newValue) {
                    //     setState(() {
                    //       dropdownValue = newValue!;
                    //     });
                    //   },
                    //   items: <String>['Public', 'Private']
                    //       .map<DropdownMenuItem<String>>((String value) {
                    //     return DropdownMenuItem<String>(
                    //       value: value,
                    //       child: Text(value),
                    //     );
                    //   }).toList(),
                    // ),
                    //
                  ],
                ),
              ),
            ),
          ),
          actions: <Widget>[
            Mutation(
                options: MutationOptions(
                  document: gql("""
mutation createGroup(\$name: String!, \$type: String! , \$createruserId:String!){
  createGroup(createGroupInput:{
  name: \$name
  type: \$type
  createruserId: \$createruserId
  }){
    name
  }
}
"""),
                  onCompleted: (dynamic resultData) {
                    var postIdData = resultData?['createGroup'];

                    print("second$postIdData");
                    Navigator.pushNamed(context, Homepage.routerName);
                  },
                ),
                builder: (runMutation, result) {
                  if (result!.hasException) {
                    return Text(result.exception.toString());
                  }

                  if (result.isLoading) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }

                  return ElevatedButton(
                      onPressed: () {
                        print(name.text);
                        print(type.text);

                        runMutation({
                          'name': name.text,
                          'type': "public",
                          'createruserId': userDetails,
                        });
                      },
                      child: const Text("Create"));
                }),

//             Query(
//                 options: QueryOptions(document: gql("""
//  query phonenumber(\$tmparray:String!){
//    phonenumber(phone:\$tmparray){
//    id
//   }
// }
//   """), variables: {'tmparray': "9921862523"}),
//                 builder: (QueryResult result, {fetchMore, refetch}) {
//                   if (result.hasException) {
//                     return Text(result.exception.toString());
//                   }
//                   if (result.isLoading) {
//                     return const Center(
//                       child: CircularProgressIndicator(),
//                     );
//                   }
//                   final listuser = result.data!['phonenumber'];
//                   final contactuserid = result.data!['phonenumber']['id'];
//                   print('gettinggg $listuser');
//                   throw ("err");
//                 })
          ],
        ));
  }
}
