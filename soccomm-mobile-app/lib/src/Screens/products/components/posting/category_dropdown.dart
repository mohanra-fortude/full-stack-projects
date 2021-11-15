import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/donation_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/event_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/posting_screen.dart';
import 'package:new_project/src/Screens/products/components/posting_product.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';
import 'package:new_project/src/provider/login_changenotifire.dart';
import 'package:provider/provider.dart';

import 'informational/job_post.dart';

class CategoryDropDown extends StatefulWidget {
  static const routerName = "/categories";

  const CategoryDropDown({Key? key}) : super(key: key);

  @override
  _CategoryDropDownState createState() => _CategoryDropDownState();
}

class _CategoryDropDownState extends State<CategoryDropDown> {
  //level1
  var mainCategoriesData = [];
  var subCategoriesData = [];
  var InfoSubChildCategoriesData = [];
  var financeSubChildCategoriesData = [];
  var servicesSubChildCategoriesData = [];
  var rentalsSubChildCategoriesData = [];
  var goodsSubChildCategoriesData = [];

  //level2
  var goodsItems = [];
  var servicesItems = [];
  var rentalItems = [];
  var financeItems = [];
  var informationalItems = [];

  //level3 informationalItems
  var jobsItems = [];
  var eventsItems = [];
  var donataionItems = [];

  //level3 financItems
  var crowdfundingItems = [];
  var insuranceItems = [];
  var loansItems = [];

  //level3 serviceItems
  var yogaItems = [];
  var danceItems = [];
  var musicItems = [];

  //level3 rentalItems
  var booksItems = [];
  var vehicleItems = [];
  var houseItems = [];

  //level3 goodsItems
  var foodItems = [];
  var electronicsItems = [];
  var furnitureItems = [];
  var automobilesItems = [];

  var disable = ["Disabeld"];
  var _selectedCategory;
  var _selectedCategory2;
  var _selectedCategory3;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Choose Category"),
        backgroundColor: Colors.transparent,
      ),
      body: Container(
        decoration: BoxDecoration(
          color: Colors.deepPurple[600],
        ),
        child: Query(
            options: QueryOptions(
              document: gql("""
         query {
          findByLevel(level:1){
            id
            name
            child{
              id
              name
              parentId
              child{
                id
                name
                parentId
              }
            }
          }
        }
          """),
            ),
            builder: (QueryResult result, {fetchMore, refetch}) {
              if (result.hasException) {
                return Text(result.exception.toString());
              }
              if (result.isLoading) {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
              final List listData = result.data!['findByLevel'];

              final mapList = listData.map((items) => {
                    mainCategoriesData.add(items["name"]),
                    subCategoriesData.add(items["child"]),
                  });
              print("database$mapList");

              print(mainCategoriesData);
              print("subCategoriesData$subCategoriesData");
              List subCarMap = subCategoriesData[0];
              List subCarMap1 = subCategoriesData[1];
              List subCarMap2 = subCategoriesData[2];
              List subCarMap3 = subCategoriesData[3];
              List subCarMap4 = subCategoriesData[4];

              var obj = ":";
              print("rr$subCarMap1");

              //maping finance
              var mapchildnams = subCarMap1.map((val) => {
                    financeItems.add(val['name'] + obj + val['id']),
                  });

              print("financeItemsMap$mapchildnams");
              print("financeItems$financeItems");

              //maping informationalItems
              var mapchildnams1 = subCarMap.map((val) => {
                    informationalItems.add(val['name'] + obj + val['id']),
                  });
              print("informationalItemsMap$mapchildnams1");
              print("informationalItems$informationalItems");

              //maping services
              var mapchildnams2 = subCarMap2.map((val) => {
                    servicesItems.add(val['name'] + obj + val['id']),
                  });
              print("servicesItemsMap$mapchildnams2");
              print("servicesItems$servicesItems");

              //maping goodsItems
              var mapchildnams3 = subCarMap4.map((val) => {
                    goodsItems.add(val['name'] + obj + val['id']),
                  });
              print("goodsItemsMap$mapchildnams3");
              print("goodsItems$goodsItems");

              //maping rental
              var mapchildnams4 = subCarMap3.map((val) => {
                    rentalItems.add(val['name'] + obj + val['id']),
                  });
              print("rentalItemsMap$mapchildnams4");
              print("rentalItems$rentalItems");

              //maping informational seb-chiled
              var mapSubChilds = subCarMap.map((val) => {
                    InfoSubChildCategoriesData.add(val['child']),
                  });
              print("mapSubChilds$mapSubChilds");
              print("InfoSubChildCategoriesData$InfoSubChildCategoriesData");

              List inforSubChildCarMap = InfoSubChildCategoriesData[0];
              List inforSubChildCarMap1 = InfoSubChildCategoriesData[1];
              List inforSubChildCarMap2 = InfoSubChildCategoriesData[2];
              print("inforSubChildCarMap$inforSubChildCarMap");
              print("inforSubChildCarMap1$inforSubChildCarMap");
              print("inforSubChildCarMap2$inforSubChildCarMap");

              //maping level3 informational public
              var joblevel3CateMap = inforSubChildCarMap.map((val) => {
                    jobsItems.add(val['name'] + obj + val['id']),
                  });
              print("jobsItems$jobsItems");
              print("joblevel3CateMap$joblevel3CateMap");

              //maping level3 informational events
              var eventslevel3CateMap1 = inforSubChildCarMap1.map((val) => {
                    eventsItems.add(val['name'] + obj + val['id']),
                  });
              print("eventsItems$eventsItems");
              print("eventslevel3CateMap1$eventslevel3CateMap1");

              //maping level3 informational donataions
              var donataionslevel3CateMap1 = inforSubChildCarMap2.map((val) => {
                    donataionItems.add(val['name'] + obj + val['id']),
                  });
              print("donataionItems$donataionItems");
              print("donataionslevel3CateMap1$donataionslevel3CateMap1");

              //maping finance seb-chile
              var mapSubChilds1 = subCarMap1.map((val) => {
                    financeSubChildCategoriesData.add(val['child']),
                  });
              print("mapSubChilds1$mapSubChilds1");
              print(
                  "financeSubChildCategoriesData$financeSubChildCategoriesData");

              List financeSubChildCarMap = financeSubChildCategoriesData[0];
              List financeSubChildCarMap1 = financeSubChildCategoriesData[1];
              List financeSubChildCarMap2 = financeSubChildCategoriesData[2];
              print("financeSubChildCarMap$financeSubChildCarMap");
              print("financeSubChildCarMap1$financeSubChildCarMap1");
              print("financeSubChildCarMap2$financeSubChildCarMap2");

              //maping level3 finance crowdfunding
              var crowdlevel3CateMap = financeSubChildCarMap.map((val) => {
                    crowdfundingItems.add(val['name'] + obj + val['id']),
                  });
              print("crowdfundingItems$crowdfundingItems");
              print("joblevel3CateMap$crowdlevel3CateMap");

              //maping level3 finance insurance
              var insurencelevel3CateMap1 =
                  financeSubChildCarMap1.map((val) => {
                        insuranceItems.add(val['name'] + obj + val['id']),
                      });
              print("insuranceItems$insuranceItems");
              print("insurencelevel3CateMap1$insurencelevel3CateMap1");

              //maping level3 finance lones
              var loanslevel3CateMap1 = financeSubChildCarMap2.map((val) => {
                    loansItems.add(val['name'] + obj + val['id']),
                  });
              print("loansItems$loansItems");
              print("loanslevel3CateMap1$loanslevel3CateMap1");

              //maping service seb-chile
              var mapSubChilds2 = subCarMap2.map((val) => {
                    servicesSubChildCategoriesData.add(val['child']),
                  });
              print("mapSubChilds2$mapSubChilds2");
              print(
                  "servicesSubChildCategoriesData$servicesSubChildCategoriesData");

              List servicesSubChildCarMap = servicesSubChildCategoriesData[0];
              List servicesSubChildCarMap1 = servicesSubChildCategoriesData[1];
              List servicesSubChildCarMap2 = servicesSubChildCategoriesData[2];
              print("servicesSubChildCarMap$servicesSubChildCarMap");
              print("servicesSubChildCarMap1$servicesSubChildCarMap1");
              print("servicesSubChildCarMap2$servicesSubChildCarMap2");

              //maping level3 service yoga
              var yogalevel3CateMap = servicesSubChildCarMap.map((val) => {
                    yogaItems.add(val['name'] + obj + val['id']),
                  });
              print("yogaItems$yogaItems");
              print("yogalevel3CateMap$yogalevel3CateMap");

              //maping level3 service dance
              var dancelevel3CateMap1 = servicesSubChildCarMap1.map((val) => {
                    danceItems.add(val['name'] + obj + val['id']),
                  });
              print("danceItems$danceItems");
              print("dancelevel3CateMap1$dancelevel3CateMap1");

              //maping level3 service music
              var musiclevel3CateMap1 = servicesSubChildCarMap2.map((val) => {
                    musicItems.add(val['name'] + obj + val['id']),
                  });
              print("musicItems$musicItems");
              print("musiclevel3CateMap1$musiclevel3CateMap1");

              //maping renatal seb-chile
              var mapSubChilds3 = subCarMap3.map((val) => {
                    rentalsSubChildCategoriesData.add(val['child']),
                  });
              print("mapSubChilds3$mapSubChilds3");
              print(
                  "rentalsSubChildCategoriesData$rentalsSubChildCategoriesData");

              List renatalSubChildCarMap = rentalsSubChildCategoriesData[0];
              List renatalSubChildCarMap1 = rentalsSubChildCategoriesData[1];
              List renatalSubChildCarMap2 = rentalsSubChildCategoriesData[2];
              print("renatalSubChildCarMap$renatalSubChildCarMap");
              print("renatalSubChildCarMap1$renatalSubChildCarMap1");
              print("renatalSubChildCarMap2$renatalSubChildCarMap2");

              //maping level3 service books
              var bookslevel3CateMap = renatalSubChildCarMap.map((val) => {
                    booksItems.add(val['name'] + obj + val['id']),
                  });
              print("booksItems$booksItems");
              print("bookslevel3CateMap$bookslevel3CateMap");

              //maping level3 service vehicle
              var vehiclel3CateMap1 = renatalSubChildCarMap1.map((val) => {
                    vehicleItems.add(val['name'] + obj + val['id']),
                  });
              print("vehicleItems$vehicleItems");
              print("vehiclel3CateMap1$vehiclel3CateMap1");

              //maping level3 service house
              var houseevel3CateMap1 = renatalSubChildCarMap2.map((val) => {
                    houseItems.add(val['name'] + obj + val['id']),
                  });
              print("houseItems$houseItems");
              print("houseevel3CateMap1$houseevel3CateMap1");

              //maping goods seb-chile
              var mapSubChilds4 = subCarMap4.map((val) => {
                    goodsSubChildCategoriesData.add(val['child']),
                  });
              print("mapSubChilds4$mapSubChilds4");
              print("goodsSubChildCategoriesData$goodsSubChildCategoriesData");

              List goodsSubChildCarMap = goodsSubChildCategoriesData[0];
              List goodsSubChildCarMap1 = goodsSubChildCategoriesData[1];
              List goodsSubChildCarMap2 = goodsSubChildCategoriesData[2];
              List goodsSubChildCarMap3 = goodsSubChildCategoriesData[3];

              print("goodsSubChildCarMap$goodsSubChildCarMap");
              print("goodsSubChildCarMap1$goodsSubChildCarMap1");
              print("goodsSubChildCarMap2$goodsSubChildCarMap2");
              print("goodsSubChildCarMap3$goodsSubChildCarMap3");

              //maping level3 service food
              var foodlevel3CateMap = goodsSubChildCarMap.map((val) => {
                    foodItems.add(val['name'] + obj + val['id']),
                  });
              print("foodItems$foodItems");
              print("foodlevel3CateMap$foodlevel3CateMap");

              //maping level3 service electronics
              var electronicsl3CateMap1 = goodsSubChildCarMap1.map((val) => {
                    electronicsItems.add(val['name'] + obj + val['id']),
                  });
              print("electronicsItems$electronicsItems");
              print("electronicsl3CateMap1$electronicsl3CateMap1");

              //maping level3 service furniture
              var furniturelevel3CateMap1 = goodsSubChildCarMap2.map((val) => {
                    furnitureItems.add(val['name'] + obj + val['id']),
                  });
              print("furnitureItems$furnitureItems");
              print("furniturelevel3CateMap1$furniturelevel3CateMap1");

              //maping level3 service automobiles
              var automobileslevel3CateMap1 =
                  goodsSubChildCarMap3.map((val) => {
                        automobilesItems.add(val['name'] + obj + val['id']),
                      });
              print("automobilesItems$automobilesItems");
              print("automobileslevel3CateMap1$automobileslevel3CateMap1");

              return Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    alignment: Alignment.topCenter,
                    margin: EdgeInsets.only(bottom: 100, top: 100),
                    child: Text(
                      'Categories',
                      style:
                          TextStyle(fontWeight: FontWeight.w800, fontSize: 20),
                    ),
                  ),
                  //======================================================== State

                  Container(
                    padding: EdgeInsets.only(left: 15, right: 15, top: 5),
                    color: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Expanded(
                          child: DropdownButtonHideUnderline(
                            child: ButtonTheme(
                              alignedDropdown: true,
                              child: DropdownButton<String>(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5.0)),
                                value: _selectedCategory,
                                iconSize: 30,
                                // icon: (null),
                                style: TextStyle(
                                  color: Colors.black54,
                                  fontSize: 16,
                                ),
                                hint: Text('Select Category'),
                                icon: Icon(Icons.arrow_drop_down_circle),

                                onChanged: (newValue) {
                                  setState(() {
                                    _selectedCategory2 = null;
                                    _selectedCategory3 = null;
                                    _selectedCategory = newValue!;

                                    print("cc$_selectedCategory");
                                  });
                                  print("cc$_selectedCategory");
                                  // Navigator.of(context).pop();
                                },
                                items: mainCategoriesData.toSet().map((item) {
                                      print("all");
                                      print(item);
                                      return new DropdownMenuItem(
                                        child: new Text(
                                            item.toString().toLowerCase()),
                                        value: item.toString().toLowerCase(),
                                      );
                                    })?.toList() ??
                                    [],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),

                  //========================level2================================

                  Container(
                    padding: EdgeInsets.only(left: 15, right: 15, top: 5),
                    color: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Expanded(
                          child: DropdownButtonHideUnderline(
                            child: ButtonTheme(
                              alignedDropdown: true,
                              child: DropdownButton<String>(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(5.0)),
                                  value: _selectedCategory2,
                                  iconSize: 30,
                                  // icon: (null),
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 16,
                                  ),
                                  hint: Text('Select SubCategory'),
                                  icon: Icon(Icons.arrow_drop_down_circle),
                                  disabledHint: Text("Disabled"),
                                  onChanged: (newValue) {
                                    print(newValue);
                                    setState(() {
                                      _selectedCategory3 = null;
                                      _selectedCategory2 = newValue;
                                      print("yy$_selectedCategory2");
                                    });

                                    // Navigator.of(context).pop();
                                  },
                                  items: _selectedCategory == "rentals"
                                      ? rentalItems.toSet().map((item) {
                                          return new DropdownMenuItem(
                                            child: new Text(item
                                                .toString()
                                                .toLowerCase()
                                                .split(':')[0]),
                                            value: item
                                                .toString()
                                                .toLowerCase()
                                                .split(':')[0],
                                          );
                                        }).toList()
                                      : _selectedCategory == "finance"
                                          ? financeItems.toSet().map((item) {
                                              return new DropdownMenuItem(
                                                child: Text(item
                                                    .toString()
                                                    .toLowerCase()
                                                    .split(':')[0]),
                                                value: item
                                                    .toString()
                                                    .toLowerCase()
                                                    .split(':')[0],
                                              );
                                            }).toList()
                                          : _selectedCategory == "goods"
                                              ? goodsItems.toSet().map((item) {
                                                  return new DropdownMenuItem(
                                                    child: Text(item
                                                        .toString()
                                                        .toLowerCase()
                                                        .split(':')[0]),
                                                    value: item
                                                        .toString()
                                                        .toLowerCase()
                                                        .split(':')[0],
                                                  );
                                                }).toList()
                                              : _selectedCategory ==
                                                      "informational"
                                                  ? informationalItems
                                                      .toSet()
                                                      .map((item) {
                                                      return new DropdownMenuItem(
                                                        child: Text(item
                                                            .toString()
                                                            .toLowerCase()
                                                            .split(':')[0]),
                                                        value: item
                                                            .toString()
                                                            .toLowerCase()
                                                            .split(':')[0],
                                                      );
                                                    }).toList()
                                                  : _selectedCategory ==
                                                          "services"
                                                      ? servicesItems
                                                          .toSet()
                                                          .map((item) {
                                                          return new DropdownMenuItem(
                                                            child: Text(item
                                                                .toString()
                                                                .toLowerCase()
                                                                .split(':')[0]),
                                                            value: item
                                                                .toString()
                                                                .toLowerCase()
                                                                .split(':')[0],
                                                          );
                                                        }).toList()
                                                      : []),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 30,
                  ),

                  //================level3========================================

                  Container(
                    padding: EdgeInsets.only(left: 15, right: 15, top: 5),
                    color: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Expanded(
                          child: DropdownButtonHideUnderline(
                            child: ButtonTheme(
                              alignedDropdown: true,
                              child: DropdownButton<String>(
                                  borderRadius:
                                      BorderRadius.all(Radius.circular(5.0)),
                                  value: _selectedCategory3,
                                  iconSize: 30,
                                  // icon: (null),
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 16,
                                  ),
                                  hint: Text('Select SubChildCategory'),
                                  icon: Icon(Icons.arrow_drop_down_circle),
                                  disabledHint: Text("Disabled"),
                                  onChanged: (newValue) {
                                    print("_selectedValue$newValue");

                                    setState(() {
                                      _selectedCategory3 = newValue!;

                                      print("yy$_selectedCategory3");
                                    });
                                    Provider.of<LoginNotifire>(context,
                                            listen: false)
                                        .getSubCategId(newValue!
                                            .toString()
                                            .toLowerCase()
                                            .split(':')[1]);
                                    Provider.of<LoginNotifire>(context,
                                            listen: false)
                                        .getCategoryName(newValue!
                                            .toString()
                                            .toLowerCase()
                                            .split(':')[0]);

                                    Navigator.of(context).pop();
                                    Navigator.pushNamed(
                                        context, PostigScreen.routerName);
                                  },
                                  items: _selectedCategory2 == "jobs"
                                      ? jobsItems.toSet().map((item) {
                                          return new DropdownMenuItem(
                                            child: new Text(item
                                                .toString()
                                                .toLowerCase()
                                                .split(':')[0]),
                                            value:
                                                item.toString().toLowerCase(),
                                          );
                                        }).toList()
                                      : _selectedCategory2 == "events"
                                          ? eventsItems.toSet().map((item) {
                                              return new DropdownMenuItem(
                                                child: Text(item
                                                    .toString()
                                                    .toLowerCase()
                                                    .split(':')[0]),
                                                value: item
                                                    .toString()
                                                    .toLowerCase(),
                                              );
                                            }).toList()
                                          : _selectedCategory2 == "donations"
                                              ? donataionItems
                                                  .toSet()
                                                  .map((item) {
                                                  return new DropdownMenuItem(
                                                    child: Text(item
                                                        .toString()
                                                        .toLowerCase()
                                                        .split(':')[0]),
                                                    value: item
                                                        .toString()
                                                        .toLowerCase(),
                                                  );
                                                }).toList()
                                              : _selectedCategory2 ==
                                                      "crowdfunding"
                                                  ? crowdfundingItems
                                                      .toSet()
                                                      .map((item) {
                                                      return new DropdownMenuItem(
                                                        child: Text(item
                                                            .toString()
                                                            .toLowerCase()
                                                            .split(':')[0]),
                                                        value: item
                                                            .toString()
                                                            .toLowerCase(),
                                                      );
                                                    }).toList()
                                                  : _selectedCategory2 ==
                                                          "insurance"
                                                      ? insuranceItems
                                                          .toSet()
                                                          .map((item) {
                                                          return new DropdownMenuItem(
                                                            child: Text(item
                                                                .toString()
                                                                .toLowerCase()
                                                                .split(':')[0]),
                                                            value: item
                                                                .toString()
                                                                .toLowerCase(),
                                                          );
                                                        }).toList()
                                                      : _selectedCategory2 ==
                                                              "loans"
                                                          ? loansItems
                                                              .toSet()
                                                              .map((item) {
                                                              return new DropdownMenuItem(
                                                                child: Text(item
                                                                    .toString()
                                                                    .toLowerCase()
                                                                    .split(
                                                                        ':')[0]),
                                                                value: item
                                                                    .toString()
                                                                    .toLowerCase(),
                                                              );
                                                            }).toList()
                                                          : _selectedCategory2 ==
                                                                  "yoga"
                                                              ? yogaItems
                                                                  .toSet()
                                                                  .map((item) {
                                                                  return new DropdownMenuItem(
                                                                    child: Text(item
                                                                        .toString()
                                                                        .toLowerCase()
                                                                        .split(
                                                                            ':')[0]),
                                                                    value: item
                                                                        .toString()
                                                                        .toLowerCase(),
                                                                  );
                                                                }).toList()
                                                              : _selectedCategory2 ==
                                                                      "dance"
                                                                  ? danceItems
                                                                      .toSet()
                                                                      .map(
                                                                          (item) {
                                                                      return new DropdownMenuItem(
                                                                        child: Text(item
                                                                            .toString()
                                                                            .toLowerCase()
                                                                            .split(':')[0]),
                                                                        value: item
                                                                            .toString()
                                                                            .toLowerCase(),
                                                                      );
                                                                    }).toList()
                                                                  : _selectedCategory2 ==
                                                                          "music"
                                                                      ? musicItems
                                                                          .toSet()
                                                                          .map(
                                                                              (item) {
                                                                          return new DropdownMenuItem(
                                                                            child:
                                                                                Text(item.toString().toLowerCase().split(':')[0]),
                                                                            value:
                                                                                item.toString().toLowerCase(),
                                                                          );
                                                                        }).toList()
                                                                      : _selectedCategory2 ==
                                                                              "books"
                                                                          ? booksItems
                                                                              .toSet()
                                                                              .map((item) {
                                                                              return new DropdownMenuItem(
                                                                                child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                value: item.toString().toLowerCase(),
                                                                              );
                                                                            }).toList()
                                                                          : _selectedCategory2 == "vehicle"
                                                                              ? vehicleItems.toSet().map((item) {
                                                                                  return new DropdownMenuItem(
                                                                                    child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                    value: item.toString().toLowerCase(),
                                                                                  );
                                                                                }).toList()
                                                                              : _selectedCategory2 == "house"
                                                                                  ? houseItems.toSet().map((item) {
                                                                                      return new DropdownMenuItem(
                                                                                        child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                        value: item.toString().toLowerCase(),
                                                                                      );
                                                                                    }).toList()
                                                                                  : _selectedCategory2 == "food"
                                                                                      ? foodItems.toSet().map((item) {
                                                                                          return new DropdownMenuItem(
                                                                                            child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                            value: item.toString().toLowerCase(),
                                                                                          );
                                                                                        }).toList()
                                                                                      : _selectedCategory2 == "electronics"
                                                                                          ? electronicsItems.toSet().map((item) {
                                                                                              return new DropdownMenuItem(
                                                                                                child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                                value: item.toString().toLowerCase(),
                                                                                              );
                                                                                            }).toList()
                                                                                          : _selectedCategory2 == "furniture"
                                                                                              ? furnitureItems.toSet().map((item) {
                                                                                                  return new DropdownMenuItem(
                                                                                                    child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                                    value: item.toString().toLowerCase(),
                                                                                                  );
                                                                                                }).toList()
                                                                                              : _selectedCategory2 == "automobiles"
                                                                                                  ? automobilesItems.toSet().map((item) {
                                                                                                      return new DropdownMenuItem(
                                                                                                        child: Text(item.toString().toLowerCase().split(':')[0]),
                                                                                                        value: item.toString().toLowerCase(),
                                                                                                      );
                                                                                                    }).toList()
                                                                                                  : []),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              );
            }),
      ),
    );
  }
}
