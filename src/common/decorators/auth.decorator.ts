// import { ADMIN_PERMISSION, Roles } from '@common/constants/global.const';
// import { applyDecorators, UseGuards } from '@nestjs/common';
// import { RolesGuard } from 'src/guards/roles.guard';
// import { AdminPermissions, RolesPermission } from './roles.decorator';
// import { PermissionsGuard } from '@guards/permissions.guard';

// export function Auth(roles: Roles[] | Roles) {
//   return applyDecorators(RolesPermission(roles), UseGuards(RolesGuard));
// }

// export function Permissions(permissions: ADMIN_PERMISSION | ADMIN_PERMISSION[]) {
//   return applyDecorators(AdminPermissions(permissions), UseGuards(PermissionsGuard));
// }
