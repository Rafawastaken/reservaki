/* billing_period limitado aos dois valores válidos */
export type BillingPeriod = 'monthly' | 'yearly';

/** Dados de faturação / ciclo do contrato */
export type ContractBilling = {
    period: BillingPeriod;
    cycle_days: number;
    price: number; // em cêntimos
    next_charge: string; // ISO date (YYYY-MM-DD) ou Date se preferires
    active: boolean;
};

/** Informação do tipo de plano (Basic, Premium, Trial…) */
export type ContractTypeInfo = {
    name: string;
};

/** Payload principal entregue ao React */
export type ContractPayload = {
    id: number;
    billing: ContractBilling;
    type: ContractTypeInfo;
};
