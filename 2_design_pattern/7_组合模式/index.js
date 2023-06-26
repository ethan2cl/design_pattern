/**
 * 组合模式：用小的子对象来构建更大的对象，这些小的子对象可能是由更小的孙对象构成。
 * 组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构
 */
const MacroCommand = function () {
  return {
    commands: [],
    add(command) {
      this.commands.push(command);
    },
    execute() {
      this.commands.forEach((command) => command.execute());
    },
  };
};

const openTvCommand = {
  execute() {
    console.log("open TV");
  },
};
const macroCommand = MacroCommand();
macroCommand.add(openTvCommand);

const openQQCommand = {
  execute() {
    console.log("open QQ");
  },
};

const openQQMusicCommand = {
  execute() {
    console.log("open QQ Music");
  },
};

const macroCommand1 = MacroCommand();
macroCommand1.add(openQQCommand);
macroCommand1.add(openQQMusicCommand);

macroCommand.add(macroCommand1);

macroCommand.execute();
