import postImage from './assets/postImage.jpg';
import postBatman from './assets/postBatman.jpg';
import spideyPost from './assets/spideyPost.jpg';
import koala from './assets/Koala.jpg';
import cat from './assets/cat.jpg';
import jhon from './assets/jhon.jpeg';
import bruce_wayne from './assets/bruce_wayne.jpg';
import milesmorales from './assets/milesmorales.jpeg';

export const Users = [
    {
        id : 1,
        profilePicture : jhon,
        username : "Jhon Wick"
    },
    {
        id : 2,
        profilePicture : koala,
        username : "King Koala"
    },
    {
        id : 3,
        profilePicture : cat,
        username : "Thunder Cat"
    },
    {
        id : 4,
        profilePicture : bruce_wayne,
        username : "Bruce Wayne"
    },
    {
        id : 5,
        profilePicture : milesmorales,
        username : "Miles Morales"
    },
];

export const Posts = [
    {
        id : 1,
        desc : "You've killed my dog!",
        photo : postImage,
        date : "8 mins ago",
        userId : 1,
        like : 32,
        comment : 9
    },
    {
        id : 2,
        desc : "You have to.",
        photo : postBatman,
        date : "5 mins ago",
        userId : 4,
        like : 52,
        comment : 19
    },
    {
        id : 3,
        desc : "",
        photo : spideyPost,
        date : "20 mins ago",
        userId : 5,
        like : 12,
        comment : 3
    },
    {
        id : 4,
        desc : "Sleepy",
        photo : koala,
        date : "5 mins ago",
        userId : 2,
        like : 32,
        comment : 9
    },
    {
        id : 5,
        desc : "",
        photo : cat,
        date : "2 mins ago",
        userId : 3,
        like : 32,
        comment : 9
    },
];

console.log(Posts[0].photo);