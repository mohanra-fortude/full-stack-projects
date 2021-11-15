import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:http/http.dart';
import 'package:new_project/src/Screens/group/deletebtn.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

class GroupMembers extends StatefulWidget {
  static const routerName = "/groupmember";
  const GroupMembers({Key? key}) : super(key: key);

  @override
  _GroupMembersState createState() => _GroupMembersState();
}

class _GroupMembersState extends State<GroupMembers> {
  @override
  Widget build(BuildContext context) {
    var profileuse =
        Provider.of<LoginNotifire>(context, listen: false).profilemember;
    var groupId = Provider.of<LoginNotifire>(context, listen: false).grupid;
    print("grpidinmemberpage:$groupId");
    print("gettingprofile $profileuse");
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade400,
        title: const Text('Group User'),
      ),
      body: Query(
          options: QueryOptions(
            document: gql("""
 query group(\$id:String!){
  group(id:\$id){
    groupusers{
      user{
        username
        id
      }
    }
  }
}
  """),
            variables: {'id': groupId},
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
            final listuser = result.data!['group']['groupusers'];
            // final groupid = result.data!['allgroup']['id'];
            // Provider.of<LoginNotifire>(context, listen: false)
            //     .getGroupuserId(groupid);

            // print('grpppp  $groupid');

            print('gettinggg $listuser');

            // return BackButtonIcon();
            return ListView.builder(
              itemCount: listuser.length,
              itemBuilder: (context, index) {
                final todo = listuser[index];
                return ListTile(
                  leading: const CircleAvatar(
                    backgroundImage: NetworkImage(
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvm23oH1Te7VMVabnGjl2BbwdM_M_iIiwPQ&usqp=CAU'),
                  ),
                  // trailing: todo['id'],
                  // key: todo['id'],

                  title: Text(
                    todo['user']['username'],
                    style: TextStyle(fontWeight: FontWeight.w700),
                  ),
                  // subtitle: Text(todo['type']),
                  onTap: () {
                    var deleteid = (todo['user']['id']);
                    print("btnclick $deleteid");
                    // Navigator.pushNamed(context, DeleteBtn.routerName);
                  },
                  // trailing: const Icon(Icons.delete),
                );
              },
            );
          }),
//       bottomNavigationBar: Mutation(
//         options: MutationOptions(document: gql("""
// mutation deleteGroupUser(\$groupId: String!, \$userId: String!){
//   deleteGroupUser(deleteGroupUser:{
//   groupId: \$groupId
//   userId: \$userId

//   }){
//     id
//   }
// }
// """)),
//         builder: (RunMutation runMutation, QueryResult) {
//           return ElevatedButton(
//               onPressed: () {
//                 runMutation({
//                   'groupId': "650b8bd2-605b-48bb-aadb-d68d241baf04",
//                   'userId': "98f2f199-b3b1-4590-8681-5b2e830f3a8c",
//                 });
//                 print("deletedone");
//               },
//               child: const Text("deleteuser"));
//         },
//       ),
    );
  }
}
