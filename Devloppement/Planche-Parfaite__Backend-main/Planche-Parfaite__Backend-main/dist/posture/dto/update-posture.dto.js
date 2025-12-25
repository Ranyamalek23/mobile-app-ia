"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_posture_dto_1 = require("./create-posture.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdatePostureDto extends (0, mapped_types_1.PartialType)(create_posture_dto_1.CreatePostureDto) {
}
exports.UpdatePostureDto = UpdatePostureDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nom de la posture' }),
    __metadata("design:type", String)
], UpdatePostureDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description de la posture' }),
    __metadata("design:type", String)
], UpdatePostureDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Angle minimal' }),
    __metadata("design:type", Number)
], UpdatePostureDto.prototype, "min_angle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Angle maximal' }),
    __metadata("design:type", Number)
], UpdatePostureDto.prototype, "max_angle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Niveau de difficulté',
        enum: ['Facile', 'Moyen', 'Difficile'],
    }),
    __metadata("design:type", String)
], UpdatePostureDto.prototype, "difficulty", void 0);
//# sourceMappingURL=update-posture.dto.js.map