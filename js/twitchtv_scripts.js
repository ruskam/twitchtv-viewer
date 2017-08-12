//$('#users-list-all').html('');
var usersListAll = $('#users-list-all');
var $usersListOn = $('#users-list-on');
var $usersListOff = $('#users-list-off');

$(document).ready(function() {

    var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "so9beckster", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var twitchStreamsUrl = 'https://wind-bow.glitch.me/twitch-api/streams/';
    var twitchUsersUrl = 'https://wind-bow.glitch.me/twitch-api/users/';
    var twitchUrl = 'https://www.twitch.tv/';
    var userObjects = [];

    usernames.forEach(function(user) {
        $.ajax({
            method: "get",
            dataType: "jsonp",
            url: twitchStreamsUrl + user,
            success: function(data) {
                if (data.stream != null) {
                    userObjects.push(new User(user, data.stream.channel.status, data.stream.channel.logo));

                    usersListAll.append('<li class="list-group-item" id = "listelement"><a href="' + twitchUrl + user + '"  target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="http://www.iconsdb.com/icons/preview/green/checkmark-xxl.png" class="img-tick" alt="user_logo" align="right"></div></div></a></li>');

                    $usersListOn.append('<a href="' + twitchUrl + user + '" class="list-group-item list-group-item-action" target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="http://www.iconsdb.com/icons/preview/green/checkmark-xxl.png" class="img-tick" alt="user_logo" align="right"></div></div></a>');


                } else {
                    //console.log(user, data.stream, data.stream.channel);
                    $.ajax({
                        method: "get",
                        dataType: "jsonp",
                        url: twitchUsersUrl + user,
                        success: function(dataUsers) {
                            userObjects.push(new User(user, null, dataUsers.logo));

                            usersListAll.append('<li class="list-group-item" id = "listelement"><a href="' + twitchUrl + user + '" target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="https://cdn.iconscout.com/public/images/icon/free/png-512/exclamation-mark-outlined-punctuation-red-3702d20ebbcfb6cd-512x512.png" class="img-tick" alt="user_logo" align="right"></div></div></a></li>');

                            $usersListOff.append('<a href="' + twitchUrl + user + '" class="list-group-item list-group-item-action" target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="https://cdn.iconscout.com/public/images/icon/free/png-512/exclamation-mark-outlined-punctuation-red-3702d20ebbcfb6cd-512x512.png" class="img-tick" alt="user_logo" align="right"></div></div></a>');

                        }
                    });

                }
            }
        });

    });


});

$('#users-list-all').ready(function(){
    console.log($('#users-list-all')[0]);
});


function User(userName, status, logoUrl) {
    this.userName = userName;
    this.status = status;
    this.logoUrl = logoUrl;
}

$('#search-input').keyup(function () {
    var valThis = this.value.toLowerCase(),
        lenght  = this.value.length;

    $('.navList>li').each(function () {
        var text  = $(this).text();
        var textL = text.toLowerCase();
        var htmlR = '<b>' + text.substr(0, lenght) + '</b>' + text.substr(lenght);
        if (textL.indexOf(valThis) == 0) {
            $(this).html(htmlR).show();
        } else {
            $(this).hide();
        }
    });

});
/*
function instantSearch() {
    var input, filter, myList, listElement, a;
    input = $('#search-input');
    filter = input.val().toUpperCase();
    myList = document.getElementById('#users-list-all');
    console.log(myList);
    a = myList.getElementsByTagName("a");
    //console.log(a);
    for (var i = 0; i < a.length; i++) {
        //console.log(a[i].innerText);
        if (a[i].innerText.toUpperCase().indexOf() > -1){
            a[i].style.display = "";
            //console.log(a[i].style.display);
        } else {
            a[i].style.display = "none";
        }
    }


}
*/
