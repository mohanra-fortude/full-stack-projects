import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/products/components/chat_scree.dart';
import 'package:new_project/src/Screens/products/components/product_details.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:new_project/src/widget/grouplist.dart';
import 'package:provider/provider.dart';
import 'package:smooth_star_rating/smooth_star_rating.dart';

const productsGraphql = """
query allPosts{
  allPosts{
    id
    category{
      id
      name
    }
    user{
      username
    }
    postattribute{
      attributeId
      attributeValue
      attribute{
        name
        id
      }
    }
  }
}""";

class ProductList extends StatefulWidget {
  static var routerName= "/productlist";


  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  var rating = 3.0;

  
  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: Query(
          options: QueryOptions(document: gql(productsGraphql)),
          builder: (QueryResult result, {fetchMore, refetch}) {
            if (result.hasException) {
              return Text(result.exception.toString());
            }
            if (result.isLoading) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            final postList = result.data?['allPosts'];

            print(postList);

            // return const Text("getting data");
            return ListView.builder(
              itemCount: postList.length,
              itemBuilder: (_, index) {
                var post = postList[index];
                return Container(
                  width: 300,
                  height: 350,
                  padding: EdgeInsets.all(40.0),
                  child: Card(
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18.0),
                        side: BorderSide(color: Colors.white)),
                    color: Colors.white,
                    elevation: 10,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            Container(
                              margin:
                                  const EdgeInsets.only(bottom: 70.0, left: 10),
                              child: const CircleAvatar(
                                  backgroundImage:
                                      AssetImage("assets/images/Profil.png")),
                            ),
                            Container(
                              padding: const EdgeInsets.all(10),
                              child: SizedBox(
                                  height: 145,
                                  width: 230,
                                  child: FlatButton(
                                    onPressed: () {
                                      Navigator.pushNamed(
                                          context, ProductDetails.routerName);
                                      print("fff");
                                    },
                                    // child: Image.network(product['image']),
                                    child: Text("Image"),
                                  )),
                            )
                          ],
                        ),
                        Container(
                          margin: const EdgeInsets.only(
                            right: 25.0,
                          ),
                          child: Text(
                            post['cateegory']['name'],
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.w600),
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.only(
                            right: 35.0,
                          ),
                          child: Text(
                            // "price: ${post['amount']}",
                            "price",
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                        ),
                        Row(
                          children: <Widget>[
                            Container(
                              margin: const EdgeInsets.only(
                                left: 20.0,
                              ),
                              child:
                                  // Text("Seller: ${product['user']['username']}",
                                  Text("seller name",
                                      style: TextStyle(
                                        fontSize: 20,
                                      )),
                            ),
                            const Padding(padding: EdgeInsets.all(20)),
                            SmoothStarRating(
                              rating: rating,
                              isReadOnly: false,
                              size: 25,
                              filledIconData: Icons.star,
                              halfFilledIconData: Icons.star_half,
                              defaultIconData: Icons.star_border,
                              starCount: 5,
                              allowHalfRating: true,
                              spacing: 2.0,
                              onRated: (value) {
                                print("rating value -> $value");
                                // print("rating value dd -> ${value.truncate()}");
                              },
                            )
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          }),

//       bottomNavigationBar: Mutation(
//         options: MutationOptions(document: gql("""
// mutation createGroupUser(\$groupId: String!, \$userId: String!,\$isAdmin:Boolean!,\$isActive:Boolean!){
//   createGroupUser(createGroupUserInput:{
//   groupId: \$groupId
//   userId: \$userId
//   isAdmin:\$isAdmin
//   isActive:\$isActive
//   }){
//     id
//   }
// }
// """)),
//         builder: (RunMutation runMutation, QueryResult) {
//           return !_canShowButton
//               ? const SizedBox.shrink()
//               : ElevatedButton(
//                   onPressed: () {
//                     runMutation({
//                       'groupId': groupId,
//                       'userId': userDetails,
//                       'isAdmin': false,
//                       'isActive': true,
//                     });
//                     print("adddone");
//                     hideWidget();
//                   },
//                   child: const Text("Join"));
//         },
//       ),

      // floatingActionButton: FloatingActionButton(

      //   child: Text('Join'),

      //   onPressed: () {
      //     print('group join');
      //   },
      // ),
    );
  }
}
