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

    const button = document.querySelector(".process-btn");

    button.disabled = true;
    button.innerHTML = "⏳ Processing...";

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

        document.getElementById("displayOrderId").textContent =
            data.order_id || orderId;

        document.getElementById("summaryOrderId").textContent =
            data.order_id || orderId;

        if (data.status === "completed") {

            document.getElementById("orderStatus").textContent =
                "🟢 ORDER COMPLETED";

            document.getElementById("orderMessage").textContent =
                data.message || "Order processed successfully.";

            document.getElementById("summaryStatus").textContent =
                "COMPLETED";

        } else {

            document.getElementById("orderStatus").textContent =
                "🔴 ORDER FAILED";

            document.getElementById("orderMessage").textContent =
                data.result?.message || "Order processing failed.";

            document.getElementById("summaryStatus").textContent =
                "FAILED";
        }


        if (data.steps && data.steps.payment_risk) {

            const riskLevel =
                data.steps.payment_risk.risk.risk_level;

            document.getElementById("risk").textContent =
                riskLevel + " RISK";

            document.getElementById("summaryRisk").textContent =
                riskLevel;
        }

    } catch (error) {

        alert(
            "Could not connect to backend. Make sure FastAPI server is running."
        );

        console.error(error);

    } finally {

        button.disabled = false;
        button.innerHTML = "▶ Process Order";
    }
}