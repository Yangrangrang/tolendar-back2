import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
          transport: {
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
              user: process.env.NAVER_ID,
              pass: process.env.NAVER_PW,
              
            },
          },
          template: {
            dir: process.cwd() + '/template/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
      ],
    //   exports: [EmailService],
    //   providers: [EmailService],
})
export class EmailModule {
}
