const envs = {
  producao: {
    email: 'email do pagseguro',
    token: 'token do pagseguro',
    notificationURL: 'url de notificação',
    providers: {
      inicia_sessao: 'https://ws.pagseguro.uol.com.br/sessions',
      metodo_de_pagamento: 'https://pagseguro.uol.com.br/payment-methods',
      bandeira_do_cartao: 'https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin',
      token_do_cartao: 'https://df.uol.com.br/v2/cards',
      condicoes_de_pagamento: 'https://pagseguro.uol.com.br/checkout/v2/installments.json',
      cria_checkout_transacao: 'https://ws.pagseguro.uol.com.br/v2/transactions',
      cancela_transacao: 'https://ws.pagseguro.uol.com.br/v2/transactions/cancels',
      estorna_transacao: 'https://ws.pagseguro.uol.com.br/v2/transactions/refunds',
      consulta_transacao: 'https://ws.pagseguro.uol.com.br/v2/transactions'
    }
  },
  sandbox: {
    email: 'email do pagseguro',
    token: 'token do pagseguro',
    notificationURL: 'url de notificação',
    providers: {
      inicia_sessao: 'https://ws.sandbox.pagseguro.uol.com.br/sessions',
      metodo_de_pagamento: 'https://ws.sandbox.pagseguro.uol.com.br/payment-methods',
      bandeira_do_cartao: 'https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin',
      token_do_cartao: 'https://df.uol.com.br/v2/cards',
      condicoes_de_pagamento: 'https://ws.sandbox.pagseguro.uol.com.br/checkout/v2/installments.json',
      cria_checkout_transacao: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions',
      cancela_transacao: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/cancels',
      estorna_transacao: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/refunds',
      consulta_transacao: 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions'
    }
  }
};
module.exports = envs;