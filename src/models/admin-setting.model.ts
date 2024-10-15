import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Document, PopulatedDoc, SchemaTypes, Types } from 'mongoose';
import { IsMongoId, IsOptional } from '@common/validator';
import { IsNotEmpty } from 'class-validator';

@Schema({ timestamps: true })
export class AdminSetting extends Document {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  adminId: PopulatedDoc<User, Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @Prop({ required: false })
  timezone: string;

  @ApiProperty()
  @IsOptional()
  @Prop({ required: false })
  ipServer: string;

  @ApiProperty()
  @IsOptional()
  @Prop({ required: false })
  zerosslKey: string;

  @ApiProperty()
  @IsOptional()
  @Prop({ required: false })
  seventeenTrackKey: string;
}

export const AdminSettingSchema = SchemaFactory.createForClass(AdminSetting);
AdminSettingSchema.statics = {};
