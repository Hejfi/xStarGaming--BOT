import * as Discord from "discord.js"
import {IBotCommand} from "../api";

export default class testCommand  implements IBotCommand{
    
    private readonly _command = "testCommand"

    help(): string {
        return "To polecenie nic nie robi! Jak zabawnie :)";
    }

        isThisCommand(command: string): boolean {
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        
        //Daj nam znać, że wszystko poszło dobrze
        msgObject.channel.send("To działa!!");
    }
}