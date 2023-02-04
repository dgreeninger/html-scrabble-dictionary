$(document).ready(function() {
    var table = $("table");
    table.append(addCreateGameLink());
    table.append(populateGamesList());
    table.append(winnerList());
});

async function countNames(names) {
  console.log("COUNTING")
  console.log(names)
  console.log(names[3])
  console.log(Object.keys(names).length)
  let nameCounts = {};
  for (let i = 0; i < 54; i++) {
    let name = names[i].trim().toLowerCase();
    if (nameCounts[name] == null) {
      nameCounts[name] = 1;
    } else {
      nameCounts[name]++;
    }
  }
  return nameCounts;
}

function populateGamesList() {
    var gameNumber = 1;
    $.getJSON('/games', function(data) {
        $('table').append(data.map(function(game) {
            return TR(null,
                TD(null, gameNumber++),
                game.players.map(function(player) {
                    return TD(null,
                        A({ href: '/game/' + game.key + '/' + player.key },
                            player.name))
                }))
        }));
    });
}
async function finishedGamesList() {
    var gameNumber = 1;
    let winnerArray = [];
    await $.getJSON('/finished-games', function(data) {
        $('table').append(data.map(function(game) {
            winnerArray.push(game.winner)
        }
        ));
    });
  return winnerArray
}

async function winnerList() {
    console.log("WINNER LIST")
    var winnerList = await countNames(await finishedGamesList());
    let keys = Object.keys(winnerList).reverse();
    console.log(winnerList);
    console.log(keys);
    $('table').append('<tr><td><hr></td><td><hr></td></tr><tr><td>STATISTICS!!!!</td></tr><tr><td><hr></td><td><hr></td></tr><tr><td>Winner\'s Name</td><td>Games Won</td></tr>')
    keys.forEach(function(key) {
      console.log(key)
      $('table').append('<tr><td>'+key+'</td><td>'+winnerList[key]+'</td></tr>')
    });
}
function addCreateGameLink() {
    return TD(null,
        A({ href: "/make-game.html" },
            "Create new game"));
}
