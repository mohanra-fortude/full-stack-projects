import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Spacer(),
        Container(
            padding: const EdgeInsets.symmetric(
                // horizontal: kDefaultPadding,
                // vertical: kDefaultPadding / 2,
                ),
            decoration: BoxDecoration(
              color: Theme.of(context).scaffoldBackgroundColor,
            ),
            child: SafeArea(
              child: Row(
                children: [
                  // const Icon(Icons.mic, color:Colors.lightBlue, size: 50.0,),
                  const SizedBox(height: 10.0),
                  // SizedBox(width:kDefaultPadding),
                  Expanded(
                    child: Container(
                      // padding:EdgeInsets.symmetric(horizontal: kDefaultPadding * 0.75),
                      padding: const EdgeInsets.only(bottom: 8.0),
                      decoration: BoxDecoration(
                        color: Colors.orangeAccent.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(40),
                        boxShadow: const [
                          BoxShadow(
                            offset: Offset(0, 4),
                            //  blurRadius: 32,
                            color: Color(0xFFFFF8F8),
                          ),
                        ],
                      ),
                      child: Row(
                        children: [
                          Icon(
                            Icons.sentiment_satisfied_alt_outlined,
                            size: 39.0,
                            color: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .color!
                                .withOpacity(0.64),
                          ),
                          // SizedBox(width:kDefaultPadding/4),
                          // SizedBox(height: 75.0,),
                          const Expanded(
                            child: TextField(
                              decoration: InputDecoration(
                                hintText: "  Type message here",
                                border: InputBorder.none,
                              ),
                            ),
                          ),
                          //  SizedBox(height: 19),
                          Icon(
                            Icons.attach_file,
                            size: 35.0,
                            color: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .color!
                                .withOpacity(0.64),
                          ),
                          Icon(
                            Icons.mic,
                            size: 40.0,
                            color: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .color!
                                .withOpacity(0.64),
                          ),
                          // SizedBox(width:kDefaultPadding/4),

                          const SizedBox(height: 16, width: 8.0),
                          Icon(
                            Icons.camera_alt_outlined,
                            size: 35.0,
                            color: Theme.of(context)
                                .textTheme
                                .bodyText1!
                                .color!
                                .withOpacity(0.64),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}
