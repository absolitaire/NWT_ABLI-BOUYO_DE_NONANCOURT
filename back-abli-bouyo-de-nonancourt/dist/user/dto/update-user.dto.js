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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const address_dto_1 = require("./address.dto");
class UpdateUserDto {
}
__decorate([
    swagger_1.ApiModelProperty({ description: 'Login', example: 'laughingman' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "login", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Password', example: 'thebestpw' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Firstname', example: 'Mclaughlin' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Lastname', example: 'Cochran' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Address' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInstance(address_dto_1.AddressDto),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => address_dto_1.AddressDto),
    __metadata("design:type", address_dto_1.AddressDto)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsPhoneNumber('FR'),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelProperty({ description: 'Url of the profile picture', example: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "picture", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map