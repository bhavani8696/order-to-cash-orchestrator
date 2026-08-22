from app.models.order import SalesOrder


class InvoiceAgent:
    """
    Generates an invoice from a validated sales order.
    """

    name = "Invoice Agent"

    def generate_invoice(self, order: SalesOrder) -> dict:
        invoice_items = []
        subtotal = 0.0

        for item in order.items:
            item_total = item.quantity * item.unit_price
            subtotal += item_total

            invoice_items.append({
                "product_id": item.product_id,
                "product_name": item.product_name,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "total": item_total
            })

        tax_rate = 0.18
        tax = subtotal * tax_rate
        grand_total = subtotal + tax

        return {
            "agent": self.name,
            "status": "passed",
            "message": "Invoice generated successfully.",
            "invoice": {
                "invoice_id": f"INV-{order.order_id}",
                "order_id": order.order_id,
                "customer_name": order.customer_name,
                "items": invoice_items,
                "subtotal": round(subtotal, 2),
                "tax_rate": tax_rate,
                "tax": round(tax, 2),
                "grand_total": round(grand_total, 2)
            }
        }