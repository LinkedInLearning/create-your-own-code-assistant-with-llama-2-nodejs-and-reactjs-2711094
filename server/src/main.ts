import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';
import { LogService } from './log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
async function bootstrapCli() {
  const cliCommand = 'kuzco';
  const cliExecutable = './bin/kuzco';

  const app = await CommandFactory.createWithoutRunning(AppModule, {
    completion: {
      cmd: cliCommand,
      //fig: true,
      nativeShell: {
        executablePath: cliExecutable,
      },
    },
  });
  await CommandFactory.runApplication(app);
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

//bootstrapCli();
bootstrap();
