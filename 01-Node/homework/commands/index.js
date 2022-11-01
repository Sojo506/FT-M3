const fs = require("fs");
const request = require("request");

const prompt = () => {
  return process.stdout.write("\npromp > ");
}
const done = (data) => {
  return process.stdout.write(data);
}


function pwd(data) {
  process.stdout.write(__dirname);
  prompt()
}

function date(data) {
  process.stdout.write(Date());
}

function ls(data) {
  fs.readdir(".", (err, file) => {
    if (err) throw err;
    file.forEach((f) => {
      done(`${f.toString()}\n`);
    });

    prompt()
  });
}

function echo(data) {
  done(data.join(" "));
}

function cat(data) {
  fs.readFile(data.join(" "), "utf-8", (err, content) => {
    if (err) done("No such file or directory");
    else {
      done(content);
    }
    prompt()
  });
}

function head(data) {
  fs.readFile(data.join(" "), "utf-8", (err, content) => {
    if (err) done("No such file or directory");
    else {
      done(content.slice(0, Math.floor(content.length / 2)));
    }
    prompt() 
  });
}

function tail(data) {
  fs.readFile(data.join(" "), "utf-8", (err, content) => {
    if (err) done("No such file or directory");
    else {
      done(content.slice(Math.floor(content.length / 2)));
      prompt()
    }
  });
}

function curl(data) {
  request.get(data.join(" "), "utf-8", (err, response, body) => {
    if (err) done("Invalid URL: Example: https://github.com/");
    else {
      done(body);
    }
    prompt()
  });
}

function wc(data) {
  fs.readFile(data.join(" "), "utf-8", (err, content) => {
    if (err) done("No such file or directory");
    else {
      done(`Length of caracters: ${content.length.toString()}`);
    }
    prompt()
  });
}

module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
  wc,
  prompt
};
