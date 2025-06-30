const express = require('express');
const router = express.Router();

const Transaction = require('../../schema/transaction/transactionSection/Transaction');
const SaveEntry = require('../../schema/transaction/Save');
const Expense = require('../../schema/transaction/Expense');
const saveDash = require('../../schema/dash/Save');
const expenseDash = require('../../schema/dash/Expense');
const Invest = require('../../schema/transaction/Invest');

router.get('/getAllTransactions/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/deleteTransaction/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        const { desc, serialId, userId } = transaction;

        // -------- EXPENSE DELETE LOGIC --------
        if (desc === 'Expense') {
            const expenseEntry = await Expense.findById(serialId);
            if (!expenseEntry) return res.status(404).json({ message: 'Expense record not found' });

            const { category, amount, debitedFrom } = expenseEntry;

            const categories = [
                "Food", "Shelter", "Gas", "Bike", "Stationary", "Smoke",
                "Shopping", "Washing", "Wine", "Medicine", "Jio", "Misc"
            ];
            const field = categories.includes(category) ? category : 'Misc';

            const expDash = await expenseDash.findOne({ userId });
            if (expDash) {
                expDash[field] = Math.max(0, (expDash[field] || 0) - amount);
                expDash.TOTAL = Math.max(0, (expDash.TOTAL || 0) - amount);
                await expDash.save();
            }

            await Expense.findByIdAndDelete(serialId);

            const saveEntry = new SaveEntry({
                userId,
                category: debitedFrom,
                deposit: amount,
                date: Date.now(),
                comment: 'Refund from cancelled expense',
            });
            await saveEntry.save();

            const saveDashDb = await saveDash.findOne({ userId });
            if (saveDashDb) {
                if (debitedFrom === 'SBI') saveDashDb.SBI += amount;
                else if (debitedFrom === 'AXIS') saveDashDb.AXIS += amount;
                else if (debitedFrom === 'IDBI') saveDashDb.IDBI += amount;
                else saveDashDb.MISC += amount;

                saveDashDb.TOTAL += amount;
                await saveDashDb.save();
            }
        }

        // -------- SAVE / INCOME / WITHDRAWAL DELETE LOGIC --------
        else if (desc === 'Save' || desc === 'Income' || desc === 'Withdrawal') {
            const saveEntryToDelete = await SaveEntry.findById(serialId);
            if (saveEntryToDelete) {
                const { category, deposit } = saveEntryToDelete;

                const saveDashDb = await saveDash.findOne({ userId });
                if (saveDashDb) {
                    if (category === 'SBI') saveDashDb.SBI = Math.max(0, saveDashDb.SBI - deposit);
                    else if (category === 'AXIS') saveDashDb.AXIS = Math.max(0, saveDashDb.AXIS - deposit);
                    else if (category === 'IDBI') saveDashDb.IDBI = Math.max(0, saveDashDb.IDBI - deposit);
                    else saveDashDb.MISC = Math.max(0, saveDashDb.MISC - deposit);

                    saveDashDb.TOTAL = Math.max(0, saveDashDb.TOTAL - deposit);
                    await saveDashDb.save();
                }

                await SaveEntry.findByIdAndDelete(serialId);
            }
        }

        // -------- INVESTMENTS DELETE LOGIC --------
        else {
            const modelMap = {
                FixedDeposit: require('../../schema/transaction/invest/FixedDeposit'),
                FixedInterestRateBond: require('../../schema/transaction/invest/FixedInterestRateBond'),
                Gold: require('../../schema/transaction/invest/Gold'),
                MutualFunds: require('../../schema/transaction/invest/MutualFund')
            };

            const Model = modelMap[desc];
            if (!Model) return res.status(400).json({ message: 'Invalid investment type' });

            const investEntry = await Model.findById(serialId);
            if (!investEntry) return res.status(404).json({ message: 'Investment record not found' });

            let amt = 0, source = 'Misc', qty = 0;

            if (desc === 'Gold') {
                amt = investEntry.purchaseAmount;
                qty = investEntry.gramsBought || 0;
                source = investEntry.debitFrom;
            } else if (desc === 'MutualFunds') {
                amt = investEntry.purchaseAmount;
                qty = investEntry.unitsBought || 0;
                source = investEntry.debitFrom;
            } else {
                amt = investEntry.deposit;
                source = investEntry.debit;
            }

            const saveEntry = new SaveEntry({
                userId,
                category: source,
                deposit: amt,
                date: Date.now(),
                comment: 'Refund from cancelled investment',
            });
            await saveEntry.save();

            const saveDashDb = await saveDash.findOne({ userId });
            if (saveDashDb) {
                if (source === 'SBI') saveDashDb.SBI += amt;
                else if (source === 'AXIS') saveDashDb.AXIS += amt;
                else if (source === 'IDBI') saveDashDb.IDBI += amt;
                else saveDashDb.MISC += amt;

                saveDashDb.TOTAL += amt;
                await saveDashDb.save();
            }

            const existingInvest = await Invest.findOne({ userId });
            if (existingInvest) {
                if (desc === 'Gold') {
                    existingInvest.gold = Math.max(0, existingInvest.gold - amt);
                    existingInvest.goldqty = Math.max(0, existingInvest.goldqty - qty);
                } else if (desc === 'MutualFund') {
                    existingInvest.mutualfund = Math.max(0, existingInvest.mutualfund - amt);
                } else if (desc === 'FixedDeposit') {
                    existingInvest.fixeddeposit = Math.max(0, existingInvest.fixeddeposit - amt);
                } else if (desc === 'FixedInterestRateBond') {
                    existingInvest.fixedratebond = Math.max(0, existingInvest.fixedratebond - amt);
                }

                existingInvest.TOTAL = Math.max(0, existingInvest.TOTAL - amt);
                await existingInvest.save();
            }

            await Model.findByIdAndDelete(serialId);
        }

        // -------- DELETE TRANSACTION RECORD --------
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Transaction and associated data deleted successfully' });

    } catch (err) {
        console.error("Deletion Error Stack:", err.stack);
        res.status(400).json({ message: 'Bad Request (deleteTransaction)', error: err.message });
    }
});

router.put('/updateTransaction/:id', async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
});

module.exports = router;
