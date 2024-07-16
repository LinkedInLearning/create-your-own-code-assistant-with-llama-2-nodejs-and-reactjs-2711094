// cli/src/set-source-directory.command.ts
import { Command, CommandRunner, Option } from 'nest-commander';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { LogService } from 'src/log/log.service';
interface IngestCommandOptions {
  directory?: string;
}

@Command({
  name: 'ingest',
  description: 'Sets the source directory and parses code',
})
export class IngestCommand extends CommandRunner {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private logSerivce: LogService,
  ) {
    super(); // Important
    this.logSerivce.debug('starting ingest command');
    console.log('this is a console');
  }

  async run(
    passedParam: string[],
    options?: IngestCommandOptions,
  ): Promise<void> {
    this.logSerivce.log('Running the ingester');
    if (!!options?.directory) {
      // casting to boolean value
      await this.dataProcessingService.extractAndStoreData(options?.directory);
    } else {
      await this.dataProcessingService.extractAndStoreData(process.cwd());
    }

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
