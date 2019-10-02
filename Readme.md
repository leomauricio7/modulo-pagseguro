# Modulo de integração com o gatway de pagamento do pagseguro
## Checkout Transparente
## Checkout Split
* Modulo desenvolvido por Leonardo Mauricio
* Mas informações entrar em contao via email: **leomauricio7@gmail.com**
![PagSeguro-2](https://user-images.githubusercontent.com/30731660/65697678-b5e27200-e051-11e9-836c-d3d1319c311c.png)
## Modelo de JSON para cada endpoint
### criar sessão
    request {
      method: GET,
      url: '/api/session',
    }
### metodos de pagamento
    request {
      method: GET,
      url: '/api/payment-method',
      data: {
          "session_id": string, id da sessão retornado no passo anterior
          "amout": string, valor da comprar
      }
    }
## OBS: endpoints para pagamento com cartão de crédito
### bandeira do cartão

    request {
      method: GET,
      url: '/api/getBin',
      data: {
          "session_id": id da sessão,
          "bin": os 6 priemiros digitos do cartao de credito
      }
    }
### token do cartão
    request {
      method: GET,
      url: '/api/cards',
      data: {
          "session_id": id da sessão retornado no passo anterior,
          "amount": valro da compra,
          "cardNumber": nuemro do cartao,
          "cardBrand": bandeira do cartao,
          "cardCvv": cvv do cartão,
          "cardExpirationMonth": mes de expiração do cartão,
          "cardExpirationYear": ano de expiração do cartão"
      }
    }
 ### quantidade de parcelas
    request {
      method: GET,
      url: '/api/installments',
      data: {
          "session_id": id da sessão retornado no passo anterior,
          "amount": valor da compra,
	  "creditCardBrand": bandeira do cartão
      }
    }
 ### checkout com cartão de crédito
    request {
      method: POST,
      url: '/api/checkout/credito',
      data: {
            "mode": "default", Modo de pagamento
            "method": "creditCard", //Meio de pagamento
            "sender": {
                "name": nome do comprador,
                "email": email do comprador,
                "phone": {
                    "areaCode": DDD,
                    "number": numero do telefone
                },
                "documents": {
                    "type": CPF ou CNPJ,
                    "value": numero do documento acima escolhido
                }
            },
            "items": {
                "item": {
                    "id": id do produto,
                    "description": descricao do produto,
                    "amount": valor do produto,
                    "quantity": quantidade do produto
                }
            },
            "creditCard": {
                "token": token doc artão obitido nos passos anetriores,
                "installment": {
                    "quantity": 1,
                    "value": valor total da compra,
                    "noInterestInstallmentQuantity": quantidade de parcelas para pdoer cobrar juros(opcional)
                },
                "holder": {
                    "name": nome do cartão de credito,
                    "documents": {
                        "type": "CPF",
                        "value": cpf do comprador,
                        "birthDate": "data de nasciemnto do comprador
                    },
                    "phone": {
                        "areaCode": ddd,
                        "number": numero de telefone
                    }
                }
            },
            "billingAddress": {
                "street": "Rua Teste",
                "number": "1160",
                "district": "Bairro Teste",
                "city": "Natal",
                "state": "RN",
                "country": "BRA",
                "postalCode": "59570000",
                "complement": "perto da quadra"
            },
            "reference": "1023", codigo de referencia da compra
            "receiverEmail": "email do que irar receber o comprovante do pagseguro",
            "extraAmount": "0.00" valor extra 
      }
    }
  ## OBS: endpoints para pagamento cem debito online
  ### checkout com debito online
  #### OBS: as informações do que é cada atributo para o debito online são as mesmas usadas para o credito
      request {
      method: POST,
      url: '/api/checkout/debito',
      data: {
	"mode": "default",
	"method": "eft",
	"bank": "BANCO_BRASIL",
	"sender": {
		"name": "Paciente Teste",
		"email": "teste@sandbox.pagseguro.com.br",
		"phone": {
			"areaCode": "84",
			"number": ""
		},
		"documents": {
			"type": "CPF",
			"value": ""
		}
	},
	"items": {
		"item": {
			"id": "1021",
			"description": "Consulta via bomédico",
			"amount": "",
			"quantity": 1
		}
	},
	"reference": "1024",
	"receiverEmail": "",
	"extraAmount": "0.00"
      }
    }
 ### cancelar uma transacao
    request {
      method: POST,
      url: '/api/transactions/cancels',
      data: {
         "transactionCode": codigo da transação
      }
    }
### estornar uma transacao totalmente
    request {
      method: POST,
      url: '/api/transactions/refunds/total',
      data: {
         "transactionCode": codigo da transação
      }
    }
### estornar uma transacao parcialmente
    request {
      method: POST,
      url: '/api/transactions/refunds/parcial',
      data: {
         "transactionCode": codigo da transação
	 "refundValue": valor que deseja estornar
      }
    }
### detalhes de uma transação
    request {
      method: GET,
      url: '/api/transactions/detalhes',
      data: {
         "transactionCode": codigo da transação
      }
    }
### detalhes de uma transação pelo codigo da transação
    request {
      method: GET,
      url: '/api/transactions/code',
      data: {
         "transactionCode": codigo da transação
      }
    }
### detalhes de uma transação pela referencia
    request {
      method: GET,
      url: '/api/transactions/reference',
      data: {
         "reference": codigo de referência da transação
      }
    }

