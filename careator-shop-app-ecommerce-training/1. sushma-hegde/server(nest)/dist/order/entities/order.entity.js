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
exports.OrderEntity = exports.OrderStatus = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../../address/entities/address.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const order_detail_entity_1 = require("../../order-detail/entities/order-detail.entity");
const payment_entity_1 = require("../../payment/entities/payment.entity");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["DECLINED"] = "declined";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let OrderEntity = class OrderEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "orderId", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: "decimal" }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalAmount", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "shippingDate", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "orderDate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, (user) => user.order),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToOne(() => address_entity_1.Address, (address) => address.order),
    typeorm_1.JoinColumn(),
    __metadata("design:type", address_entity_1.Address)
], OrderEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany(() => order_detail_entity_1.OrderDetail, (orderdetail) => orderdetail.order),
    __metadata("design:type", Array)
], OrderEntity.prototype, "orderdetail", void 0);
__decorate([
    typeorm_1.OneToOne(() => payment_entity_1.Payment, (payment) => payment.order),
    typeorm_1.JoinColumn(),
    __metadata("design:type", payment_entity_1.Payment)
], OrderEntity.prototype, "payment", void 0);
OrderEntity = __decorate([
    typeorm_1.Entity({ name: "order" })
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map