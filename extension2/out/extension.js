"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const KuzcoPanel_1 = require("./panels/KuzcoPanel");
const KuzcoChat_1 = require("./panels/KuzcoChat");
function activate(context) {
    console.log('Kuzco Started');
    // Create the show hello world command
    const showKuzcoCommand = vscode_1.commands.registerCommand("kuzco.showChat", () => {
        console.log('kuzco command Active');
        KuzcoPanel_1.KuzcoPanel.render(context.extensionUri);
    });
    // Register the chat participant and its request handler
    const kuzcoChatPartcipant = vscode_1.chat.createChatParticipant('kuzco.chat', KuzcoChat_1.KuzcoChat.initialize);
    // Optionally, set some properties for @kuzco
    kuzcoChatPartcipant.iconPath = vscode_1.Uri.joinPath(context.extensionUri, 'kuzco.png');
    // Add command to the extension context
    context.subscriptions.push(showKuzcoCommand, kuzcoChatPartcipant);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map