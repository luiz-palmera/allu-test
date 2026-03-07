export function getMonthlyValue(annualValue: number): number {
    return Number((annualValue /12).toFixed(2))
}

export function withPricing<T extends {annualValue: number}>(item: T){
    return {
        ...item,
        monthlyValue: getMonthlyValue(item.annualValue)
    }
}