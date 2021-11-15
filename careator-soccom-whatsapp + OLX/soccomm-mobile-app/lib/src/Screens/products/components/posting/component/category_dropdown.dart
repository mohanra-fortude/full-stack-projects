import 'package:flutter/material.dart';
import 'package:new_project/src/Screens/products/components/posting_product.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';


import 'rental/book_posting.dart';
import 'rental/car_posting.dart';
import 'rental/dress_post.dart';
import 'rental/house_posting.dart';
import 'rental/vehicle_posting.dart';

class CategoryDropDown extends StatefulWidget {
  const CategoryDropDown({Key? key}) : super(key: key);

  @override
  _CategoryDropDownState createState() => _CategoryDropDownState();
}

class _CategoryDropDownState extends State<CategoryDropDown> {
  String goodsValue = 'Goods';
  String serviceValue = 'Services';
  String rentalValue = 'Rental';
  String rentalSubValue = 'Rental';
  String fiancevale = 'Finance';
  String informationalValue = 'Informational';
  String informationalSubValues = 'Informational';

  var goodsItems = [
    'Goods',
    'Electronics',
    'Food',
    'furnitures',
    'AutoMobiles'
  ];
  var servicesItems = ['Services', 'Yoga', 'Dance', 'Music'];
  var rentalItems = ['Rental',  'Car', 'House', 'Book'];
    var rentalSubItems = [
    'Car',
    'House',
    'Book',
    ];
  var financeItems = ['Finance', 'Loans', 'Insurence', ' Crowdfunding'];
  var informationalItems = [
    'Informational',
    'Carpool',
    'Jobs',
    'Donations',
    'Events'
  ];
  var informationalSubItems = [
    'Informational',
    'Carpool',
    'Jobs',
    'Donations',
    'Events'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: [
            // Align(alignment:Alignment.centerLeft,
            // child:Icon(Icons.play_arrow_sharp)),
            DropdownButton(
              isExpanded:true,
           
              value: goodsValue,
              
              icon: Icon(Icons.keyboard_arrow_down,  color:Colors.deepPurple),
             
              items: goodsItems.map((String items) {
                return DropdownMenuItem(
                    value: items,
                    child:Center(
                    child: Text(items, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color:Colors.deepPurple))
                ));
              }).toList(),
              onChanged: (newValue) {
                setState(() {
                  goodsValue = {newValue} as String;
                });
              },
            ),
            // Container(margin:EdgeInsets.symmetric(),
            // child:Icon(
            //   Icons.person,
            //   color:Colors.redAccent,
            //   size:20.0,
            // ),
            // ),
            DropdownButton<String>(
              isExpanded:true,
              value: serviceValue,
              icon: Icon(Icons.keyboard_arrow_down,  color:Colors.deepPurple),
              items: servicesItems.map((String items) {
                return DropdownMenuItem(
                    value: items,
                    child:Center(
                    child: Text(items, style: TextStyle(fontSize: 20, fontWeight:FontWeight.bold, color:Colors.deepPurple)),
                    
                ));
              }).toList(),
              onChanged: (newValue) {
                setState(() {
                  serviceValue = newValue!;
                });
                print("after$serviceValue");
              },
            ),
            // DropdownButton(
            //   value: rentalValue,
            //   icon: Icon(Icons.keyboard_arrow_down),
            //   items: rentalItems.map((String items) {
            //     return DropdownMenuItem(
            //         value: items,
            //         child: Text(items, style: TextStyle(fontSize: 20)));
            //   }).toList(),
            //   onChanged: (newValue) {
            //     setState(() {
            //       rentalValue = {newValue} as String;
            //     });
            //   },
            // ),
            DropdownButton<String>(
              isExpanded: true,
              value:rentalValue,
              icon: Icon(Icons.keyboard_arrow_down,  color:Colors.deepPurple),
              items: rentalItems.map((String items) {
                return DropdownMenuItem(
                    value: items,
                    child: Center(
                    child: Text(items, textAlign: TextAlign.center, style: TextStyle(fontSize: 20, fontWeight:FontWeight.bold, color:Colors.deepPurple)),
                    ));

              }).toList(),
              onChanged: (newValue) {
                print("fdf$newValue");
                setState(() {
                  rentalValue = newValue!;
                });
                switch (rentalValue) {
                  // case "Vehicle":
                  //   Navigator.pushNamed(context, VehiclePosting.routerName);
                  //   break;
                    case "House":
                    Navigator.pushNamed(context, HousePosting.routerName);
                    break;
                  case "Car":
                    Navigator.pushNamed(context, CarPosting.routerName);
                    break;
                  // case "Dress":
                  //   Navigator.pushNamed(context, DressPosting.routerName);
                  //   break;
                  case "Book":
                    Navigator.pushNamed(context, BookPosting.routerName);
                    break;
                }
              },
            ),

            DropdownButton(
              isExpanded:true,
              value: fiancevale,
              icon: Icon(Icons.keyboard_arrow_down,  color:Colors.deepPurple),
              items: financeItems.map((String items) {
                return DropdownMenuItem(
                    value: items,
                    child:Center(
                    child: Text(
                      items,
                      style: TextStyle(fontSize: 20, fontWeight:FontWeight.bold, color:Colors.deepPurple),
                    )
                    ));
              }).toList(),
              onChanged: (newValue) {
                setState(() {
                  fiancevale = {newValue} as String;
                });
              },
            ),
            DropdownButton<String>(
              isExpanded:true,
              value: informationalValue,
              icon: Icon(Icons.keyboard_arrow_down, color:Colors.deepPurple),
              items: informationalItems.map((String items) {
                return DropdownMenuItem(
                    value: items,
                    child: Center(
                    child:Text(items, style: TextStyle(fontSize: 20, fontWeight:FontWeight.bold, color:Colors.deepPurple))
                ));
              }).toList(),
              onChanged: (newValue) {
                print("fdf$newValue");
                setState(() {
                  informationalValue = newValue!;
                });
                // switch (informationalValue) {
                //   case "Carpool":
                //     Navigator.pushNamed(context, CarpoolPosting.routerName);
                //     break;
                //   case "Jobs":
                //     Navigator.pushNamed(context, JobPosting.routerName);
                //     break;
                //   case "Donations":
                //     Navigator.pushNamed(context, DonationPosting.routerName);
                //     break;
                //   case "Events":
                //     Navigator.pushNamed(context, EventPosting.routerName);
                //     break;
                // }
              },
            ),
          ],
        ),
      ),
    );
  }
}

// import 'package:flutter/material.dart';
// import 'package:new_project/src/Screens/Profile/profile_screen.dart';
// import 'package:new_project/src/Screens/products/components/posting_product.dart';

// class CategoryDropDown extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       debugShowCheckedModeBanner: false,
//       home: Scaffold(
//         body: ListView.builder(
//           itemCount: data.length,
//           itemBuilder: (BuildContext context, int index) => EntryItem(
//             data[index],
//           ),
//         ),
//       ),
//     );
//   }
// }

// // Welcome to another flutter tutorial
// // In this video we will see how to create a multi-level Expansion List
// // First Let's create a class for each row in the Expansion List

// class Entry {
//   final String title;
//   final List<Entry>
//       children; // Since this is an expansion list ...children can be another list of entries
//   Entry(this.title, [this.children = const <Entry>[]]);
// }

// // This is the entire multi-level list displayed by this app
// final List<Entry> data = <Entry>[
//   Entry(
//     'Informational',
//     <Entry>[
//       Entry(
//         'Carpool',
//         <Entry>[
//           Entry(
//             'Item A0.1',
//           ),
//           Entry('Item A0.2'),
//           Entry('Item A0.3'),
//         ],
//       ),
//       Entry(
//         'Jobs',
//         <Entry>[
//           Entry('Public'),
//           Entry('Private'),
//         ],
//       ),
//       Entry(
//         'Donations',
//         <Entry>[
//           Entry('Item A0.1'),
//           Entry('Item A0.2'),
//           Entry('Item A0.3'),
//         ],
//       ),
//       Entry(
//         'Events',
//         <Entry>[
//           Entry('Item A0.1'),
//           Entry('Item A0.2'),
//           Entry('Item A0.3'),
//         ],
//       ),
//     ],
//   ),
// ];

// // Create the Widget for the row
// class EntryItem extends StatelessWidget {
//   const EntryItem(this.entry);
//   final Entry entry;

//   // This function recursively creates the multi-level list rows.
//   Widget _buildTiles(Entry root) {
//     print("before$root");
//     if (root.children.isEmpty) {
//       return ListTile(
//         title: Text(root.title),
//       );
//     }
//     return ExpansionTile(
//       key: PageStorageKey<Entry>(root),
//       title: Text(root.title),
//       children: root.children.map<Widget>(_buildTiles).toList(),
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return _buildTiles(entry);
//   }
// }
