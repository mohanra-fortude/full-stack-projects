import 'package:flutter/material.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';

class RentalCategory extends StatefulWidget {
  static var routerName = './rental_category.dart';

  const RentalCategory({Key? key}) : super(key: key);

  @override
  _RentalCategoryState createState() => _RentalCategoryState();
}

class _RentalCategoryState extends State<RentalCategory> {
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
                        Navigator.pushNamed(
                            context, ServiceMainScreen.routerName);
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
