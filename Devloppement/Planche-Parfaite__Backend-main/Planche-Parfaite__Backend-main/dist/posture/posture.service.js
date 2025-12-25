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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const posture_entity_1 = require("./posture.entity");
let PostureService = class PostureService {
    constructor(postureRepository) {
        this.postureRepository = postureRepository;
    }
    async create(createPostureDto) {
        const posture = this.postureRepository.create(createPostureDto);
        return this.postureRepository.save(posture);
    }
    async findAll() {
        return this.postureRepository.find();
    }
    async findOne(id) {
        const posture = await this.postureRepository.findOneBy({ id });
        if (!posture) {
            throw new common_1.NotFoundException(`Posture avec l'ID ${id} non trouvée`);
        }
        return posture;
    }
    async update(id, updatePostureDto) {
        const posture = await this.findOne(id);
        Object.assign(posture, updatePostureDto);
        return this.postureRepository.save(posture);
    }
    async remove(id) {
        const posture = await this.findOne(id);
        await this.postureRepository.remove(posture);
    }
};
exports.PostureService = PostureService;
exports.PostureService = PostureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(posture_entity_1.Posture)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostureService);
//# sourceMappingURL=posture.service.js.map