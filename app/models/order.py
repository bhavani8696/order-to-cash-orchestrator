from pydantic import BaseModel, Field
from typing import List


class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int = Field(gt=0)
    unit_price: float = Field(gt=0)


class SalesOrder(BaseModel):
    order_id: str
    customer_name: str
    customer_email: str
    items: List[OrderItem]
    payment_method: str