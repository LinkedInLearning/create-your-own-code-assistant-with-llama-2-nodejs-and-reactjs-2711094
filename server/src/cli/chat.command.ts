// cli/src/set-source-directory.command.ts
import { Command, CommandRunner, Option } from 'nest-commander';
import { LogService } from 'src/log/log.service';
import { RagService } from 'src/rag/rag/rag.service';

@Command({
  name: 'chat',
  description: 'makes a chat request',
})
export class ChatCommand extends CommandRunner {
  constructor(
    private readonly ragService: RagService,
    private logSerivce: LogService,
  ) {
    super(); // Important
    this.logSerivce.debug('starting ingest command');
    console.log('this is a console');
  }

  async run(passedParam: string[]): Promise<void> {
    this.logSerivce.log('Running the starting chat');

    this.ragService.run(passedParam.join(' '));

    console.log('Source directory set and code parsed successfully!');
  }

  @Option({
    flags: '-d, --directory [string]',
    description: 'The directory to treated as root of the codebase',
  })
  parseString(val: string): string {
    return val;
  }
}
