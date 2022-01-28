import { makeStyles } from "@material-ui/core";
import { grey, deepPurple} from '@mui/material/colors';

const drawerWidth = 260;
const appbarHeight = 50;

const useStyles = makeStyles (theme => ({
    appbar : {
        backgroundColor: 'primary',
        height : appbarHeight,
        boxShadow : "none",
        display : "flex"     
    },
    box:{
        width : '80%',
        height : 30,
        backgroundColor: grey[50],
        borderRadius : 50,
        marginBottom : 15,
        display : "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft : '2%',
        marginRight : '5%',
        [theme.breakpoints.down("xs")]: {
            width : '60%',
            marginRight : 30
        }    
    },
    text :{
        marginBottom : 15,
        [theme.breakpoints.down("xs")]: {
            fontSize : 25
        },
        visited : {
            textDecoration: "none"
        },
        links : {
            textDecoration: "none"
        } 
    },
    seacrhicon :{
        color : deepPurple[800],
        paddingLeft : 5,
        paddingTop : 5
    },
    input :{
        width : 250,
        height : 10,
        fontSize : 5,
        paddingLeft : 5,
        paddingTop : 15 
    },
    links :{
        marginBottom : 10,
        marginLeft : 60,
    },
    iconbox :{
        display : "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height : 50,
        width : 600,
        marginLeft : 10,
        marginTop : 15,
        [theme.breakpoints.down("sm")]: {
            display: "none"
          }
    },
    avatar : {
        marginTop : -10
    },
    drawer : {
        width : drawerWidth,
        zIndex : -1,
        overflow: "auto"   
    },
    drawerPaper : {
        width : drawerWidth,
        marginTop : appbarHeight,
    },
    root : {
        display : 'flex'
    },
    leftdrawerlistitems :{
        height : 40,
    },
    button :{
        width : 180,
        marginLeft : 10,
        boxShadow : "none",
        backgroundColor : theme.palette.grey[400],
        color : theme.palette.grey[900]
    },
    horizontalline :{
        width : drawerWidth-40,
        marginLeft : 8,
        color : deepPurple[200]
    },
    typo :{
        marginTop : 5,
    },
    createpost :{
        marginTop : appbarHeight + 30,
        marginLeft : 20,
        width : "90%",
        height : 200,
        display : "flex",
        flexDirection: 'column',
        padding : 10,
        borderRadius : 10,
    },
    menuButton: {
        marginRight: 2,
        [theme.breakpoints.up("md")]: {
          display: "none"
        },
        marginBottom : 15
      },
    menu : {
        marginTop : 35,
        //display : "flex",
        //flexDirection: 'column',
        //justifyContent: 'space-around',
        
    },
    menubuttonTwo : {
        position : "auto",
        marginRight : 0,
        [theme.breakpoints.up("md")]: {
            display: "none"
        },
        marginBottom : 15,
        color : grey[50]
    },
     friendstitle :{
         marginLeft : 10,
         marginTop : -10,
         color : deepPurple[700]
     },
     timelineAvatar :{
        borderRadius : 0,
        width : "28%",
        height : 30
     },
     typo2 : {
         marginLeft : 25
     },
     typo3 : {
        marginLeft : 10
     },
     rightbarTop : {
        marginTop : appbarHeight + 20,
        marginLeft : 10,
        marginRight : 10,
        paddingTop : -50,
        width : "40%",
        display : "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        boxShadow : "none",
        [theme.breakpoints.down(1070)]: {
            display: "none"
          }
     },
     boldText : {
         display : "inline",
         fontWeight : 800
     },
     ad : {
         borderRadius : 10
     },
     fadedText : {
        display : "inline",
        fontWeight : 400,
        color : grey[500]
     },
     friendButton : {
         color : deepPurple[400]
     },
     createpostTitle : {
         marginLeft : 70,
         marginTop : -30,
         height : 10,
         width : "80%"
     },
     horizontalline2 : { 
        display : "block",
        width : "95%",
        marginLeft : 20,
        marginTop : 60,
        color : grey[200],
        fontWeight : 200,
     },
     shareoptions :{
        display : "flex",
        marginLeft : 20,
        marginTop : 20,
        flexDirection: 'row',
        [theme.breakpoints.down(1070)]: {
            width : "100%"
        },
        [theme.breakpoints.down(750)]: {
            width : "80%"
        },
     },
     shareoption : {
        display : "flex",
        alignItems : "center",
        marginRight : "5%",
        [theme.breakpoints.down(750)]: {
            marginRight : "3%",
        }
     },
     feedBox : {
        display : "flex",
        flexDirection: 'column',
        width : "60%",
        [theme.breakpoints.down("sm")]: {
            width : "80%"
        },
        [theme.breakpoints.down(750)]: {
            width : "90%"
        }
     },
     post : {
        width : "93%",
        borderRadius : 10,
        marginLeft : 20,
        marginTop : 30,
        boxShadow: "1px 1px 2px 2px lightgrey",
        display : "flex",
        flexDirection: 'column',
     },
     postTitle : {
        display : "flex",
        justifyContent : "flex-start",
        marginLeft : 70,
        marginTop : -50,
     },
     postText : {
         textAlign : "left"
     },
     postImg : {
         marginTop : 20,
         width : "100%",
         maxHeight : 500,
         objectFit : "contain"
     },
     postBottom : {
         display : "flex",
         alignItems : "center",
         justifyContent : "flex-start",
         width : "90%",
         marginLeft : 20,
         marginTop : 20,
         marginBottom : 15
     },
     likecountertext : {
         marginRight : "46%"
     },
     feedBox2 : {
        display : "flex",
        flexDirection: 'column',
        width : "60%",
        [theme.breakpoints.down("sm")]: {
            width : "80%"
        },
        [theme.breakpoints.down(750)]: {
            width : "80%"
        },
        [theme.breakpoints.up("md")]: {
            marginLeft : drawerWidth
        },
     },
     profilePageTop : {
        height : 320,
        width : "100%",
     },
     root2 : {
         display : "flex",
         flexDirection : "column"
     },
     avatar2 : {
         width:150,
         height:150, 
         marginLeft: "54%", 
         marginTop:-75, 
         border:"3px solid white",
         [theme.breakpoints.down(960)]: {
            marginLeft : "40%"
        },
    },
    profileHeading : {
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        [theme.breakpoints.up("md")]: {
            marginLeft : drawerWidth
        },
    },
    userInfo : {
        display : "flex",
        flexDirection : "column",
        textAlign : "left",
        marginTop : 100,
        [theme.breakpoints.up("md")]: {
            marginLeft : drawerWidth+20
        },
        marginLeft : 20,
    },
    friendBox : {
        display : "flex",
        flexDirection : "row",
        marginTop : 10,
        [theme.breakpoints.up("md")]: {
            marginLeft : drawerWidth+20
        },
        marginLeft : 20,
    },
    root3 : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        // backgroundColor : grey[100],
        width : "90%",
        height : 650,
    },
    login : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        width : "70%",
        height : "60%",
        [theme.breakpoints.down(720)]: {
            display : "flex",
            flexDirection : "column",
            alignItems : "center",
        },
    },
    loginTitle : {
        width : "50%",
        display : "flex",
        flexDirection : "column",
        marginRight : 50,
        textAlign : "left"
    },
    loginForm : {
        width : "50%",
        display : "flex",
        flexDirection : "column",
        backgroundColor : grey[50],
        alignItems : "center",
        justifyContent : "center",
        paddingTop : 20,
        paddingBottom : 20,
        borderRadius : 5,
        height : "90%",
        boxShadow : "1px 1px 5px 5px #c2c2c2",
        [theme.breakpoints.down(720)]: {
            width : "340px",
            marginLeft : 30,
            marginTop : 30
        },
    },
    profileBtnBox : {
        // [theme.breakpoints.up("md")]: {
        //     marginLeft : drawerWidth + 20
        // },
        // marginLeft : 20,
        right : 10,
        position : "absolute",
        marginTop : -45,
        display : "flex",
        alignItems : "center",
    },
    userInfoBox : {
        position : "relative",
        width : "100%"
    },
    chatContainer : {
        marginTop : appbarHeight,
        //height : "100%",
        alignItems : "row",
        width : "100%",
        [theme.breakpoints.up(900)]: {    
            display : "flex",
            alignItems : "row",
        },
    },
    conversationContainer : {
        width : "25%",
        height : "100%",
        borderRight : "1px solid grey",
        overflow : "auto",
        [theme.breakpoints.down(900)]: {
            width : "350px"
        },
    },
    conversation : {
        display : "flex",
        alignItems : "center",
        padding : 10,
        height : 60,
        marginTop : 5,
    },
    conversationNames : {
        position : "relative",
        width : "100%",
    },
    chatBox : {
        width : "75%",
        [theme.breakpoints.down(475)]: {
            width : "351px"
        },
        backgroundColor : grey[100]
    },
    message : {
        padding: 10, 
        marginLeft: 10, 
        borderRadius: 20, 
        maxWidth: "45%", 
        backgroundColor: "#4462d4", 
        color: "white"
    },
    messageTime : {
        marginLeft: 60,
        marginTop : 0,
        fontSize : 12,
        color : grey[700]
    },
    messageOwn : {
        padding: 10, 
        marginLeft: 10, 
        borderRadius: 20, 
        maxWidth: "45%", 
        backgroundColor: "#a5c6f2", 
        color: "black"
    },
    messageBox : {
        display: "flex", 
        alignItems: "row", 
        padding: 10
    },
    messageOwnBox : {
        display: "flex", 
        justifyContent: 'flex-end', 
        padding: 10
    },
    ownMessageTime : {
        display: "flex", 
        justifyContent: 'flex-end',
        marginRight : 60,
        marginTop : 0,
        fontSize : 12,
        color : grey[700]
    },
    chatBoxBottom : {
        display : "flex",
        marginTop : 5,
        alignItems : "center",
        justifyContent : "space-between",
        padding : 10,
        position : "sticky",
    },
    chatDivOverflow : {
        display : "flex",
        flexDirection : "column",
        overflow : "auto",
        height : 445
    },
    chatPage : {
        overflow : "hidden"
    },
    menuItem : {
        display : "flex",
        alignItems : "center",
        flexDirection : "row",
        textDecoration: "none",
        color: "black",
        paddingBottom : 10,
    },
    shareoption2 : {
        display : "flex",
        alignItems : "center",
        marginRight : "5%",
        [theme.breakpoints.down(600)]: {
            display : "none"
        }
    },
    settings : {
        margin : 80,
        [theme.breakpoints.up(900)]: {
            marginLeft : 280, marginTop: 80
       }
    }
}));

export {useStyles};