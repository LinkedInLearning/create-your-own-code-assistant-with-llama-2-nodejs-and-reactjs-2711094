import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';
import { LogService } from './log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
async function bootstrapCli() {
  const cliCommand = 'cusco';
  const cliExecutable = './bin/cusco';

  /*const app = await CommandFactory.createWithoutRunning(AppModule, {
    completion: {
      cmd: cliCommand,
      fig: true,
      nativeShell: {
        executablePath: cliExecutable,
      },
    },
  });
  await CommandFactory.runApplication(app);*/
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

bootstrapCli();
//bootstrap();
