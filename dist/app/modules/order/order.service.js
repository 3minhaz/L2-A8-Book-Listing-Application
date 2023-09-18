"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield tx.order.create({ data: { userId } });
        const orderedBooks = yield Promise.all(data === null || data === void 0 ? void 0 : data.orderedBooks.map(({ bookId, quantity }) => __awaiter(void 0, void 0, void 0, function* () {
            return tx.orderedBook.create({
                data: {
                    bookId,
                    quantity,
                    orderId: order.id,
                },
            });
        })));
        return {
            id: order.id,
            userId: order.userId,
            orderedBooks: orderedBooks.map(item => ({
                bookId: item.bookId,
                quantity: item.quantity,
            })),
            status: order.status,
            createdAt: order.createdAt,
        };
    }));
    return result;
});
const getAllOrder = (role, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin') {
        return yield prisma_1.default.order.findMany({
            include: {
                orderBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
    else if (role === 'customer') {
        return yield prisma_1.default.order.findMany({
            where: {
                userId,
            },
            include: {
                orderBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
});
const getSingleOrder = (role, id, params) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin') {
        return prisma_1.default.order.findUnique({
            where: { id: params },
            include: {
                orderBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
    else if (role === 'customer') {
        const getOrder = yield prisma_1.default.order.findUnique({ where: { id: params } });
        if ((getOrder === null || getOrder === void 0 ? void 0 : getOrder.userId) !== id) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Forbidden');
        }
        return prisma_1.default.order.findUnique({
            where: { id: params },
            include: {
                orderBooks: {
                    select: {
                        bookId: true,
                        quantity: true,
                    },
                },
            },
        });
    }
});
exports.OrderService = { createOrder, getAllOrder, getSingleOrder };
