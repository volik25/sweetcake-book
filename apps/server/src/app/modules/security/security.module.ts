import { Module } from '@nestjs/common';
import { UserController } from '@api/modules/security/controllers/user.controller';
import { UserService } from '@api/modules/security/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class SecurityModule {}
