import { ADMIN_PERMISSION, Roles } from '@common/constants/global.const';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const PERMISSIONS_KEY = 'permissions';
export const RolesPermission = (role: Roles | Roles[]) => SetMetadata(ROLES_KEY, role);
export const AdminPermissions = (permissions: ADMIN_PERMISSION | ADMIN_PERMISSION[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
