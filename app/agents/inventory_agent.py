from app.models.order import SalesOrder


class InventoryAgent:
    """
    Checks whether the requested products and quantities
    are available in mock inventory.
    """

    name = "Inventory Agent"

    def __init__(self):
        self.inventory = {
            "P001": {
                "product_name": "Laptop",
                "available_quantity": 10
            },
            "P002": {
                "product_name": "Wireless Mouse",
                "available_quantity": 20
            },
            "P003": {
                "product_name": "Keyboard",
                "available_quantity": 3
            }
        }

    def check_inventory(self, order: SalesOrder) -> dict:
        errors = []
        checked_items = []

        for item in order.items:
            product = self.inventory.get(item.product_id)

            if product is None:
                errors.append(
                    f"{item.product_name} ({item.product_id}) "
                    f"is not available in inventory."
                )
                continue

            available = product["available_quantity"]

            checked_items.append({
                "product_id": item.product_id,
                "product_name": item.product_name,
                "requested_quantity": item.quantity,
                "available_quantity": available
            })

            if item.quantity > available:
                errors.append(
                    f"Insufficient inventory for {item.product_name}. "
                    f"Requested: {item.quantity}, Available: {available}."
                )

        if errors:
            return {
                "agent": self.name,
                "status": "failed",
                "message": "Inventory check failed.",
                "items": checked_items,
                "errors": errors
            }

        return {
            "agent": self.name,
            "status": "passed",
            "message": "All requested items are available.",
            "items": checked_items,
            "errors": []
        }