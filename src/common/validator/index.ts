import {
  IsNumberOptions,
  ValidationOptions,
  ArrayMinSize as _ArrayMinSize,
  IsArray as _IsArray,
  IsBoolean as _IsBoolean,
  IsDate as _IsDate,
  IsDefined as _IsDefined,
  IsEmail as _IsEmail,
  IsEnum as _IsEnum,
  IsIn as _IsIn,
  IsInt as _IsInt,
  IsMimeType as _IsMimeType,
  IsMongoId as _IsMongoId,
  IsNotEmpty as _IsNotEmpty,
  IsNumber as _IsNumber,
  IsObject as _IsObject,
  IsOptional as _IsOptional,
  IsString as _IsString,
  Matches as _Matches,
  Max as _Max,
  MaxLength as _MaxLength,
  Min as _Min,
  MinLength as _MinLength,
} from 'class-validator';
import { VALIDATE_MESSAGE } from './message-validate';

/**
 * TypeORM
 */

/**
 * Class Validator
 * @value ($value) - the value that is being validated
 * @property ($property) - name of the object's property being validated
 * @target ($target) - name of the object's class being validated
 * @package constraint1, $constraint2, ... $constraintN - constraints defined by specific validation type
 */

export const IsNotEmpty = (validationOptions?: ValidationOptions) =>
  _IsNotEmpty({ ...validationOptions, message: VALIDATE_MESSAGE.FIELD_REQUIRE });

export const IsDefined = (validationOptions?: ValidationOptions) =>
  _IsDefined({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });
export const IsMimeType = (validationOptions?: ValidationOptions) =>
  _IsMimeType({ ...validationOptions, message: VALIDATE_MESSAGE.FIELD_REQUIRE });

export const MaxLength = (max: number, validationOptions?: ValidationOptions) =>
  _MaxLength(max, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const Max = (max: number, validationOptions?: ValidationOptions) =>
  _Max(max, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const Min = (min: number, validationOptions?: ValidationOptions) =>
  _Min(min, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const ArrayMinSize = (min: number, validationOptions?: ValidationOptions) =>
  _ArrayMinSize(min, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const MinLength = (min: number, validationOptions?: ValidationOptions) =>
  _MinLength(min, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsOptional = (validationOptions?: ValidationOptions) =>
  _IsOptional({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsIn = (values: readonly any[], validationOptions?: ValidationOptions) =>
  _IsIn(values, { ...validationOptions, message: VALIDATE_MESSAGE.FIELD_REQUIRE });

export const IsInt = (validationOptions?: ValidationOptions) =>
  _IsInt({ ...validationOptions, message: VALIDATE_MESSAGE.FIELD_REQUIRE });

export const Matches = (pattern: RegExp, validationOptions?: ValidationOptions) =>
  _Matches(pattern, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsBoolean = (validationOptions?: ValidationOptions) =>
  _IsBoolean({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsEmail = (validationOptions?: ValidationOptions) =>
  _IsEmail({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsArray = (validationOptions?: ValidationOptions) =>
  _IsArray({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsString = (validationOptions?: ValidationOptions) =>
  _IsString({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsEnum = (entity: object, validationOptions?: ValidationOptions) =>
  _IsEnum(entity, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsNumber = (options?: IsNumberOptions, validationOptions?: ValidationOptions) =>
  _IsNumber(options, { ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsObject = (validationOptions?: ValidationOptions) =>
  _IsObject({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsMongoId = (validationOptions?: ValidationOptions) =>
  _IsMongoId({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });

export const IsDate = (validationOptions?: ValidationOptions) =>
  _IsDate({ ...validationOptions, message: VALIDATE_MESSAGE.INPUT_NOT_VALID });
