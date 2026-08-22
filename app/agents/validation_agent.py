from app.models.order import SalesOrder


class ValidationAgent:
    """
    Validates a sales order before it moves
    to the next stage of the workflow.
    """

    name = "Validation Agent"

    def validate(self, order: SalesOrder) -> dict:
        errors = []

        # Check order ID
        if not order.order_id.strip():
            errors.append("Order ID is missing.")

        # Check customer details
        if not order.customer_name.strip():
            errors.append("Customer name is missing.")

        if not order.customer_email.strip():
            errors.append("Customer email is missing.")

        # Check order items
        if not order.items:
            errors.append("Order must contain at least one item.")

        for item in order.items:
            if item.quantity <= 0:
                errors.append(
                    f"Invalid quantity for {item.product_name}."
                )

            if item.unit_price <= 0:
                errors.append(
                    f"Invalid price for {item.product_name}."
                )

        # Final result
        if errors:
            return {
                "agent": self.name,
                "status": "failed",
                "message": "Order validation failed.",
                "errors": errors
            }

        return {
            "agent": self.name,
            "status": "passed",
            "message": "Order validation successful.",
            "errors": []
        }