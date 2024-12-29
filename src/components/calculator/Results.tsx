interface ResultsProps {
  savings: {
    monthly: number;
    yearly: number;
    employee: number;
  };
}

export function Results({ savings }: ResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <h3 className="text-primary text-sm mb-2">Monthly Savings</h3>
        <p className="text-2xl font-bold text-foreground">
          AED {savings.monthly.toLocaleString()}
        </p>
      </div>
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <h3 className="text-primary text-sm mb-2">Yearly Savings</h3>
        <p className="text-2xl font-bold text-foreground">
          AED {savings.yearly.toLocaleString()}
        </p>
      </div>
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
        <h3 className="text-primary text-sm mb-2">Employee Cost Savings</h3>
        <p className="text-2xl font-bold text-foreground">
          AED {savings.employee.toLocaleString()}
        </p>
      </div>
    </div>
  );
}