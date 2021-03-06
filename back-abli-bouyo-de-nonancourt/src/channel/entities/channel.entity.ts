import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Exclude()
export class ChannelEntity {
  @ApiModelProperty({ description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiModelProperty({ description: 'Unique identifier destined to be seen and used by the users', example: 'AbCd3' })
  @Expose()
  @Type(() => String)
  idChannel: string;

  @ApiModelProperty({ description: 'Name', example: 'The Basketball Channel' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiModelProperty({ description: 'Description of the channel', example: 'Channel for the fans of Basketball' })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiModelProperty({ isArray: true, description: 'List of subscribed users', example: '[{\'id\':\'5763cd4dc378a38ecd387737\'}]' })
  @Expose()
  @Type(() => String)
  usersSubscribed: String[];
  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<ChannelEntity>) {
    Object.assign(this, partial);
  }
}
