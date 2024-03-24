import { calculateInvestmentResults, formatter } from "../util/investment"

export function Results({ input }) {
  const results = calculateInvestmentResults(input)
  const initialInvestment = results[0].valueEndOfYear - results[0].annualInvestment - results[0].interest

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => {
          const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialInvestment
          const totalInvested = result.valueEndOfYear - totalInterest

          return (
            <tr key={index}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalInvested)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
