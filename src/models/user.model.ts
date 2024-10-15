import { ADMIN_PERMISSION, Roles } from '@common/constants/global.const';
import { Twofa, TwofaDto } from '@common/interfaces/user.interface';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from '@common/validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { IsArray, IsOptional } from 'class-validator';
import { NextFunction } from 'express';
import { Document, PopulatedDoc, SchemaTypes, Types } from 'mongoose';

export class MetaData {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  createdBy: Types.ObjectId;

  @ApiProperty()
  @IsArray()
  @Prop({ type: SchemaTypes.Array, default: [] })
  permissions: ADMIN_PERMISSION[];
}

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: false })
  adminId: PopulatedDoc<User, Types.ObjectId>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: false })
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Prop({ required: false })
  orderPrefix: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: false })
  ownerEmail: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  @Prop()
  supportEmail: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ type: Object, required: false })
  twofa: Twofa;

  @ApiProperty()
  @Prop({ type: TwofaDto, default: { enable: false, secret: '' } })
  twofaPayment: Twofa;

  @ApiProperty()
  @Prop({ required: false, default: Roles.seller })
  role: Roles;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Prop({ required: false })
  telegramGroupId?: string;

  @ApiProperty()
  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date | null;

  @ApiProperty()
  @Prop({ default: false })
  status: boolean;

  @ApiProperty()
  @Prop({ required: false })
  metaData: MetaData;

  isValidPassword: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: NextFunction) {
  try {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if ('password' in update && typeof update === 'object') {
    const password = update.password;
    if (password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      update.password = hash;
    }
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.statics = {};
