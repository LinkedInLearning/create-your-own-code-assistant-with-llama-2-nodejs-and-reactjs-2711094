import { commands, ExtensionContext,Uri, chat } from "vscode";
import { KuzcoPanel } from "./panels/KuzcoPanel";
import { KuzcoChat } from './panels/KuzcoChat';

export function activate(context: ExtensionContext) {
  console.log('Kuzco Started')
  // Create the show hello world command
  const showKuzcoCommand = commands.registerCommand("kuzco.showChat", () => {
    console.log('kuzco command Active')
      KuzcoPanel.render(context.extensionUri);
  });

   // Register the chat participant and its request handler
   const kuzcoChatPartcipant = chat.createChatParticipant('kuzco.chat', KuzcoChat.initialize);

   // Optionally, set some properties for @kuzco
   kuzcoChatPartcipant.iconPath = Uri.joinPath(context.extensionUri, 'kuzco.png');
  // Add command to the extension context
  context.subscriptions.push(showKuzcoCommand, kuzcoChatPartcipant);
}
