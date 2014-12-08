//Retriving all the countries
$(document).ready(function(){
  var worldCup = {

    url: "http://worldcup.kimonolabs.com/api/teams?apikey=f0rt5uSfHOFwGCbA18wh48xRUFbCtr81",
    countryOptions: {
      sort: "group,1"
    },

    toShowCountry: function(data){
        console.log(data);

        var ul = $('<ul>');
        $.each(data, function(i, stuffs){
         
          var li = $('<li>');
          li.addClass("main_list")
          var img = $('<img>');
          img.attr("src", stuffs.logo);
          li.append(img);

          var p = $('<p>');
          p.text(stuffs.name);
          li.append(p);
           
          
          var a = $('<a>');
          a.addClass("player");
          a.attr("href", "#");
          a.text("Player");
          li.append(a);
          
          var br = $('<br/>');
          li.append(br);

          var a_1 = $('<a>');
          a_1.addClass("clubs");
          a_1.attr("href", "#");
          a_1.text("Clubs");
          li.append(a_1); 

          var p_1 = $('<p>');
          p_1.text(stuffs.group);
          li.append(p_1);

          
          ul.append(li);
        });

       
        $('#view').html(ul);
    },

    showCountry: function(){
      $.getJSON(this.url, this.countryOptions, this.toShowCountry).fail(function(){
        var repo ='<p>'+"User Repo not found"+'</p>';
        $('#view').html(repo);
      });
    }  
  };
  
  worldCup.showCountry(); 

  //Getting palyers of countries per click
  $('.player').click( function(e) {
    e.preventDefault();
     console.log(12345);
    var count = $(this).prev();
    var word = count.text();
    console.log(word);

    var playerURL = "http://worldcup.kimonolabs.com/api/players?apikey=f0rt5uSfHOFwGCbA18wh48xRUFbCtr81";
    var playerOption = {
      nationality: word
    };

    var toShowPlayers = function(data) {
      console.log(data);
      var repo = '<ul>';
      $.each(data, function(i, stuffs){
        repo += '<div>';
        repo += '<li>'+'<img src="'+ stuffs.image +'">'+'</li>';
        repo += '</div>';
      });
      repo += '</ul>';
      $('#view').html(repo);
    };

    $.getJSON(playerURL, playerOption, toShowPlayers).fail(function(){
      var repo ='<p>'+"Not found"+'</p>';
      $('#view').html(repo);
    });
  });

  //Getting all clubs
  $('.club').click(function(){

    var clubURL = "http://worldcup.kimonolabs.com/api/clubs?apikey=f0rt5uSfHOFwGCbA18wh48xRUFbCtr81"; 
    var clubOption = {
      limit:20    
    };

    var toShowClub = function(data){
      console.log(data);
      var repo = '<ul>';
      $.each(data, function(i, stuffs){
        repo += '<div>';
        repo += '<li>'+'<img src="'+ stuffs.logo +'">'+'</li>';
        repo += '<p>'+stuffs.name+'</p>';
        repo += '</div>';
      });
      repo += '</ul>';
      $('#view').html(repo); 
    }

    $.getJSON(clubURL, clubOption, toShowClub).fail(function(){
      var repo ='<p>'+"Nothing Found"+'</p>';
      $('#view').html(repo);
    });
  });

  //Retrieving all Matches
  $('.match').click(function(){
    $('#heading').text("Matches");
    matchURL = "http://worldcup.sfg.io/matches";
    matchUrlLogo = "http://worldcup.kimonolabs.com/api/teams?apikey=f0rt5uSfHOFwGCbA18wh48xRUFbCtr81";

    var toShowMatch = function(data){
      console.log(data);
      var ul = $('<ul>');
      $.each(data, function(i,stuffs){
        var li = $('<li>');
        li.addClass("main_grid")
        var p_0 = $('<p>');
        i = i+(parseInt(1));
        p_0.text("Match No:"+" "+ i);
        li.append(p_0);
        var p = $('<p>');
        p.addClass("resize_grid");
        p.text(stuffs.home_team.country+" "+"VS"+" "+stuffs.away_team.country);
        li.append(p);
        
        //p.text("Events");
        

        $.getJSON(matchUrlLogo, {name: stuffs.home_team.country}, function(datum){
          console.log(datum);
          var img = $('<img>');
          img.addClass("resize");
          img.attr("src", datum[0].logo);
          li.append(img);
        });

        $.getJSON(matchUrlLogo, {name: stuffs.away_team.country}, function(datum){
          console.log(datum);
          var img = $('<img>');
          img.addClass("resize");
          img.attr("src", datum[0].logo);
          li.append(img);
        });

        var p_1 = $('<p>');
        p_1.text(stuffs.home_team.goals+":"+stuffs.away_team.goals);
        li.append(p_1);
        var p_2 = $('<p>');
        p_2.text("Location:"+" "+stuffs.location);
        li.append(p_2);

        ul.append(li);
      });
      $('#view').html(ul);
    };

    $.getJSON(matchURL, toShowMatch).fail(function(){
      var repo ='<p>'+"User Repo not found"+'</p>';
      $('#view').html(repo);
    });
  })

});



