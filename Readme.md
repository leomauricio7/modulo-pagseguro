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
          session_id: string,
          amout": string
      }
    }
## OBS: endpoints para pagamento com cartão de crédito
### bandeira do cartão

    request {
      method: GET,
      url: '/api/getBin',
      data: {
          session_id: string,
          bin: string
      }
    }
### token do cartão
    request {
      method: GET,
      url: '/api/cards',
      data: {
          session_id: string,
          amount": string,
          cardNumber": string,
          cardBrand": string,
          cardCvv": string,
          cardExpirationMonth": string,
          cardExpirationYear": string"
      }
    }
 ### quantidade de parcelas
    request {
      method: GET,
      url: '/api/installments',
      data: {
          session_id: string,
          amount: string,
	      creditCardBrand: string
      }
    }
 ### checkout com cartão de crédito
    request {
      method: POST,
      url: '/api/checkout/credito',
      data: {
            "mode": "default",
            "method": "creditCard",
            "sender": {
                "name": nome do comprador,
                "email": email do comprador,
                "phone": {
                    "areaCode": DDD,
                    "number": nuemro do telefone
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
  

