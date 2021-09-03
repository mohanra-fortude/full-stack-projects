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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../auth/user/user.service");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
let AddressService = class AddressService {
    constructor(addressRepository, userService) {
        this.addressRepository = addressRepository;
        this.userService = userService;
    }
    async create(uid, createAddressDto) {
        const user = await this.userService.findById(uid);
        const { city, line1, line2, pincode, state } = createAddressDto;
        return this.addressRepository.save({
            city,
            line1,
            line2,
            pincode,
            state,
            user,
            createdAt: new Date().toISOString(),
        });
    }
    findAll() {
        return this.addressRepository.find();
    }
    async findOne(id) {
        return this.addressRepository.findOne(id).then((data) => {
            if (!data)
                throw new common_1.NotFoundException();
            return data;
        });
    }
    update(id, updateAddressDto) {
        return this.addressRepository.update({ id }, Object.assign({}, updateAddressDto));
    }
    remove(id) {
        return this.addressRepository.delete({ id });
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map