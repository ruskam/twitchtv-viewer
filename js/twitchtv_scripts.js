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
                    var newListElement = '<a href="' + twitchUrl + user + '"  target="_blank" class="list-group-item list-group-item-action"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="http://www.iconsdb.com/icons/preview/green/checkmark-xxl.png" class="img-tick" alt="user_logo" align="right"></div></div></a>';
                    usersListAll.append(newListElement);

                    $usersListOn.append('<a href="' + twitchUrl + user + '" class="list-group-item list-group-item-action" target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="http://www.iconsdb.com/icons/preview/green/checkmark-xxl.png" class="img-tick" alt="user_logo" align="right"></div></div></a>');


                } else {
                    //console.log(user, data.stream, data.stream.channel);
                    $.ajax({
                        method: "get",
                        dataType: "jsonp",
                        url: twitchUsersUrl + user,
                        success: function(dataUsers) {
                            userObjects.push(new User(user, null, dataUsers.logo));
                            var newListElement = '<a href="' + twitchUrl + user + '" target="_blank" class="list-group-item list-group-item-action"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="https://cdn.iconscout.com/public/images/icon/free/png-512/exclamation-mark-outlined-punctuation-red-3702d20ebbcfb6cd-512x512.png" class="img-tick" alt="user_logo" align="right"></div></div></a></li>';
                            usersListAll.append(newListElement);

                            $usersListOff.append('<a href="' + twitchUrl + user + '" class="list-group-item list-group-item-action" target="_blank"><div style="display:inline;"><img src="' + userObjects[userObjects.length - 1].logoUrl + '" class="img-circle" alt="user_logo"></div><div style="display:inline; white-space:nowrap; padding-left: 10px;">' + userObjects[userObjects.length - 1].userName + '<div style="display:inline;"><img src="https://cdn.iconscout.com/public/images/icon/free/png-512/exclamation-mark-outlined-punctuation-red-3702d20ebbcfb6cd-512x512.png" class="img-tick" alt="user_logo" align="right"></div></div></a>');

                        }
                    });

                }
            }
        });

    });


});

function User(userName, status, logoUrl) {
    this.userName = userName;
    this.status = status;
    this.logoUrl = logoUrl;
}

/* Search/Filter functionality */
$('#search-input').keyup(function() {
    var valThis = this.value.toLowerCase();

    $('#users-list-all>a').each(function() {
        var text = $(this).text().toLowerCase();
        var textHtml = $(this).html();

        if (text.indexOf(valThis) == 0) {
            $(this).html(textHtml).show();
        } else {
            $(this).hide();
        }
    });

    $('#users-list-on>a').each(function() {
        var text = $(this).text().toLowerCase();
        var textHtml = $(this).html();

        if (text.indexOf(valThis) == 0) {
            $(this).html(textHtml).show();
        } else {
            $(this).hide();
        }
    });
    $('#users-list-off>a').each(function() {
        var text = $(this).text().toLowerCase();
        var textHtml = $(this).html();
        if (text.indexOf(valThis) == 0) {
            $(this).html(textHtml).show();
        } else {
            $(this).hide();
        }
    });
});
