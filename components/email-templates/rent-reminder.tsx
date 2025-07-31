interface RentReminderProps {
  tenantName: string
  propertyAddress: string
  amount: number
  dueDate: string
  paymentLink: string
}

export default function RentReminderTemplate({
  tenantName,
  propertyAddress,
  amount,
  dueDate,
  paymentLink,
}: RentReminderProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#f8f9fa", padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#2563eb", margin: "0" }}>Rentify</h1>
      </div>

      <div style={{ padding: "30px 20px" }}>
        <h2 style={{ color: "#1f2937" }}>Gentile {tenantName},</h2>

        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#4b5563" }}>
          Le ricordiamo che il pagamento dell'affitto per la proprietà situata in <strong>{propertyAddress}</strong> è
          in scadenza.
        </p>

        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "20px",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#1f2937" }}>Dettagli Pagamento</h3>
          <p style={{ margin: "5px 0", color: "#4b5563" }}>
            <strong>Importo:</strong> €{amount.toFixed(2)}
          </p>
          <p style={{ margin: "5px 0", color: "#4b5563" }}>
            <strong>Scadenza:</strong> {new Date(dueDate).toLocaleDateString("it-IT")}
          </p>
          <p style={{ margin: "5px 0", color: "#4b5563" }}>
            <strong>Proprietà:</strong> {propertyAddress}
          </p>
        </div>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <a
            href={paymentLink}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Effettua il Pagamento
          </a>
        </div>

        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Se ha già effettuato il pagamento, può ignorare questo messaggio. Per qualsiasi domanda, non esiti a
          contattarci.
        </p>

        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Cordiali saluti,
          <br />
          Il Team di Rentify
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <p>Questa è una comunicazione automatica. Si prega di non rispondere a questa email.</p>
      </div>
    </div>
  )
}
