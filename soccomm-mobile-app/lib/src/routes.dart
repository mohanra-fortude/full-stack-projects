import 'dart:developer';

import 'package:flutter/widgets.dart';
import 'package:new_project/src/Screens/Login/login.dart';
// import 'package:new_project/src/Screens/Login/otp.dart';
import 'package:new_project/src/Screens/Login/otpclose.dart';
import 'package:new_project/src/Screens/Login/otpopen.dart';
import 'package:new_project/src/Screens/Login/registration.dart';
import 'package:new_project/src/Screens/Profile/components/profile_form.dart';
import 'package:new_project/src/Screens/Profile/profile_screen.dart';
import 'package:new_project/src/Screens/Rental/rental_details.dart';
import 'package:new_project/src/Screens/Rental/rental_main_screen.dart';
import 'package:new_project/src/Screens/Service/main_category.dart';
import 'package:new_project/src/Screens/Service/service_details.dart';
import 'package:new_project/src/Screens/Service/service_main_screen.dart';
import 'package:new_project/src/Screens/group/Adduser.dart';
import 'package:new_project/src/Screens/group/addmember.dart';
import 'package:new_project/src/Screens/group/creategroup.dart';
import 'package:new_project/src/Screens/group/groupmember.dart';
import 'package:new_project/src/Screens/homepage.dart';

import 'package:new_project/src/Screens/products/components/posting/component/rental/book_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/component/rental/car_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/component/rental/dress_post.dart';
import 'package:new_project/src/Screens/products/components/posting/component/rental/house_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/component/rental/vehicle_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/donation_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/event_posting.dart';
import 'package:new_project/src/Screens/products/components/posting/informational/job_post.dart';
import 'package:new_project/src/Screens/products/components/posting_product.dart';
import 'package:new_project/src/Screens/products/components/product_details.dart';
import 'package:new_project/src/Screens/products/components/product_list.dart';
import 'package:new_project/src/Screens/products/products_screens.dart';
import 'package:new_project/src/graphql_config.dart';
import 'package:universal_html/js.dart';

import 'Screens/Service/groupimage/imageupload.dart';
import 'Screens/group/deletebtn.dart';
import 'Screens/products/components/posting/category_dropdown.dart';
import 'Screens/products/components/posting/posting_screen.dart';

// We use name route
// All our routes will be available here
final Map<String, WidgetBuilder> routes = {
  ProfileForm.routerName: (context) => ProfileForm(),
  Products.routerName: (context) => Products(),
  Searchd.routerName: (context) => const Searchd(),
  GroupMembers.routerName: (contex) => const GroupMembers(),
  Profile.routerName: (context) => const Profile(),
  loginScreen.routeName: (context) => loginScreen(),
  registrationScreen.routeName: (context) => registrationScreen(),
  // OtpVerify.routerName: (context) => OtpVerify(),

  OtpClose.routerName: (context) => OtpClose(),
  OtpOpen.routerName: (context) => OtpOpen(),
  Homepage.routerName: (context) => const Homepage(
        value: '',
      ),
  PostingProduct.routerName: (context) => const PostingProduct(),
  CarPosting.routerName: (context) => const CarPosting(),
  HousePosting.routerName: (context) => const HousePosting(),
  // VehiclePosting.routerName:(context) => const VehiclePosting(),

  DressPosting.routerName: (context) => const DressPosting(),
  CarPosting.routerName: (context) => const CarPosting(),

  DressPosting.routerName: (context) => const DressPosting(),
  BookPosting.routerName: (context) => const BookPosting(),
  ProductDetails.routerName: (context) => const ProductDetails(),
  CreateGroup.routerName: (contex) => const CreateGroup(),
  AddMember.routerName: (context) => const AddMember(
        membersList: [],
      ),

  CategoryDropDown.routerName: (context) => CategoryDropDown(),
  JobPosting.routerName: (context) => JobPosting(),
  EventPosting.routerName: (context) => EventPosting(),
  DonationPosting.routerName: (context) => DonationPosting(),
  JobPosting.routerName: (context) => const JobPosting(),
  EventPosting.routerName: (context) => const EventPosting(),
  DonationPosting.routerName: (context) => const DonationPosting(),
  PostigScreen.routerName: (context) => const PostigScreen(),

  // ServiceMainScreen.routerName: (context) => const ServiceMainScreen(),

  serviceDetails.routerName: (context) => const serviceDetails(),
  ProductList.routerName: (context) => ProductList(),
  GroupImage.routerName: (contex) => const GroupImage(),
  ServiceMainScreen.routerName: (context) => const ServiceMainScreen(),
  serviceDetails.routerName: (context) => const serviceDetails(),
  RentalMainScreen.routerName: (context) => const RentalMainScreen(),
  rentalDetails.routerName: (context) => const rentalDetails(),
  ProductList.routerName: (context) => ProductList()
};
