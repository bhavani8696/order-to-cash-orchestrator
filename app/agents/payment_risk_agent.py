from app.models.order import SalesOrder


class PaymentRiskAgent:
    """
    Evaluates payment risk using simple, transparent
    mock business rules.
    """

    name = "Payment Risk Agent"

    def assess_risk(self, order: SalesOrder) -> dict:
        total_amount = sum(
            item.quantity * item.unit_price
            for item in order.items
        )

        risk_score = 0
        reasons = []

        # Rule 1: High-value orders have higher risk
        if total_amount > 100000:
            risk_score += 30
            reasons.append(
                "Order value is above ₹100,000."
            )

        # Rule 2: Credit card gets a small risk score
        if order.payment_method.lower() == "credit_card":
            risk_score += 10
            reasons.append(
                "Payment method is credit card."
            )

        # Determine risk level
        if risk_score >= 50:
            risk_level = "HIGH"
        elif risk_score >= 25:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        return {
            "agent": self.name,
            "status": "passed",
            "message": "Payment risk assessment completed.",
            "risk": {
                "risk_score": risk_score,
                "risk_level": risk_level,
                "order_value": round(total_amount, 2),
                "reasons": reasons
            }
        }