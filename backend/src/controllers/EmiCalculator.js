const { db } = require('../config/firebase');


const  calculateEMI=(req, res)=> {
    try {
      const { 
        principal, 
        tenure, 
        interestRate,
        brand,
        model,
        variant,
        city 
      } = req.body;
      
      // Convert interest rate from annual to monthly
      const monthlyRate = (interestRate / 12) / 100;
      
      // Calculate EMI
      const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                 (Math.pow(1 + monthlyRate, tenure) - 1);
      
      // Calculate total payment and interest
      const totalPayment = emi * tenure;
      const totalInterest = totalPayment - principal;

      // Calculate additional details
      const processingFee = principal * 0.01; // 1% processing fee
      const firstEMIDate = new Date();
      firstEMIDate.setMonth(firstEMIDate.getMonth() + 1);

      res.json({
        emi: Math.round(emi),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        principal: principal,
        processingFee: Math.round(processingFee),
        firstEMIDate: firstEMIDate.toISOString().split('T')[0],
        loanDetails: {
          brand,
          model,
          variant,
          city,
          interestRate,
          tenure
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  }

  const  saveLoanApplication = async (req, res)=> {
    try {
      const loanData = {
        ...req.body,
        status: 'PENDING',
        userId: req.user.uid,
        createdAt: new Date().toISOString()
      };

      const docRef = await db.collection('loanApplications').add(loanData);
      
      res.status(201).json({ 
        message: 'Loan application submitted successfully',
        applicationId: docRef.id 
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  }


module.exports = calculateEMI;