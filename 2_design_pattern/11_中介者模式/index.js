/**
 * 使网状的多对多关系变成相对简单一点的一对多关系
 *
 * 使用中介者模式实现一个小例子
 */

const STATE = {
  ALIVE: "alive",
  DEAD: "dead",
};

function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = STATE.ALIVE;
}
Player.prototype.lose = function () {
  console.log(`${this.name} lose!`);
};

Player.prototype.win = function () {
  console.log(`${this.name} win!`);
};

Player.prototype.die = function () {
  console.log(`${this.name} dead!`);
  this.state = STATE.DEAD;
  PlayerDirector.receiveMessage("playerDead", this);
};

Player.prototype.changeTeam = function (color) {
  PlayerDirector.receiveMessage("changeTeam", this, color);
};

const PlayerDirector = (function () {
  const players = {};
  const operations = {};

  operations.addPlayer = function (player) {
    const { teamColor } = player;
    players[teamColor] ??= [];
    players[teamColor].push(player);
  };

  operations.removePlayer = function (player) {
    const { teamColor } = player;
    const team = players[teamColor];
    for (let i = team.length - 1; i >= 0; i--) {
      if (team[i] === player) {
        team.splice(i, 1);
      }
    }
  };

  operations.changeTeam = function (player, color) {
    operations.removePlayer(player);
    player.teamColor - color;
    operations.addPlayer(player);
  };

  operations.playerDead = function (player) {
    const { teamColor } = player;
    // 玩家所在队伍
    const team = players[teamColor];
    // 检查当前玩家所在team其他玩家是否阵亡
    let all_dead = true;
    for (let i = 0; i < team.length; i++) {
      if (team[i].state === STATE.ALIVE) {
        all_dead = false;
        break;
      }
    }

    if (all_dead) {
      for (let i = 0; i < team.length; i++) {
        team[i].lose();
      }
      // 其他队伍获胜
      for (const color in players) {
        if (color !== teamColor) {
          const otherPlayer = players[color];
          for (let i = 0; i < otherPlayer.length; i++) {
            otherPlayer[i].win();
          }
        }
      }
    }
  };

  const receiveMessage = function () {
    const message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    receiveMessage,
  };
})();

const player1 = new Player("小黑", "red");
const player2 = new Player("小红", "red");
const player3 = new Player("小黄", "red");
const player4 = new Player("小蓝", "red");

const player5 = new Player("小白", "blue");
const player6 = new Player("小绿", "blue");
const player7 = new Player("小紫", "blue");
const player8 = new Player("小橙", "blue");

PlayerDirector.receiveMessage("addPlayer", player1);
PlayerDirector.receiveMessage("addPlayer", player2);
PlayerDirector.receiveMessage("addPlayer", player3);
PlayerDirector.receiveMessage("addPlayer", player4);
PlayerDirector.receiveMessage("addPlayer", player5);
PlayerDirector.receiveMessage("addPlayer", player6);
PlayerDirector.receiveMessage("addPlayer", player7);
PlayerDirector.receiveMessage("addPlayer", player8);

player1.die();
player2.die();
player3.die();
player4.die();
