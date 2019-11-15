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
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const create_channel_dto_1 = require("./dto/create-channel.dto");
const channel_entity_1 = require("./entities/channel.entity");
const handler_params_1 = require("./validators/handler-params");
let ChannelController = class ChannelController {
    constructor(_channelService) {
        this._channelService = _channelService;
    }
    getHello(params) {
        return this._channelService.getHello() + params;
    }
    findAll() {
        return this._channelService.findAll();
    }
    findOne(params) {
        return this._channelService.findOne(params.id);
    }
    create(createChannelDto) {
        return this._channelService.create(createChannelDto);
    }
};
__decorate([
    common_1.Get('/mdr'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], ChannelController.prototype, "getHello", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'Returns an array of channels', type: channel_entity_1.ChannelEntity, isArray: true }),
    swagger_1.ApiNoContentResponse({ description: 'No person exists in database' }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ChannelController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOkResponse({ description: 'Returns the person for the given "id"', type: channel_entity_1.ChannelEntity }),
    swagger_1.ApiNotFoundResponse({ description: 'Person with the given "id" doesn\'t exist in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Parameter provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    swagger_1.ApiImplicitParam({ name: 'id', description: 'Unique identifier of the person in the database', type: String }),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChannelController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiCreatedResponse({ description: 'The person has been successfully created', type: channel_entity_1.ChannelEntity }),
    swagger_1.ApiConflictResponse({ description: 'The person already exists in the database' }),
    swagger_1.ApiBadRequestResponse({ description: 'Payload provided is not good' }),
    swagger_1.ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.CreateChannelDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChannelController.prototype, "create", null);
ChannelController = __decorate([
    swagger_1.ApiUseTags('back'),
    common_1.Controller('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.controller.js.map