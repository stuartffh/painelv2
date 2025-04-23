import { CronJob } from 'cron';
import { processRecurringBilling } from '../lib/services/billing';

// Iniciar cron job para processar cobranças
const job = new CronJob(
  process.env.BILLING_SCHEDULE || '0 9 * * *', // Todo dia às 9h
  async () => {
    console.log('Iniciando processamento de cobranças recorrentes...');
    
    try {
      await processRecurringBilling();
      console.log('Processamento de cobranças concluído com sucesso');
    } catch (error) {
      console.error('Erro ao processar cobranças:', error);
    }
  },
  null,
  true,
  'America/Sao_Paulo'
);

console.log('Cron job de cobrança iniciado');