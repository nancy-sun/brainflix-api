# brainflix-api

## Description ##

This is the backend API for the BrainFlix website.


## Method ##

Node.js, json


## Features ##

Endpoints include: GET full video list, GET single video by id, POST new video to video list, POST comment to specific video by video id, DELETE a comment by comment id, PUT like to video




## API Documentation ##

### Overview ###
local host port: 8080 

local host API url: http://localhost:8080 

No authentication required for local host api usage

### Routes ###

#### GET /videos ####
Returns an array of video objects with brief info of videos. 
Contains video id, title, channel, and poster image for each video.

** Response Body Example **
```
   [
      {
          "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
          "title": "BMX Rampage: 2021 Highlights",
          "channel": "Red Cow",
          "image": "https://i.imgur.com/l2Xfgpl.jpg"
      },
      {
          "id": "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14",
          "title": "Become A Travel Pro In One Easy Lesson",
          "channel": "Todd Welch",
          "image": "https://i.imgur.com/5qyCZrD.jpg"
      }
    ]
```

#### GET /videos/:id ####
Returns an objects with detailed info about a single video. 
Contains video id, title, channel, and poster image, description, views, likes, duration of video, video url, video posting timestamp, comments array of comment objects.

** Response Body Example **
```
    {
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "BMX Rampage: 2021 Highlights",
        "channel": "Red Cow",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels",
        "views": "1,001,023",
        "likes": "110,985",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Micheal Lyons",
                "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going",
                "likes": 0,
                "timestamp": 1628522461000
            },
            {
                "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                "name": "Gary Wong",
                "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board.",
                "likes": 0,
                "timestamp": 1626359541000
            },
            {
                "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
                "name": "Theodore Duncan",
                "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day.",
                "likes": 0,
                "timestamp": 1626011132000
            }
        ]
    }
```

#### POST /videos ####
Post a new video to the api.
Post body requires a video title and video description. 
Response body contains an object with title and description of the video.

** Post Body and Response Body Example **
```
    {
        "title": "new test video",
        "description": "just testing"
    }
```

#### POST /videos/:id/comments ####
Post comment to a video by video id.
Post body requires an object with comment.
Response body contains an object with comment id, name(anonymous default), comment content, likes(0 default), timestamp of comment posting time.

** Post Body Example **
```
    {
    "comment": "testing"
    }
```

** Response Body Example **
```
    {
        "id": "rbcez8spil4a9p5zw",
        "name": "anonymous",
        "comment": "testing",
        "likes": 0,
        "timestamp": 1654975527836
    }
```

#### DELETE /videos/:id/comments/:commentID ####
Delete a comment of a video by video id and comment id.
Response body contains updated video object after deleting comment.

** Response Body Example **
```
    {
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "BMX Rampage: 2021 Highlights",
        "channel": "Red Cow",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels",
        "views": "1,001,023",
        "likes": "110,985",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Micheal Lyons",
                "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going",
                "likes": 0,
                "timestamp": 1628522461000
            },
            {
                "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                "name": "Gary Wong",
                "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board.",
                "likes": 0,
                "timestamp": 1626359541000
            }
        ]
    }
```

#### PUT /videos/:id/likes ####
Add a like to a video by video id.
Response body contains updated video object with new like counts

** Response Body Example **
```
    {
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "title": "BMX Rampage: 2021 Highlights",
        "channel": "Red Cow",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": "On a gusty day in Southern Utah, a group of 25 daring mountain bikers blew the doors off what is possible on two wheels",
        "views": "1,001,023",
        "likes": "110,986",
        "duration": "4:01",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": 1626032763000,
        "comments": [
            {
                "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
                "name": "Micheal Lyons",
                "comment": "They BLEW the ROOF off at their last event, once everyone started figuring out they were going",
                "likes": 0,
                "timestamp": 1628522461000
            },
            {
                "id": "091de676-61af-4ee6-90de-3a7a53af7521",
                "name": "Gary Wong",
                "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board.",
                "likes": 0,
                "timestamp": 1626359541000
            }
        ]
    }
```


