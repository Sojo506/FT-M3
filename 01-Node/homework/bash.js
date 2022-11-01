//console.log(Object.keys(process))
//console.log(Object.keys(process))
const commands = require("./commands");

process.stdout.write("prompt > ");

process.stdin.on("data", data => {
  var cmd = data.toString().trim(); // remueve la nueva línea
  if(commands[cmd.split(' ')[0]]) commands[cmd.split(' ')[0]](cmd.split(' ').slice(1))
  else {
    process.stdout.write(`command not found`);
    commands.prompt()
  }
  /* process.stdout.write("\nprompt > "); */
});