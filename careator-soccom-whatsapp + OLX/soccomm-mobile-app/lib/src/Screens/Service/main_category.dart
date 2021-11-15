import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Rental/rental_main_screen.dart';

class MainCategory extends StatefulWidget {
  static var routerName= './main_category.dart';

  const MainCategory({Key? key}) : super(key: key);

  @override
  _MainCategoryState createState() => _MainCategoryState();
}

class _MainCategoryState extends State<MainCategory> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(15),
              child: SizedBox(
                width: 100,
                height: 90,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  color: HexColor("#A96BFF"),
                  child: InkWell(
                      splashColor: Colors.black.withAlpha(30),
                      onTap: () {
                        print('Goods Card tapped.');
                      },
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: const [
                              Icon(
                                Icons.domain,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                "Goods",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
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
              padding: const EdgeInsets.all(15),
              child: SizedBox(
                width: 100,
                height: 90,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  color: HexColor("#A96BFF"),
                  child: InkWell(
                      splashColor: Colors.black.withAlpha(30),
                      onTap: () {
                        print('Goods Card tapped.');
                      },
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: const [
                              Icon(
                                Icons.group,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                "Service",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
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
              padding: const EdgeInsets.all(15),
              child: SizedBox(
                width: 100,
                height: 90,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  color: HexColor("#A96BFF"),
                  child: InkWell(
                      splashColor: Colors.black.withAlpha(30),
                      onTap: () {
                        print('Goods Card tapped.');
                           Navigator.pushNamed(
                            context, RentalMainScreen.routerName);
                      },

                    
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: const [
                              Icon(
                                Icons.card_giftcard,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                "Rentals",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
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
              padding: const EdgeInsets.all(15),
              child: SizedBox(
                width: 100,
                height: 90,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  color: HexColor("#A96BFF"),
                  child: InkWell(
                      splashColor: Colors.black.withAlpha(30),
                      onTap: () {
                        print('Goods Card tapped.');
                      },
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: const [
                              Icon(
                                Icons.money,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                "Finance",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
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
              padding: const EdgeInsets.all(15),
              child: SizedBox(
                width: 160,
                height: 90,
                child: Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                  ),
                  color: HexColor("#A96BFF"),
                  child: InkWell(
                      splashColor: Colors.black.withAlpha(30),
                      onTap: () {
                        print('Goods Card tapped.');
                      },
                      child: Center(
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(
                            children: const [
                              Icon(
                                Icons.card_membership,
                                size: 25,
                                color: Colors.white,
                              ),
                              Text(
                                "Informational",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w500,
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
    );
  }
}
