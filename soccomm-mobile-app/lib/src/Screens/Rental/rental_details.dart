import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Rental/rentallist_carosel.dart';

import 'package:smooth_star_rating/smooth_star_rating.dart';

var rating = 3.0;

class rentalDetails extends StatefulWidget {
  static var routerName = "/rentaldetails";

  const rentalDetails({Key? key}) : super(key: key);

  @override
  _rentalDetailsState createState() => _rentalDetailsState();
}

class _rentalDetailsState extends State<rentalDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.purple.shade400,
        title: const Text("ProductDetails"),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Container(
                height: 280,
                child: rentalCarousel(),
              ),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  height: 380.0,
                  decoration: BoxDecoration(
                      color: HexColor("#A96BFF"),
                      borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(40.0),
                          bottomRight: Radius.circular(40.0),
                          topLeft: Radius.circular(40.0),
                          topRight: Radius.circular(40.0))),
                  child: Column(
                    children: <Widget>[
                      const Padding(
                        padding: EdgeInsets.all(10),
                        child: Text(
                          "Product Name",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 25,
                              decoration: TextDecoration.none),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.all(10),
                        child: Text(
                          "Lorem Ipsum is simply dummy text of the printing the dummy text and information about the product A plain text file that contains unformatted text. It is popular due to wide range of compatibility.",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              decoration: TextDecoration.none,
                              fontWeight: FontWeight.w500),
                          textAlign: TextAlign.left,
                        ),
                      ),
                      const Padding(padding: EdgeInsets.all(10)),
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
                        color: Colors.orange,
                        onRated: (value) {
                          print("rating value -> $value");
                          // print("rating value dd -> ${value.truncate()}");
                        },
                      ),
                      Row(
                        children: <Widget>[
                          Container(
                            margin: const EdgeInsets.only(
                              left: 20.0,
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(10.0),
                              child: TextButton(
                                child: const Text(
                                  "Add To Cart",
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 23),
                                ),
                                onPressed: () {},
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.all(10.0),
                            child: IconButton(
                              icon: const Icon(
                                Icons.message_rounded,
                              ),
                              iconSize: 30,
                              color: Colors.white,
                              splashColor: Colors.red,
                              onPressed: () {},
                            ),
                            margin: const EdgeInsets.only(left: 110),
                          )
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(10.0),
                        child: Row(
                          children: <Widget>[
                            Container(
                              margin: const EdgeInsets.only(
                                left: 20.0,
                              ),
                              child: const Padding(
                                padding: EdgeInsets.all(10.0),
                                child: Text(
                                  "Rs 2000",
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 25),
                                ),
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.all(10.0),
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  primary: Colors.white, // background
                                  onPrimary: Colors.black,
                                  minimumSize: const Size(100, 50),
                                  // foreground
                                ),
                                child: const Text(
                                  'Buy',
                                  style: TextStyle(fontSize: 20),
                                ),
                                onPressed: () {
                                  print('You tapped on FlatButton');
                                },
                              ),
                              margin: const EdgeInsets.only(left: 80),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
