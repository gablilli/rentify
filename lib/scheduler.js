const cron = require("cron")
const database = require("./database")
const emailService = require("./email")

class SchedulerService {
  constructor() {
    this.jobs = []
    this.init()
  }

  init() {
    // Daily job to check for overdue payments and send reminders
    const paymentReminderJob = new cron.CronJob(
      "0 9 * * *", // Every day at 9 AM
      this.checkOverduePayments.bind(this),
      null,
      true,
      "Europe/Rome",
    )

    // Monthly job to generate rent payments
    const monthlyRentJob = new cron.CronJob(
      "0 0 1 * *", // First day of every month at midnight
      this.generateMonthlyRentPayments.bind(this),
      null,
      true,
      "Europe/Rome",
    )

    // Weekly job to check expiring contracts
    const contractExpiryJob = new cron.CronJob(
      "0 9 * * 1", // Every Monday at 9 AM
      this.checkExpiringContracts.bind(this),
      null,
      true,
      "Europe/Rome",
    )

    this.jobs.push(paymentReminderJob, monthlyRentJob, contractExpiryJob)
    console.log("Scheduler initialized with", this.jobs.length, "jobs")
  }

  async checkOverduePayments() {
    try {
      console.log("Checking for overdue payments...")

      const overduePayments = await database.query(`
        SELECT p.*, c.property_id, pr.address as property_address, 
               u.email, u.first_name, u.last_name
        FROM payments p
        JOIN contracts c ON p.contract_id = c.id
        JOIN properties pr ON c.property_id = pr.id
        JOIN tenants t ON p.tenant_id = t.id
        JOIN users u ON t.user_id = u.id
        WHERE p.status = 'pending' 
        AND p.due_date < date('now', '-1 day')
      `)

      for (const payment of overduePayments) {
        // Update payment status to overdue
        await database.run("UPDATE payments SET status = ? WHERE id = ?", ["overdue", payment.id])

        // Send reminder email
        await emailService.sendRentReminder(payment.email, {
          tenantName: `${payment.first_name} ${payment.last_name}`,
          propertyAddress: payment.property_address,
          amount: payment.amount,
          dueDate: payment.due_date,
          paymentLink: `${process.env.APP_URL}/payments/${payment.id}`,
        })

        console.log(`Sent overdue reminder to ${payment.email}`)
      }

      console.log(`Processed ${overduePayments.length} overdue payments`)
    } catch (error) {
      console.error("Error checking overdue payments:", error)
    }
  }

  async generateMonthlyRentPayments() {
    try {
      console.log("Generating monthly rent payments...")

      const activeContracts = await database.query(`
        SELECT c.*, t.id as tenant_id
        FROM contracts c
        JOIN contract_roommates cr ON c.id = cr.contract_id
        JOIN tenants t ON cr.tenant_id = t.id
        WHERE c.status = 'active'
        AND c.start_date <= date('now')
        AND c.end_date > date('now')
      `)

      const nextMonth = new Date()
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      const dueDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1)

      for (const contract of activeContracts) {
        // Check if payment already exists for next month
        const existingPayment = await database.query(
          `
          SELECT id FROM payments 
          WHERE contract_id = ? AND tenant_id = ? 
          AND due_date = ? AND payment_type = 'rent'
        `,
          [contract.id, contract.tenant_id, dueDate.toISOString().split("T")[0]],
        )

        if (existingPayment.length === 0) {
          // Create new rent payment
          await database.run(
            `
            INSERT INTO payments (id, contract_id, tenant_id, payment_type, amount, due_date, status)
            VALUES (?, ?, ?, 'rent', ?, ?, 'pending')
          `,
            [
              `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              contract.id,
              contract.tenant_id,
              contract.monthly_rent,
              dueDate.toISOString().split("T")[0],
            ],
          )

          console.log(`Generated rent payment for contract ${contract.id}`)
        }
      }

      console.log("Monthly rent payments generation completed")
    } catch (error) {
      console.error("Error generating monthly rent payments:", error)
    }
  }

  async checkExpiringContracts() {
    try {
      console.log("Checking for expiring contracts...")

      const expiringContracts = await database.query(`
        SELECT c.*, pr.address as property_address, u.email, u.first_name, u.last_name
        FROM contracts c
        JOIN properties pr ON c.property_id = pr.id
        JOIN tenants t ON c.primary_tenant_id = t.id
        JOIN users u ON t.user_id = u.id
        WHERE c.status = 'active'
        AND c.end_date BETWEEN date('now') AND date('now', '+60 days')
      `)

      for (const contract of expiringContracts) {
        // Send notification email
        await emailService.sendContractNotification(contract.email, {
          tenantName: `${contract.first_name} ${contract.last_name}`,
          propertyAddress: contract.property_address,
          expiryDate: contract.end_date,
          contractType: contract.contract_type,
        })

        console.log(`Sent contract expiry notification to ${contract.email}`)
      }

      console.log(`Processed ${expiringContracts.length} expiring contracts`)
    } catch (error) {
      console.error("Error checking expiring contracts:", error)
    }
  }

  stop() {
    this.jobs.forEach((job) => job.stop())
    console.log("All scheduled jobs stopped")
  }
}

module.exports = new SchedulerService()
