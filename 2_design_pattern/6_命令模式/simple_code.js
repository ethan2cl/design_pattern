/**
 * 命令模式：命令模式中的command值的是一个执行某些特定事情的指令
 */

const Button = {};

function setCommand(button, command) {
  button.click = function () {
    command.execute();
  };
}

const Cooker = {
  cook() {
    console.log("做饭咯...");
  },
};

const command = {
  execute() {
    Cooker.cook();
  },
};

setCommand(Button, command);
Button.click();
