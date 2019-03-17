"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const client = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => {
    console.log("Gotowy do działania");
});
client.on("message", msg => {
    if (msg.author.bot) {
        return;
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    msg.channel.send(`${msg.author.username} właśnie użył polecenia`);
});
function handleCommand(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
        let args = msg.content.split(" ").slice(1);
        for (const commandClass of commands) {
            try {
                if (!commandClass.isThisCommand(command)) {
                    continue;
                }
                yield commandClass.runCommand(args, msg, client);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config.commands || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass();
        commandClass.push(command);
    }
}
client.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFHdkMsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRXBELElBQUksUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFakMsWUFBWSxDQUFDLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQTtBQUVyQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFHcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFHdkIsSUFBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUc5QixJQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUVqRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBZSxhQUFhLENBQUMsR0FBb0I7O1FBRzdDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHM0MsS0FBSSxNQUFNLFlBQVksSUFBSSxRQUFRLEVBQUM7WUFHL0IsSUFBRztnQkFHQyxJQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBQztvQkFHcEMsU0FBUztpQkFDWjtnQkFHRCxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNwRDtZQUNELE9BQU0sU0FBUyxFQUFDO2dCQUdaLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDMUI7U0FDSjtJQUNMLENBQUM7Q0FBQTtBQUVELFNBQVMsWUFBWSxDQUFDLFlBQW9CO0lBR3RDLElBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQXFCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUFFLE9BQU87S0FBRTtJQUdwRyxLQUFJLE1BQU0sV0FBVyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBb0IsRUFBQztRQUU1RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxZQUFZLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUE7UUFFakQsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM5QjtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMifQ==