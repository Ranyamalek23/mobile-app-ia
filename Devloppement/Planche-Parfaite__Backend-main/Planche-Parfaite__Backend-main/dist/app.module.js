"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const session_module_1 = require("./session/session.module");
const posture_module_1 = require("./posture/posture.module");
const feedback_module_1 = require("./feedback/feedback.module");
const auth_module_1 = require("./auth/auth.module");
const users_entity_1 = require("./users/users.entity");
const session_entity_1 = require("./session/session.entity");
const posture_entity_1 = require("./posture/posture.entity");
const feedback_entity_1 = require("./feedback/feedback.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'PlancheParfaiteBd',
                entities: [users_entity_1.User, session_entity_1.Session, posture_entity_1.Posture, feedback_entity_1.Feedback],
                synchronize: false,
                migrations: ['dist/migrations/*.js'],
                migrationsRun: true,
                autoLoadEntities: true,
            }),
            users_module_1.UsersModule,
            session_module_1.SessionModule,
            posture_module_1.PostureModule,
            feedback_module_1.FeedbackModule,
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map