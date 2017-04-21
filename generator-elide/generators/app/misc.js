// Show info
function show_info() {
    var eb1 = "_____ _ _   _        _____         _   "
    var eb2 = "|   __| |_|_| |___   | __  |___ ___| |_ "
    var eb3s = "|   __| | | . | -_|  | __ -| . | . |  _|"
    var eb4 = "|_____|_|_|___|___|  |_____|___|___|_|"
    var eb5 = "                                  v.1.0"
    console.log(eb1);
    console.log(eb2);
    console.log(eb3s);
    console.log(eb4);
    console.log(eb5);
    console.log("_______________________________________________________________");
    console.log("|Elide Boot is a command line interface (CLI) for Yahoo! Elide|");
    console.log("|Author: Deez Nuts                                            |");
    console.log("|Version: 1.0.0                                               |");
    console.log("|Contact: lame_email@suspicious-server.com                    |");
    console.log("---------------------------------------------------------------");
}

module.exports = {
    show_info: show_info
}
