"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReturnFields = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    'searchTerm',
    'id',
    'email',
    'contactNo',
];
exports.userSearchableFields = [
    'name',
    'email',
    'contactNo',
    'id',
];
exports.userReturnFields = {
    id: true,
    name: true,
    email: true,
    role: true,
    contactNo: true,
    address: true,
    profileImg: true,
    createdAt: true,
    updatedAt: true,
};
