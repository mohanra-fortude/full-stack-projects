import 'package:dio/dio.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:http_parser/http_parser.dart';
// import 'dart:io';
// import 'package:path/path.dart';
// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'dart:convert';
// import 'dart:typed_data';
// import 'package:image_picker/image_picker.dart';
// import 'package:http/http.dart' as http;
// import 'package:http_parser/http_parser.dart';
// import 'package:path/path.dart';
// import 'package:async/async.dart';

// class GroupImage extends StatefulWidget {
//   const GroupImage({Key? key}) : super(key: key);

//   static const routerName = "/groupimage";
//   @override
//   State<GroupImage> createState() => _GroupImageState();
// }

// class _GroupImageState extends State<GroupImage> {
//   // String imagePath = "";
//   // late File _image;
//   // late PickedFile _imageFile;
//   // final String uploadUrl = 'http://localhost:5008/media/group';
//   // final ImagePicker _picker = ImagePicker();
//   // late String length;

//   // void uploadImage1(File _imageFile) async {
//   //   // open a byteStream
//   //   var stream =
//   //       new http.ByteStream(DelegatingStream.typed(_imageFile.openRead()));
//   //   // get file length
//   //   var length = await _imageFile.length();

//   //   // string to uri
//   //   var uri = Uri.parse("http://localhost:5008/media/group");

//   //   // create multipart request
//   //   var request = new http.MultipartRequest("POST", uri);

//   //   // if you need more parameters to parse, add those like this. i added "user_id". here this "user_id" is a key of the API request
//   //   request.fields["groupId"] = "c0b37d1b-321a-46e7-a130-65a125addfc5";

//   //   // multipart that takes file.. here this "image_file" is a key of the API request
//   //   var multipartFile = new http.MultipartFile('image_file', stream, length,
//   //       filename: basename(_imageFile.path));

//   //   // add file to multipart
//   //   request.files.add(multipartFile);

//   //   // send request to upload image
//   //   await request.send().then((response) async {
//   //     // listen for response
//   //     response.stream.transform(utf8.decoder).listen((value) {
//   //       print(value);
//   //     });
//   //   }).catchError((e) {
//   //     print(e);
//   //   });
//   // }

//   // Future<void> imageup() async {
//   //   var dio = Dio();
//   //   var d = _imageFile.path;
//   //   var dd = d.split("'");
//   //   var filename = dd[0].split('/').last;
//   //   FormData formData = FormData.fromMap({
//   //     "groupId": "c0b37d1b-321a-46e7-a130-65a125addfc5",
//   //     "image": await MultipartFile.fromFile(dd[1], filename: "$filename"),
//   //   });
//   //   var response = dio.post(
//   //     'http://localhost:5008/media/group',
//   //     data: formData,
//   //     onSendProgress: (received, total) {
//   //       if (total != -1) {
//   //         print((received / total * 100).toStringAsFixed(0) + "%");
//   //       }
//   //     },
//   //   );
//   //   print(response);
//   // }

//   Future<void> upload() async {
//     try {
//       ///[1] CREATING INSTANCE
//       var dioRequest = Dio();
//       dioRequest.options.baseUrl = 'http://localhost:5008/media/';

//       //[2] ADDING TOKEN
//       dioRequest.options.headers = {
//         'Authorization': '<IF-YOU-NEED-ADD-TOKEN-HERE>',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       };

//       //[3] ADDING EXTRA INFO
//       var formData =
//           FormData.fromMap({'groupId': 'c0b37d1b-321a-46e7-a130-65a125addfc5'});

//       //[4] ADD IMAGE TO UPLOAD
//       var file = await MultipartFile.fromFile(_imageFile.path,
//           filename: basename(_imageFile.path),
//           contentType: MediaType("image", "jpg"));

//       formData.files.add(MapEntry('photo', file));

//       //[5] SEND TO SERVER
//       var response = await dioRequest.post(
//         '/group',
//         data: formData,
//       );
//       final result = json.decode(response.toString())['result'];
//     } catch (err) {
//       print('ERROR  $err');
//     }
//   }

//   Future<void> retriveLostData() async {
//     final LostData response = await _picker.getLostData();
//     if (response.isEmpty) {
//       return print("no image");
//     }
//     if (response.file != null) {
//       setState(() {
//         _imageFile = response.file!;
//       });
//     } else {
//       print('Retrieve error ' + response.exception!.code);
//     }
//   }

//   Widget _previewImage() {
//     print('imgfromat');
//     print(_imageFile.path);
//     if (_imageFile != null) {
//       return Center(
//         child: SingleChildScrollView(
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: <Widget>[
//               Image.file(File(_imageFile.path)),
//               SizedBox(
//                 height: 110,
//                 width: 110,
//               ),
//               ElevatedButton(
//                 onPressed: () async {
//                   // var res = await uploadImage(_imageFile.path, uploadUrl);
//                   await upload();
//                   print("upload done");
//                   // senddata();
//                   // submitForm();
//                   // var otp;
//                   // otp = ApiService.uploadimage(
//                   //     _imageFile, "c0b37d1b-321a-46e7-a130-65a125addfc5");
//                   // print(_imageFile);
//                   // print(otp);

//                   // print("Uploaddone $res");
//                   // Navigator.pushNamed(context, ServiceMainScreen.routerName);
//                 },
//                 child: const Text('Upload'),
//               )
//             ],
//           ),
//         ),
//       );
//     } else {
//       return const Text(
//         'You have not yet picked an image.',
//         textAlign: TextAlign.center,
//       );
//     }
//   }

//   Future pickImage() async {
//     try {
//       var pickedFile = await _picker.getImage(source: ImageSource.gallery);
//       print(pickedFile);

//       setState(() {
//         _imageFile = pickedFile!;
//       });
//     } catch (e) {
//       print("Image picker error ");
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text("GROUP IMAGE UPLOAD"),
//       ),
//       body: Container(
//         height: 300,
//         width: 300,
//         margin: const EdgeInsets.only(left: 60),
//         child: Center(
//             child: FutureBuilder<void>(
//           future: retriveLostData(),
//           builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
//             switch (snapshot.connectionState) {
//               case ConnectionState.none:
//               case ConnectionState.waiting:
//                 return const Text('Picked an image');
//               case ConnectionState.done:
//                 return _previewImage();
//               default:
//                 return const Text('Picked an image');
//             }
//           },
//         )),
//       ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: pickImage,
//         tooltip: 'Pick Image from gallery',
//         child: Icon(Icons.photo_library),
//       ), // This trailing comma makes auto-formatting nicer for build methods.
//     );
//   }
// }

import 'dart:io';
import 'package:http/http.dart' as http;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'package:image_picker/image_picker.dart';
import 'package:new_project/src/Screens/Login/restapi.dart';

class GroupImage extends StatefulWidget {
  const GroupImage({Key? key}) : super(key: key);
  static const routerName = "/groupimage";

  @override
  _GroupImageState createState() => _GroupImageState();
}

class _GroupImageState extends State<GroupImage> {
  List<XFile>? _imageFileList;

  set _imageFile(XFile? value) {
    _imageFileList = value == null ? null : [value];
  }

  dynamic _pickImageError;
  String? _retrieveDataError;

  final ImagePicker _picker = ImagePicker();
  final TextEditingController maxWidthController = TextEditingController();
  final TextEditingController maxHeightController = TextEditingController();
  final TextEditingController qualityController = TextEditingController();

  Future<String?> uploadImage(filepath, url) async {
    var request = http.MultipartRequest('POST', Uri.parse(url));
    request.files.add(
        await http.MultipartFile.fromPath('image', 'assets/images/intro.png'));
    var res = await request.send();
    return res.reasonPhrase;
  }

  void _onImageButtonPressed(ImageSource source,
      {BuildContext? context, bool isMultiImage = false}) async {
    if (isMultiImage) {
      await _displayPickImageDialog(context!,
          (double? maxWidth, double? maxHeight, int? quality) async {
        try {
          final pickedFileList = await _picker.pickMultiImage(
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            imageQuality: quality,
          );
          setState(() {
            _imageFileList = pickedFileList;
          });
        } catch (e) {
          setState(() {
            _pickImageError = e;
          });
        }
      });
    } else {
      await _displayPickImageDialog(context!,
          (double? maxWidth, double? maxHeight, int? quality) async {
        try {
          final pickedFile = await _picker.pickImage(
            source: source,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            imageQuality: quality,
          );
          setState(() {
            _imageFile = pickedFile;
          });
        } catch (e) {
          setState(() {
            _pickImageError = e;
          });
        }
      });
    }
  }

  Widget _previewImages() {
    final Text? retrieveError = _getRetrieveErrorWidget();
    if (retrieveError != null) {
      return retrieveError;
    }
    if (_imageFileList != null) {
      return Semantics(
          child: ListView.builder(
            key: UniqueKey(),
            itemBuilder: (context, index) {
              // Why network for web?
              // See https://pub.dev/packages/image_picker#getting-ready-for-the-web-platform
              return Column(
                children: [
                  // Semantics(
                  //   label: 'image_picker_example_picked_image',
                  //   child: kIsWeb
                  //       ? Image.network(_imageFileList![index].path)
                  //       : Image.file(File(_imageFileList![index].path)),
                  // ),
                  Container(
                    height: 70,
                    child: kIsWeb
                        ? Image.network(_imageFileList![index].path)
                        : Image.file(
                            File(_imageFileList![index].path),
                            height: 100,
                            width: 100,
                          ),
                  ),
                  SizedBox(
                    height: 5,
                  ),
//                   Mutation(
//                     options: MutationOptions(
//                         document: gql("""
// mutation updateUser(\$id:String!,\$avatar: String!){
//   updateUser(
//     updateUserInput:{
//     id:\$id
//     avatar: \$avatar
//   }
//   ){
//     __typename

//   }
// }
// """),
//                         onCompleted: (dynamic resultData) {
//                           Navigator.pushNamed(context, Profile.routerName);
//                         }),
//                     builder: (runMutation, result) {
//                       if (result!.hasException) {
//                         return Text(result.exception.toString());
//                       }

//                       if (result.isLoading) {
//                         return Center(
//                           child: const CircularProgressIndicator(),
//                         );
//                       }
//                       return ElevatedButton(
//                           onPressed: () {
//                             runMutation({
//                               'id': userDetails,
//                               'avatar': _imageFileList![index].path
//                             });
//                           },
//                           child: const Text("update"));
//                     },
//                   ),

                  ElevatedButton(
                    onPressed: () async {
                      // var uri = Uri.parse("http://localhost:5008/media/group");

                      // http.Response response = await http.post(uri, body: {
                      //   'imagefile': "assets/images/bike.jpg",
                      //   'groupId': 'c0b37d1b-321a-46e7-a130-65a125addfc5',
                      // });
                      // print(_imageFileList![index].path);
                      // print(response.body);

                      // print('upload done');
                      // var res = await uploadImage("assets/images/bike.jpg",
                      //     "c0b37d1b-321a-46e7-a130-65a125addfc5");
                      // print(res);

                      // var otp;
                      // otp = ApiService.upimage(_imageFileList![index].path,
                      //     "c0b37d1b-321a-46e7-a130-65a125addfc5");
                      // print(_imageFileList![index].path);
                      // print(otp);

                      // print("Uploaddone $res");
                      // Navigator.pushNamed(context, ServiceMainScreen.routerName);
                    },
                    child: const Text('Upload'),
                  )
                ],
              );
            },
            itemCount: _imageFileList!.length,
          ),
          label: 'image_picker_example_picked_images');
    } else if (_pickImageError != null) {
      return Text(
        'Pick image error: $_pickImageError',
        textAlign: TextAlign.center,
      );
    } else {
      return Container(
        child: const Text(
          'Choose Image .',
          style: TextStyle(
            fontSize: 20,
          ),
          textAlign: TextAlign.start,
        ),
      );
    }
  }

  Widget _handlePreview() {
    return _previewImages();
  }

  Future<void> retrieveLostData() async {
    final LostDataResponse response = await _picker.retrieveLostData();
    if (response.isEmpty) {
      return;
    }
    if (response.file != null) {
      setState(() {
        _imageFile = response.file;
        _imageFileList = response.files;
      });
    } else {
      _retrieveDataError = response.exception!.code;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: !kIsWeb && defaultTargetPlatform == TargetPlatform.android
            ? FutureBuilder<void>(
                future: retrieveLostData(),
                builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
                  switch (snapshot.connectionState) {
                    case ConnectionState.none:
                    case ConnectionState.waiting:
                      return const Text(
                        'You have not yet picked an image.',
                        textAlign: TextAlign.center,
                      );
                    case ConnectionState.done:
                      return _handlePreview();
                    default:
                      if (snapshot.hasError) {
                        return Text(
                          'Pick image/video error: ${snapshot.error}}',
                          textAlign: TextAlign.center,
                        );
                      } else {
                        return const Text('You have not yet picked an image.',
                            textAlign: TextAlign.center);
                      }
                  }
                },
              )
            : _handlePreview(),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: <Widget>[
          // Semantics(
          //   label: 'image_picker_example_from_gallery',
          //   child: FloatingActionButton(
          //     onPressed: () {
          //       _onImageButtonPressed(ImageSource.gallery, context: context);
          //     },
          //     heroTag: 'image0',
          //     tooltip: 'Pick Image from gallery',
          //     child: const Icon(Icons.photo),
          //   ),
          // ),
          Padding(
            padding: const EdgeInsets.only(top: 50.0, left: 80),
            child: FloatingActionButton(
              onPressed: () {
                _onImageButtonPressed(
                  ImageSource.gallery,
                  context: context,
                  isMultiImage: true,
                );
              },
              heroTag: 'image1',
              tooltip: 'Pick Multiple Image from gallery',
              child: const Icon(Icons.photo_library),
            ),
          ),
        ],
      ),
    );
  }

  Text? _getRetrieveErrorWidget() {
    if (_retrieveDataError != null) {
      final Text result = Text(_retrieveDataError!);
      _retrieveDataError = null;
      return result;
    }
    return null;
  }

  Future<void> _displayPickImageDialog(BuildContext context, onPick) async {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Please Choose Image'),
            actions: <Widget>[
              TextButton(
                child: const Text('CANCEL'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
              TextButton(
                  child: const Text('PICK'),
                  onPressed: () {
                    double? width = maxWidthController.text.isNotEmpty
                        ? double.parse(maxWidthController.text)
                        : null;
                    double? height = maxHeightController.text.isNotEmpty
                        ? double.parse(maxHeightController.text)
                        : null;
                    int? quality = qualityController.text.isNotEmpty
                        ? int.parse(qualityController.text)
                        : null;
                    onPick(width, height, quality);
                    Navigator.of(context).pop();
                  }),
            ],
          );
        });
  }
}
