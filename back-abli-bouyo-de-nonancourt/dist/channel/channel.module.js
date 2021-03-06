"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const channel_controller_1 = require("./channel.controller");
const channel_service_1 = require("./channel.service");
const channel_dao_1 = require("./dao/channel.dao");
const mongoose_1 = require("@nestjs/mongoose");
const channel_schema_1 = require("./schemas/channel.schema");
const message_schema_1 = require("./schemas/message.schema");
const user_dao_1 = require("../user/dao/user.dao");
const user_schema_1 = require("../user/schemas/user.schema");
let ChannelModule = class ChannelModule {
};
ChannelModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Channel', schema: channel_schema_1.ChannelSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Message', schema: message_schema_1.MessageSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }])],
        controllers: [channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService, common_1.Logger, channel_dao_1.ChannelDao, user_dao_1.UserDao],
    })
], ChannelModule);
exports.ChannelModule = ChannelModule;
//# sourceMappingURL=channel.module.js.map