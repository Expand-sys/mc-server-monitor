console.log("starting monitor - use nohup to daemonize");
const got = require("got");
const mcs = require('node-mcstatus');

let serverstatus = 0
runevery15seconds(1)
function runevery15seconds(i) {
    setTimeout(() => {

        const host = `${process.env.MCADDRESS}`;
        const port = process.env.PORT;
        const options = { query: true };

        // The `port` argument is optional and defaults
        // to 25565. The `options` argument is optional.
        mcs.statusJava(host, port, options)
            .then((result) => {
                if(!result.online && serverstatus == 1){
                    console.log("offline")
                    var params = {
                        username: "MC-monitor",
                        avatar_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/338/171/d12.jpg",
                        content: "Server is Offline <@247288496442703872>",
                    }

                    fetch(`${process.env.WEBHOOK}`, {
                        "method":"POST",
                        "headers": {"Content-Type": "application/json"},
                        "body": JSON.stringify(params)
                      })
                        .then(res=> console.log(res))
                        .catch(err => console.error(err));
                    serverstatus = 0
                }else if(result.online && serverstatus == 0) {
                    console.log("Online")
                    var params = {
                        username: "MC-monitor",
                        avatar_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/338/171/d12.jpg",
                        content: "Server is back online",
                    }
    
                    fetch(`${process.env.WEBHOOK}`, {
                        "method":"POST",
                        "headers": {"Content-Type": "application/json"},
                        "body": JSON.stringify(params)
                      })
                        .then(res=> console.log(res))
                        .catch(err => console.error(err));
                    serverstatus = 1;
                }
            })
            .catch((error) => {
                var params = {
                    username: "MC-monitor",
                    avatar_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/338/171/d12.jpg",
                    content: "Checking service is Offline",
                }
                console.log(error)
                fetch(`${process.env.WEBHOOK}`, {
                    "method":"POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(params)
                  })
                    .then(res=> console.log(res))
                    .catch(err => console.error(err));
            })
            runevery15seconds(++i)
    }, process.env.CHECK_TIMER)
    
}

