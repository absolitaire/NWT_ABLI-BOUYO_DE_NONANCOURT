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
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const channel_entity_1 = require("./entities/channel.entity");
const operators_1 = require("rxjs/operators");
const channel_dao_1 = require("./dao/channel.dao");
const user_dao_1 = require("../user/dao/user.dao");
const cryptoRandomString = require("crypto-random-string");
let ChannelService = class ChannelService {
    constructor(_channelDao, _userDao, _logger) {
        this._channelDao = _channelDao;
        this._userDao = _userDao;
        this._logger = _logger;
    }
    findAll() {
        return this._channelDao.findAllChannels()
            .pipe(operators_1.map(_ => !!_ ? _.map(__ => new channel_entity_1.ChannelEntity(__)) : undefined));
    }
    findOne(id) {
        return this._channelDao.findChannelById(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new channel_entity_1.ChannelEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${id}' not found`))));
    }
    findOneByIdChannel(id) {
        return this._channelDao.findChannelByIdChannel(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(new channel_entity_1.ChannelEntity(_)) :
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${id}' not found`))));
    }
    async findMessagesOnChannel(query) {
        return this._channelDao.findMessagesOnChannel(query);
    }
    async findPopulatedMessagesOnChannel(query) {
        return this._channelDao.findPopulatedMessagesOnChannel(query);
    }
    findSubscribedChannelsOfUser(id) {
        return rxjs_1.from(this._channelDao.findSubscribedChannelsOfUser(id))
            .pipe(operators_1.map(_ => !!_ ? _.map(__ => new channel_entity_1.ChannelEntity(__)) : undefined));
    }
    create(channel) {
        return this._addChannel(channel)
            .pipe(operators_1.flatMap(_ => this._channelDao.createChannel(_)), operators_1.catchError(e => e.code = 11000 ?
            rxjs_1.throwError(new common_1.ConflictException(`A channel with the id '${channel.idChannel}' already exists`, e.message)) :
            rxjs_1.throwError(new common_1.UnprocessableEntityException(e.message))), operators_1.map(_ => new channel_entity_1.ChannelEntity(_)));
    }
    delete(id) {
        return this._channelDao.findChannelByIdAndRemove(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.NotFoundException(`Channel with id '${id}' not found`))));
    }
    tryToSubscribe(sub) {
        return this._userDao.findById(sub.idUser)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            this.subscribe(sub) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${sub.idChannel}' doesn't exist`))));
    }
    subscribe(sub) {
        return this._channelDao.subscribe(sub)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.ConflictException(`Channel with id '${sub.idChannel}' don't exists or user'${sub.idUser}' is already subscribed to this channel`))));
    }
    tryToDeleteChannel(sub) {
        return this._channelDao.tryToDeleteChannel(sub.idChannel)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            this.subscribe(sub) :
            rxjs_1.throwError(new common_1.ImATeapotException('Channel successfully deleted'))));
    }
    unsubscribe(sub) {
        return this._channelDao.unsubscribe(sub)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            this.tryToDeleteChannel(sub) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${sub.idUser}' or channel with id '${sub.idChannel}'not found`))));
    }
    writeIntoChannel(message) {
        return this._channelDao.writeIntoChannel(message)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.ConflictException(`Channel with id '${message.idChannel}' doesn't exist`))));
    }
    tryToWriteIntoChannel(message) {
        return this._userDao.findById(message.idUser)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            this.writeIntoChannel(message) :
            rxjs_1.throwError(new common_1.NotFoundException(`User with id '${message.idUser}' doesn't exist`))));
    }
    _addChannel(channel) {
        return rxjs_1.of(channel).pipe(operators_1.map(_ => Object.assign(_, {
            idChannel: cryptoRandomString({ length: 5, type: 'url-safe' }),
        }, Object.assign({}, _))));
    }
    eraseMessage(id) {
        return this._channelDao.deleteMessage(id)
            .pipe(operators_1.catchError(e => rxjs_1.throwError(new common_1.NotFoundException(e.message))), operators_1.flatMap(_ => !!_ ?
            rxjs_1.of(undefined) :
            rxjs_1.throwError(new common_1.NotFoundException(`Message not found`))));
    }
};
ChannelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [channel_dao_1.ChannelDao,
        user_dao_1.UserDao,
        common_1.Logger])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map