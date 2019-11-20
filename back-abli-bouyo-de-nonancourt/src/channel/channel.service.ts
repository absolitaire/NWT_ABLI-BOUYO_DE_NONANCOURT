import { ConflictException, ImATeapotException, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { from, Observable, of, throwError } from 'rxjs';
import { ChannelEntity } from './entities/channel.entity';
import { catchError, map, flatMap, find, tap } from 'rxjs/operators';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelDao } from './dao/channel.dao';
import { Channel } from './interfaces/channel.interface';
import { UserDto } from './dto/user.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserDao } from '../user/dao/user.dao';
import { MessageEntity } from './entities/message.entity';
import { FindMessagesDto } from './dto/find-messages.dto';
import cryptoRandomString = require('crypto-random-string');
import { RichMessageEntity } from './entities/richmessage.entity';

@Injectable()
export class ChannelService {

  constructor(private readonly _channelDao: ChannelDao,
              private readonly _userDao: UserDao,
              private readonly _logger: Logger,
              ) {
  }

  /**
   * Returns all existing people in the list
   *
   * @returns {Observable<ChannelEntity[] | void>}
   */
  findAll(): Observable<ChannelEntity[] | void> {
    return this._channelDao.findAllChannels()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ChannelEntity(__)) : undefined),
      );
  }

  /**
   * Returns one channel of the list matching id in parameter
   *
   * @param {string} id of the channel
   *
   * @returns {Observable<ChannelEntity>}
   */

  findOne(id: string): Observable<ChannelEntity> {
    return this._channelDao.findChannelById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ChannelEntity(_)) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }


  /**
   * Returns one channel of the list matching id in parameter
   *
   * @param {string} id of the channel
   *
   * @returns {Observable<ChannelEntity>}
   */

  findOneByIdChannel(id: string): Observable<ChannelEntity> {
    return this._channelDao.findChannelByIdChannel(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(new ChannelEntity(_)) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }

  async findMessagesOnChannel(query: FindMessagesDto): Promise<MessageEntity[] | void> {
    return this._channelDao.findMessagesOnChannel(query);
  }
  async findPopulatedMessagesOnChannel(query: FindMessagesDto): Promise<RichMessageEntity[] | void> {
    return this._channelDao.findPopulatedMessagesOnChannel(query);
  }
  // findMessagesOnChannel(params: FindMessagesDto): Observable<MessageEntity[] | void> {
  //   return from(this._channelDao.findMessagesOnChannel(params))
  //     .pipe(
  //       //this._logger.log(`SERVICE`),
  //       map(_ => !!_ ? _.map(__ => new MessageEntity(__)) : undefined),
  //     );
  // }// fonctionne

  findSubscribedChannelsOfUser(id: string): Observable<ChannelEntity[] | void> {
    return from(this._channelDao.findSubscribedChannelsOfUser(id))
      .pipe(
        //this._logger.log(`SERVICE`),
        map(_ => !!_ ? _.map(__ => new ChannelEntity(__)) : undefined),
      );
  }// fonctionne

  /**
   * Check if channel already exists and add it in people list
   *
   * @param channel to create
   *
   * @returns {Observable<ChannelEntity>}
   */


  create(channel: CreateChannelDto): Observable<ChannelEntity> {
    return this._addChannel(channel)
      .pipe(
        // flatMap(_ => this._channelDao.createChannel(_)),

        flatMap(_ => this._channelDao.createChannel(_)),
        catchError(e =>
          e.code = 11000 ?
            throwError(
              new ConflictException(`A channel with the id '${channel.idChannel}' already exists`, e.message),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ChannelEntity(_)),
      );
  }

  /**
   * Add channel with good data in database
   *
   * @param channel to add
   *
   * @returns {Observable<CreateChannelDto>}
   *
   * @private
   */
  private _addChannel(channel: CreateChannelDto): Observable<CreateChannelDto> {
    return of(channel).pipe(
      map(_ =>
        Object.assign(_,
          {
            idChannel: cryptoRandomString({length: 5, type: 'url-safe'}),
          },
          Object.assign({}, _)
        ),
      ));
  }

  private _randomChannelId(): string{
    return '';
  }
  /**
   * Delete one channel.
   * Called when a channel doesn't have any users subscribed anymore.
   *
   * @param {string} id of the channel to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._channelDao.findChannelByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Channel with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Subscribe a user to a channel
   *
   * @param channel subscribed
   * @param subscribing user
   *
   * @returns {Observable<ChannelEntity>}
   */

  // subscribe(sub: SubscriptionDto): Observable<Channel|void> {
  //   return from(this._channelDao.findChannelById(sub.idChannel))
  //   .pipe(
  //     find(_ =>  _.usersSubscribed === sub.idUser ),
  //     flatMap(_ =>
  //       !!_ ?
  //         this._channelDao.subscribe(sub)
  //         :
  //         throwError(new ConflictException(`People with lastname '${person.lastname}` ))
  //     ),
  //   );
  //
  //
  // }
  /*  subscribe(sub: SubscriptionDto): Observable<ChannelEntity> {

      return this._channelDao.findChannelById(sub.idChannel).pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ => {
          if(!!_){
            return of(undefined)
          }else{
           return this._channelDao.subscribe(sub)
             .pipe(
               catchError(e => throwError(new NotFoundException(e.message))),
               flatMap(_ =>
                 !!_ ?
                   of(undefined) :
                   throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
               ),
             );
          }
        }



        ),
      )


    }*/
  // subscribe(sub: SubscriptionDto): Observable<ChannelEntity> { tentative de version qui differencie les erreurs
  //  // if (!!this._channelDao.findChannelById(sub.idChannel)) {
  //    return  this._channelDao.existsWithId(sub.idChannel).subscribe((res)=>{{
  //       if(res){
  //         return this._channelDao.subscribe(sub)
  //           .pipe(
  //             catchError(e => throwError(new NotFoundException(e.message))),
  //             flatMap(_ =>
  //               !!_ ?
  //                 of(undefined) :
  //                 // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
  //                 throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
  //             ),
  //           );
  //
  //
  // } else
  //       {
  //         throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found.`));
  //       }})
  //
  //      ;
  //
  // }
  // subscribe(sub: SubscriptionDto): Observable<ChannelEntity> {// la version qui fonctionne
  //    if (!!this._channelDao.findChannelById(sub.idChannel)) {
  //   // if (from(this._channelDao.existsWithId(sub.idChannel)) ){
  //     return this._channelDao.subscribe(sub)
  //       .pipe(
  //         catchError(e => throwError(new NotFoundException(e.message))),
  //         flatMap(_ =>
  //           !!_ ?
  //             of(undefined) :
  //             // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
  //             // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
  //              throwError(new ConflictException(`Channel with id '${sub.idChannel}' don't exists or user'${sub.idUser}' is already subscribed to this channel`)),
  //         ),
  //       );
  //   } else {
  //     throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found.`));
  //   }
  //
  // }
  tryToSubscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
    //return this._channelDao.findChannelById(message.idChannel)
    return this._userDao.findById(sub.idUser)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.subscribe(sub):
            // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
            // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
            // throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
            throwError(new NotFoundException(`User with id '${sub.idChannel}' doesn't exist`)),
        ),
      );

  }
  subscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
      return this._channelDao.subscribe(sub)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              of(undefined) :
              // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
              // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
              throwError(new ConflictException(`Channel with id '${sub.idChannel}' don't exists or user'${sub.idUser}' is already subscribed to this channel`)),
          ),
        );

  }
  /*  subscribe(sub: SubscriptionDto): Observable<ChannelEntity> {
      return this._channelDao.subscribe(sub)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              of(undefined) :
              throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
          ),
        );
    }*/
  tryToDeleteChannel(sub: SubscriptionDto): Observable<ChannelEntity> {
    //return this._channelDao.findChannelById(message.idChannel)
    return this._channelDao.tryToDeleteChannel(sub.idChannel)
      .pipe(
        catchError(e => throwError(new NotFoundException(e.message))),
        flatMap(_ =>
          !!_ ?
            this.subscribe(sub):
            // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
            // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
            // throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
            //throwError(new NotFoundException(`Channel with id '${sub.idChannel}' doesn't exist`)),
          throwError(new ImATeapotException('Channel successfully deleted'))
        ),
      );

  }
  unsubscribe(sub: SubscriptionDto): Observable<ChannelEntity> {// fonctionne
      return this._channelDao.unsubscribe(sub)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              // of(undefined) :
             this.tryToDeleteChannel(sub) :
               throwError(new NotFoundException(`User with id '${sub.idUser}' or channel with id '${sub.idChannel}'not found`)),
              // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
          ),
        );

  }
  writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity> {
      return this._channelDao.writeIntoChannel(message)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              of(undefined) :
              // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
              // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
              throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
          ),
        );
    }

    tryToWriteIntoChannel(message: CreateMessageDto): Observable<ChannelEntity> {
      //return this._channelDao.findChannelById(message.idChannel)
       return this._userDao.findById(message.idUser)
        .pipe(
          catchError(e => throwError(new NotFoundException(e.message))),
          flatMap(_ =>
            !!_ ?
              this.writeIntoChannel(message):
              // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
              // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
             // throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
            throwError(new NotFoundException(`User with id '${message.idUser}' doesn't exist`)),
          ),
        );

    }
  //
  // writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity> { Fonctionne mais verifie pas l'idUser
  //     return this._channelDao.writeIntoChannel(message)
  //       .pipe(
  //         catchError(e => throwError(new NotFoundException(e.message))),
  //         flatMap(_ =>
  //           !!_ ?
  //             of(undefined) :
  //             // throwError(new NotFoundException(`Channel with id '${sub.idChannel}' not found`)),
  //             // throwError(new ConflictException(`User'${sub.idUser}' is already subscribed to the channel '${sub.idChannel}'`)),
  //             throwError(new ConflictException(`Channel with id '${message.idChannel}' doesn't exist`)),
  //         ),
  //       );
  //   }

}