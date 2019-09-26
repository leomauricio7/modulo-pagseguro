const axios = require('axios');
const convert = require('xml2json-light');
const ip = require('ip');
const qs = require('querystring');
const conf = require('./env');
const env = process.env.APP_ENV == 'production' ? conf.producao : conf.sandbox;
methods = {};

// Gerando uma sessao
methods.inicia_sessao = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: env.providers.inicia_sessao,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data).session.id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// Obter Meios de Pagamento
methods.metodos_de_pagamento = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.metodo_de_pagamento,
      params: {
        sessionId: option.session_id, //Id de sessão
        amout: option.amout //Valor
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'content-Type': 'application/json'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Obter Bandeira de Cartao
methods.bandeira_do_cartao = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.bandeira_do_cartao,
      params: {
        tk: option.session_id, //Id de sessão
        creditCard: option.bin //Bin do cartão (6 primeiros dígitos)
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'content-Type': 'application/json'
      }
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Obter Token de Cartao
methods.token_do_cartao = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: env.providers.token_do_cartao,
      params: {
        sessionId: option.session_id, //Id de sessão
        amount: option.amount, //Valor
        cardNumber: option.cardNumber, //Número do cartão
        cardBrand: option.cardBrand, //Bandeira do cartão
        cardCvv: option.cardCvv, //Código de segurança
        cardExpirationMonth: option.cardExpirationMonth, //Mês de expiração 2 dígitos
        cardExpirationYear: option.cardExpirationYear //Ano de expiração 4 dígitos
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'content-Type': 'application/json'
      }
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Obter Condicoes de Parcelamento
methods.condicoes_de_pagamento = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.condicoes_de_pagamento,
      params: {
        sessionId: option.session_id, //Id de sessão
        amount: option.amount, //Valor
        creditCardBrand: option.creditCardBrand //Bandeira do cartão
      }
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
//Débito Online
methods.debito = (option) => {
  return new Promise((resolve, reject) => {
    const dados = {
      paymentMode: option.mode ? option.mode : 'default', //Modo de pagamento
      paymentMethod: 'eft', //Meio de pagamento
      currency: 'BRL', //Moeda utilizada. Indica a moeda na qual o pagamento será feito. No momento, a única opção disponível é BRL (Real).
      bankName: option.bank,
      senderIp: ip.address(), // Ip do comprador Especifica o IP do comprador que está realizando o pagamento.
      senderName: option.sender.name, // Nome completo do comprador. Especifica o nome completo do comprador que está realizando o pagamento. Formato: No mínimo duas sequências de caracteres, com o limite total de 50 caracteres.
      senderEmail: option.sender.email, // E-mail do comprador. Especifica o e-mail do comprador que está realizando o pagamento. Formato: Um e-mail válido (p.e., usuario@site.com.br), com no máximo 60 caracteres.
      senderAreaCode: option.sender.phone.areaCode, // DDD do comprador. Especifica o código de área (DDD) do comprador que está realizando o pagamento. Formato: Um número de 2 dígitos correspondente a um DDD válido.
      senderPhone: option.sender.phone.number, //Número do telefone do comprador. Especifica o número do telefone do comprador que está realizando o pagamento. Formato: Um número de 7 a 9 dígitos.
      senderCPF: option.sender.documents.type, //Tipo de documento do comprador. Especifica o tipo do documento é CPF ou CNPJ. Formato:CPF ou CNPJ
      senderCPF: option.sender.documents.value, //Número do CPF ou CNPJ do comprador Especifica o CPF/CNPJ do comprador que está realizando o pagamento. Formato: Um número de 11 dígitos para CPF ou 14 dígitos para CNPJ.

      itemId1: option.items.item.id, // Identificam os itens sendo pagos
      itemDescription1: option.items.item.description, // Descrevem os itens sendo pagos. Formato: Livre, com limite de 100 caracteres.
      itemAmount1: option.items.item.amount, //Representam os preços unitários de cada item sendo pago. Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual a 9999999.00.
      itemQuantity1: option.items.item.quantity, // Representam as quantidades de cada item sendo pago

      shippingAddressRequired: false, //Obrigatoriedade do endereço de entrega.Formato:True: Os parâmetros de shipping deverão ser passados False: os parâmetros de shipping não deverão ser passados.

      reference: option.reference, //Código de referência. Define um código para fazer referência ao pagamento. Este código fica associado à transação criada pelo pagamento e é útil para vincular as transações do PagSeguro às vendas registradas no seu sistema. Formato: Livre, com o limite de 200 caracteres.
      receiverEmail: env.email, //Especifica o e-mail do vendedor que vai receber o pagamento. Formato: Um e-mail válido, com limite de 60 caracteres. O e-mail informado deve estar vinculado à conta PagSeguro que está realizando a chamada à API.
      extraAmount: option.extraAmount ? option.extraAmount : '0.00', //Valor extra. Especifica um valor extra que deve ser adicionado ou subtraído ao valor total do pagamento. Esse valor pode representar uma taxa extra a ser cobrada no pagamento ou um desconto a ser concedido, caso o valor seja negativo. Formato: Decimal (positivo ou negativo), com duas casas decimais separadas por ponto (p.e., 1234.56 ou -1234.56), maior ou igual a -9999999.00 e menor ou igual a 9999999.00. Quando negativo, este valor não pode ser maior ou igual à soma dos valores dos produtos.
      notificationURL: env.notificationURL // URL para envio de notificações. Formato: Uma URL válida, com limite de 255 caracteres.
    }
    axios({
      method: "POST",
      url: env.providers.cria_checkout_transacao + '/',
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      data: qs.stringify(dados),
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
//Cartão de Crédito
methods.credito = (option) => {
  return new Promise((resolve, reject) => {
    const dados = {
      paymentMode: option.mode ? option.mode : 'default', //Modo de pagamento
      paymentMethod: 'creditCard', //Meio de pagamento
      currency: 'BRL', //Moeda utilizada. Indica a moeda na qual o pagamento será feito. No momento, a única opção disponível é BRL (Real).

      senderIp: ip.address(), // Ip do comprador Especifica o IP do comprador que está realizando o pagamento.
      senderName: option.sender.name, // Nome completo do comprador. Especifica o nome completo do comprador que está realizando o pagamento. Formato: No mínimo duas sequências de caracteres, com o limite total de 50 caracteres.
      senderEmail: option.sender.email, // E-mail do comprador. Especifica o e-mail do comprador que está realizando o pagamento. Formato: Um e-mail válido (p.e., usuario@site.com.br), com no máximo 60 caracteres.
      senderAreaCode: option.sender.phone.areaCode, // DDD do comprador. Especifica o código de área (DDD) do comprador que está realizando o pagamento. Formato: Um número de 2 dígitos correspondente a um DDD válido.
      senderPhone: option.sender.phone.number, //Número do telefone do comprador. Especifica o número do telefone do comprador que está realizando o pagamento. Formato: Um número de 7 a 9 dígitos.
      senderCPF: option.sender.documents.type, //Tipo de documento do comprador. Especifica o tipo do documento é CPF ou CNPJ. Formato:CPF ou CNPJ
      senderCPF: option.sender.documents.value, //Número do CPF ou CNPJ do comprador Especifica o CPF/CNPJ do comprador que está realizando o pagamento. Formato: Um número de 11 dígitos para CPF ou 14 dígitos para CNPJ.

      itemId1: option.items.item.id, // Identificam os itens sendo pagos
      itemDescription1: option.items.item.description, // Descrevem os itens sendo pagos. Formato: Livre, com limite de 100 caracteres.
      itemAmount1: option.items.item.amount, //Representam os preços unitários de cada item sendo pago. Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual a 9999999.00.
      itemQuantity1: option.items.item.quantity, // Representam as quantidades de cada item sendo pago

      creditCardToken: option.creditCard.token, //Token do Cartão de Crédito. Token retornado no serviço de obtenção de token do cartão de crédito. Formato: Não tem limite de caracteres.
      installmentQuantity: option.creditCard.installment.quantity, //Quantidade de parcelas escolhidas pelo cliente.Formato: Um inteiro entre 1 e 18.
      installmentValue: option.creditCard.installment.value, //Valor das parcelas obtidas no serviço de opções de parcelamento. Formato: Numérico com 2 casas decimais e separado por ponto.
      //noInterestInstallmentQuantity: option.creditCard.installment.noInterestInstallmentQuantity, // Quantidade de parcelas sem juros oferecidas ao cliente. O valor deve ser o mesmo indicado no método getInstallments, no parâmetro maxInstallmentNoInterest. Formato: Um inteiro. Obrigatório: Caso tenha sido informado o valor no parâmetro maxInstallmentNoInterest do método getInstallments.
      creditCardHolderName: option.creditCard.holder.name, //Nome impresso no cartão de crédito. Formato: min = 1, max = 50 caracteres.
      creditCardHolderCPF: option.creditCard.holder.documents.value, //Número do CPF ou CNPJ do comprador Especifica o CPF/CNPJ do comprador que está realizando o pagamento. Formato: Um número de 11 dígitos para CPF ou 14 dígitos para CNPJ. Obrigatório para cartão de crédito.
      creditCardHolderBirthDate: option.creditCard.holder.documents.birthDate, //Data de nascimento do dono do cartão de crédito. Formato: dd/MM/yyyy
      creditCardHolderAreaCode: option.creditCard.holder.phone.areaCode, //DDD do comprador. Especifica o código de área (DDD) do comprador que está realizando o pagamento. Formato: Um número de 2 dígitos correspondente a um DDD válido.
      creditCardHolderPhone: option.creditCard.holder.phone.number, //Número do telefone do comprador. Especifica o número do telefone do comprador que está realizando o pagamento. Formato: Um número de 7 a 9 dígitos.

      billingAddressStreet: option.billingAddress.street, //Nome da rua do endereço de envio. Informa o nome da rua do endereço de envio do produto. Formato: Livre, com limite de 80 caracteres.
      billingAddressNumber: option.billingAddress.number, //Número do endereço de envio. Informa o número do endereço de envio do produto.
      billingAddressDistrict: option.billingAddress.district, //Bairro do endereço de envio. Informa o bairro do endereço de envio do produto. Formato: Livre, com limite de 60 caracteres.
      billingAddressCity: option.billingAddress.city, //Cidade do endereço de envio. Informa a cidade do endereço de envio do produto. Formato: Livre. Deve ser um nome válido de cidade do Brasil, com no mínimo 2 e no máximo 60 caracteres
      billingAddressState: option.billingAddress.state, //Estado do endereço de envio. Informa o estado do endereço de envio do produto. Formato: Duas letras, representando a sigla do estado brasileiro correspondente.
      billingAddressCountry: option.billingAddress.country, // País do endereço de envio. Informa o país do endereço de envio do produto. Formato: No momento, apenas o valor BRA é permitido.
      billingAddressPostalCode: option.billingAddress.postalCode, //CEP do endereço de envio. Informa o CEP do endereço de envio do produto. Formato: Um número de 8 dígitos
      billingAddressComplement: option.billingAddress.complement, //Complemento do endereço de envio. Informa o complemento (bloco, apartamento, etc.) do endereço de envio do produto. Formato: Livre, com limite de 40 caracteres.

      shippingAddressRequired: false, //Obrigatoriedade do endereço de entrega.Formato:True: Os parâmetros de shipping deverão ser passados False: os parâmetros de shipping não deverão ser passados.

      reference: option.reference, //Código de referência. Define um código para fazer referência ao pagamento. Este código fica associado à transação criada pelo pagamento e é útil para vincular as transações do PagSeguro às vendas registradas no seu sistema. Formato: Livre, com o limite de 200 caracteres.
      receiverEmail: env.email, //Especifica o e-mail do vendedor que vai receber o pagamento. Formato: Um e-mail válido, com limite de 60 caracteres. O e-mail informado deve estar vinculado à conta PagSeguro que está realizando a chamada à API.
      extraAmount: option.extraAmount ? option.extraAmount : '0.00', //Valor extra. Especifica um valor extra que deve ser adicionado ou subtraído ao valor total do pagamento. Esse valor pode representar uma taxa extra a ser cobrada no pagamento ou um desconto a ser concedido, caso o valor seja negativo. Formato: Decimal (positivo ou negativo), com duas casas decimais separadas por ponto (p.e., 1234.56 ou -1234.56), maior ou igual a -9999999.00 e menor ou igual a 9999999.00. Quando negativo, este valor não pode ser maior ou igual à soma dos valores dos produtos.
      notificationURL: env.notificationURL // URL para envio de notificações. Formato: Uma URL válida, com limite de 255 caracteres.
    }
    axios({
      method: "POST",
      url: env.providers.cria_checkout_transacao + '/',
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      data: qs.stringify(dados),
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Cancelar transação
methods.cancelar_transacao = (option) => {
  return new Promise((resolve, reject) => {
    const dados = {
      transactionCode: option.transactionCode // Código da transação Transação deverá estar com os status Aguardando pagamento ou Em análise Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.
    }
    axios({
      method: "POST",
      url: env.providers.cancela_transacao,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      data: qs.stringify(dados),
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Estornar transação Total
methods.estorno_total = (option) => {
  return new Promise((resolve, reject) => {
    const dados = {
      transactionCode: option.transactionCode, // Código da transação Transação deverá estar com os status Aguardando pagamento ou Em análise Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.
      //refundValue: option.refundValue // Valor do estorno.Utilizado no estorno de uma transação, corresponde ao valor a ser devolvido. Se não for informado, o PagSeguro assume que o valor a ser estornado é o valor total da transação. Formato: Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual ao valor da transação.
    }
    console.log(dados)
    axios({
      method: "POST",
      url: env.providers.estorna_transacao,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      data: qs.stringify(dados),
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Estornar transação Parcial
methods.estorno_parcial = (option) => {
  return new Promise((resolve, reject) => {
    const dados = {
      transactionCode: option.transactionCode, // Código da transação Transação deverá estar com os status Aguardando pagamento ou Em análise Formato: Uma sequência de 36 caracteres, com os hífens, ou 32 caracteres, sem os hífens.
      refundValue: option.refundValue // Valor do estorno.Utilizado no estorno de uma transação, corresponde ao valor a ser devolvido. Se não for informado, o PagSeguro assume que o valor a ser estornado é o valor total da transação. Formato: Decimal, com duas casas decimais separadas por ponto (p.e., 1234.56), maior que 0.00 e menor ou igual ao valor da transação.
    }
    axios({
      method: "POST",
      url: env.providers.estorna_transacao,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      data: qs.stringify(dados),
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Consulta detalhes de uma transação
methods.detalhes_transacao = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.consulta_transacao+"/"+option.transactionCode,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Consulta detalhes de uma transação pela referencia
methods.detalhes_transacao_por_referencia = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.consulta_transacao,
      params: {
        email: env.email, //email
        token: env.token, //token de acesso
        reference: option.reference // referencia da transação
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
// Consulta detalhes de uma transação pelo código
methods.detalhes_transacao_por_code_transaction = (option) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: env.providers.consulta_transacao+"/"+option.transactionCode,
      params: {
        email: env.email, //email
        token: env.token //token de acesso
      },
      headers: {
        //'accept': 'application/vnd.pagseguro.com.br.v1+json;charset=ISO-8859-1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((data) => {
        resolve(convert.xml2json(data.data));
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

module.exports = methods;