"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const posture_entity_1 = require("./posture.entity");
const posture_service_1 = require("./posture.service");
const posture_controller_1 = require("./posture.controller");
let PostureModule = class PostureModule {
};
exports.PostureModule = PostureModule;
exports.PostureModule = PostureModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([posture_entity_1.Posture])],
        controllers: [posture_controller_1.PostureController],
        providers: [posture_service_1.PostureService],
        exports: [posture_service_1.PostureService],
    })
], PostureModule);
//# sourceMappingURL=posture.module.js.map