import * as Discord from "discord.js";
import * as ConfigFile from "./src/config";
import { IBotCommand } from "./src/api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on("ready", () => {

    //Poinformuj nas, że bot jest online
    console.log("Gotowy do działania");
})

client.on("message", msg => {

    //Zignoruj ​​wiadomość, jeśli została wysłana przez bota
    if(msg.author.bot) { return; }

    //Ignoruj ​​wiadomości, które nie zaczynają się od prefiksu
    if(!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    msg.channel.send(`${msg.author.username} właśnie użył polecenia`);
})

async function handleCommand(msg: Discord.Message) {

    //Split the string into the command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = msg.content.split(" ").slice(1);

    //Loop throught all of our loaded commands
    for(const commandClass of commands){

        //Attempt to execute code but ready in case of a possible error
        try{

            //Check if our command class is the correct one
            if(!commandClass.isThisCommand(command)){
             
                //Go to the next iteration of the loop if this isn't the correct command class
                continue;
            }

            //Pause execution whilst we run the command's code
            await commandClass.runCommand(args, msg, client);
        }
        catch(exception){

            //If there is an error, then log yhe exception
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string) {

    //Wyjdź, jeśli nie ma poleceń
    if(!ConfigFile.config.commands || (ConfigFile.config.commands as string[]).length === 0) { return; }

    //Zapętl wszystkie polecenia w naszym pliku konfiguracyjnym
    for(const commandName of ConfigFile.config.commands as string[]){

        const commandClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandClass() as IBotCommand

        commandClass.push(command);
    }
}

client.login(ConfigFile.config.token);