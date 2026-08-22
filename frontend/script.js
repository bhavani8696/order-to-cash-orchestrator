async function processOrder() {

    const orderId = document.getElementById("orderId").value;
    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;

    const orderData = {
        order_id: orderId,
        customer_name: customerName,
        customer_email: customerEmail,
        items: [
            {
                product_id: "P001",
                product_name: "Laptop",
                quantity: 1,
                unit_price: 50000
            }
        ],
        payment_method: "UPI"
    };

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/process-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        const result = document.getElementById("result");
        result.classList.remove("hidden");

        document.getElementById("orderStatus").textContent =
            data.status === "completed"
                ? "🟢 ORDER COMPLETED"
                : "🔴 ORDER FAILED";

        document.getElementById("orderMessage").textContent =
            data.message || "Order processing completed.";

        if (data.steps && data.steps.payment_risk) {

            const riskLevel =
                data.steps.payment_risk.risk.risk_level;

            document.getElementById("risk").textContent =
                riskLevel + " RISK";
        }

    } catch (error) {

        alert(
            "Could not connect to backend. Make sure FastAPI server is running."
        );

        console.error(error);
    }
}