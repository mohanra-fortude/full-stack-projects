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
exports.Payment = exports.PaymentStatus = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../order/entities/order.entity");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["SUCCESS"] = "success";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["CANCELLED"] = "cancelled";
    PaymentStatus["REJECTED"] = "rejected";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
let Payment = class Payment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Payment.prototype, "paymentId", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", Date)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Payment.prototype, "payAmount", void 0);
__decorate([
    typeorm_1.OneToOne(() => order_entity_1.OrderEntity, (order) => order.payment),
    __metadata("design:type", order_entity_1.OrderEntity)
], Payment.prototype, "order", void 0);
Payment = __decorate([
    typeorm_1.Entity({ name: "payment" })
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map