"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KuzcoChat = void 0;
class KuzcoChat {
    /**
     * The KuzcoPanel class private constructor (called only from the render method).
     *
     * @param panel A reference to the webview panel
     * @param extensionUri The URI of the directory containing the extension
     */
    constructor(chat, extensionUri) {
        this._disposables = [];
    }
    static initialize(request, context, stream, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Test for the `ingest` command
            if (request.command === 'ingest') {
                stream.progress('Ingesting your repo give me a minute...');
                // Add logic here to handle the teaching scenario
                this.currentChat.ingestCall(request.prompt);
            }
            else {
                // Determine the user's intent
                const intent = this.determineUserIntent(request.prompt);
                // Add logic here to handle other scenarios
                // other commands we want
            }
            KuzcoChat.currentChat = new KuzcoChat();
            return { metadata: { command: 'ingest' } };
        });
    }
    ingestCall(prompt) {
        // Call to our backend to ingest
    }
    determineUserIntent(prompt) {
    }
}
exports.KuzcoChat = KuzcoChat;
//# sourceMappingURL=KuzcoChat.js.map