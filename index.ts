console.log("starting monitor - use nohup to daemonize");
const got = require("got");
const Gamedig = require('gamedig');

let serverstatus = 0
runevery15seconds(1)
function runevery15seconds(i) {
    setTimeout(() => {
        Gamedig.query({
            type: 'minecraft',
            host: 'mc.emre-personal.net',
            port: 25565,
            debug: true,
            socketTimeout: 3000
        }).then((state) => {
            console.log(state);
            if(serverstatus == 0){
                var params = {
                    username: "MC-monitor",
                    avatar_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/338/171/d12.jpg",
                    content: "Server is back online",
                }

                fetch('https://discord.com/api/webhooks/1155727545724047400/IvcXVXZNpX10fwHhPaIZQ6OYl5XJ2f0iFoBhrYnKtGYHWR2_SMHruXyhcIZR8IsY8P8V', {
                    "method":"POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(params)
                  })
                    .then(res=> console.log(res))
                    .catch(err => console.error(err));
            }
            serverstatus = 1
        
        }).catch((error: any) => {
            console.log("Server is offline");
            console.log(error)
            if( serverstatus == 1){
                var params = {
                    username: "MC-monitor",
                    avatar_url: "https://i.kym-cdn.com/photos/images/newsfeed/001/338/171/d12.jpg",
                    content: "Server is Offline <@247288496442703872>",
                }
                console.log(error)
                fetch('https://discord.com/api/webhooks/1155727545724047400/IvcXVXZNpX10fwHhPaIZQ6OYl5XJ2f0iFoBhrYnKtGYHWR2_SMHruXyhcIZR8IsY8P8V', {
                    "method":"POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(params)
                  })
                    .then(res=> console.log(res))
                    .catch(err => console.error(err));
            }
            serverstatus = 0
            
        
        });
        runevery15seconds(++i);
    }, 5000)
}

